import React, { useState, useEffect } from 'react'
import { apiRequest } from '../../utils/index'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function AdminGenerateReports() {
  const [reportType, setReportType] = useState('')
  const [users, setUsers] = useState([])
  const [data, setData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true)
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [isActionsOpen, setIsActionsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Create Report')
  const [showAllApplicants, setShowAllApplicants] = useState(false)
  const [showAllCompany, setShowAllCompany] = useState(false)
  const [showAllJobs, setShowAllJobs] = useState(false)
  const [dateRange, setDateRange] = useState([null, null])
  const [searchQuery, setSearchQuery] = useState('')
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthdate: '',
    password: '',
    userType: 'user',
  })
  const [startDate, endDate] = dateRange

  function calculateAge(birthdate) {
    const birthday = new Date(birthdate)
    const today = new Date()
    let age = today.getFullYear() - birthday.getFullYear()
    const m = today.getMonth() - birthday.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--
    }
    return age
  }

  const fetchJobs = async () => {
    try {
      const response = await apiRequest({
        url: '/jobs/alljobs',
        method: 'GET',
      });

      if (response.data && Array.isArray(response.data)) {
        const modifiedJobs = response.data.map((job) => ({
          ...job,
          id: job._id,
          jobType: job.jobType || '', // Populate jobType
          vacancies: job.vacancies || 0, // Populate vacancies
        }));
        setJobs(modifiedJobs);
        setLoading(false);
      } else {
        console.error('Error: Jobs data is missing or not an array');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

    useEffect(() => {
      fetchUsers();
      fetchCompanies(); // Fetch companies when component mounts
      fetchJobs(); // Fetch jobs when component mounts
    }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchUsersWithDateRange() // Fetch users when date range changes
    } else {
      fetchUsers() // Fetch all users when date range is cleared
    }
  }, [startDate, endDate])

  const fetchUsers = async () => {
    try {
      const response = await apiRequest({
        url: '/users/allusers',
        method: 'GET',
      })
      const modifiedUsers = response.data.users.map((user) => ({
        ...user,
        id: user._id,
        birthdate: user.birthdate
          ? new Date(user.birthdate).toLocaleDateString()
          : 'N/A',
        age: user.birthdate ? calculateAge(user.birthdate) : 'N/A',
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      }))
      setUsers(modifiedUsers)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error)
      setLoading(false)
    }
  }

  const fetchCompanies = async () => {
    try {
      const response = await apiRequest({
        url: '/companies/allcompanies',
        method: 'GET',
      });

      if (response.data && Array.isArray(response.data)) {
        const modifiedCompanies = response.data.map((company) => ({
          ...company,
          id: company._id,
        }));
        setCompanies(modifiedCompanies);
        setLoading(false);
      } else {
        console.error('Error: Companies data is missing or not an array');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setLoading(false);
    }
  };

  const fetchUsersWithDateRange = async () => {
    if (!startDate || !endDate) return // Ensure both dates are selected

    try {
      const response = await apiRequest({
        url: '/users/allusers',
        method: 'GET',
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      })
      const modifiedUsers = response.data.users.map((user) => ({
        ...user,
        id: user._id,
        birthdate: user.birthdate
          ? new Date(user.birthdate).toLocaleDateString()
          : 'N/A',
        age: user.birthdate ? calculateAge(user.birthdate) : 'N/A',
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      }))
      setUsers(modifiedUsers)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching users with date range:', error)
      setLoading(false)
    }
  }

  const toggleDropdown = () => {
    setIsActionsOpen(!isActionsOpen)
  }

  const handleAllApplicantsClick = () => {
    setActiveTab('List of Users')
    setReportType('userList') // Add this line to set the reportType to 'userList'
    setShowAllApplicants(true)
    setShowAllJobs(false)
    setShowAllCompany(false) // Add this line to hide the company list
  }

  const handleListOfCompaniesClick = () => {
    setActiveTab('List of Companies');
    setReportType('userList') // Add this line to set the reportType to 'userList'
    setShowAllCompany(true)
    setShowAllJobs(false)
    setShowAllApplicants(false) // Add this line to hide the applicants list
  };

  const handleListOfJobsClick = () => {
    setActiveTab('List of Companies');
    setReportType('userList') // Add this line to set the reportType to 'userList'
    setShowAllCompany(false)
    setShowAllApplicants(false) // Add this line to hide the applicants list
    setShowAllJobs(true)
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const getCompanyName = (companyId) => {
    const company = companies.find((company) => company.id === companyId);
    return company ? company.name : 'N/A';
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="rounded-lg mt-[100px]">
      <div className="flex items-center gap-x-3">
        <h2 className="text-xl mb-4 font-bold text-gray-800 dark:text-white">
          Generate Reports
        </h2>
      </div>
      <div className="flex gap-2 w-[50%]">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            type="button"
            className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            Reports
            <svg
              className={`hs-dropdown-open:rotate-180 size-4 ${isActionsOpen ? 'transform rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {isActionsOpen && (
            <div className="absolute z-10 mt-2 w-56 origin-top-right bg-white border border-gray-200 shadow-lg rounded-lg divide-y divide-gray-200 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700">
              <div className="py-2">
                <span
                  htmlFor="reportType"
                  className="block py-2 px-3 text-xs font-medium uppercase text-gray-400 dark:text-neutral-500"
                >
                  Account Overview
                </span>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                  onClick={handleAllApplicantsClick} // Update this line
                >
                  List of Users
                </a>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                  onClick={handleListOfCompaniesClick}
                >
                  List of Companies
                </a>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                  onClick={handleListOfJobsClick}
                >
                  List of Jobs
                </a>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                  href="#"
                >
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                    <path d="M12 12v9" />
                    <path d="m8 17 4 4 4-4" />
                  </svg>
                  Downloads
                </a>
                <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                    href="#"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Company Account
                  </a>
              </div>
              <div className="py-2">
                  <span className="block py-2 px-3 text-xs font-medium uppercase text-gray-400 dark:text-neutral-500">
                    Contacts
                  </span>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                    href="#"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      <line x1="9" x2="15" y1="10" y2="10" />
                      <line x1="12" x2="12" y1="7" y2="13" />
                    </svg>
                    Contact support
                  </a>
                </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
      {showAllApplicants && (
        <div>
          <h2 className="text-xl font-semibold mb-4 mt-8 text-left">
            List of Applicants
          </h2>
          {/* <div className='flex gap-2'>
          <div className="flex mb-4">
          <DatePicker
            selected={startDate}
            placeholderText='Filter by Date'
            onChange={(update) => {
              setDateRange(update)
            }}
            selectsRange
            startDate={startDate}
            endDate={endDate}
            isClearable
            className="py-2 px-4 pr-10 rounded-lg border border-gray-300 w-[100%]"
          />
        </div>
        <div className="flex mb-4 w-[50%]">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="py-2 px-4 rounded-lg border border-gray-300 w-full"
          />
        </div>
        </div> */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Birthdate
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Date Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-left">
                        <div>
                          <div className="text-sm font-medium text-gray-900 text-left">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-left">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-left">
                        {user.birthdate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-left">
                        {user.age}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-left">
                        {user.createdAt}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      {showAllCompany && (
        <div>
          <h2 className="text-xl font-semibold mb-4 mt-8 text-left">
            List of Companies
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {companies.map((company) => (
                  <tr key={company.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-left">
                        <div>
                          <div className="text-sm font-medium text-gray-900 text-left">
                            {company.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 text-left">
                        {company.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 text-left">
                        {new Date(company.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 text-left">
                        {company.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 text-left">
                        {company.status}
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-left">
                        {user.age}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-left">
                        {user.createdAt}
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      {showAllJobs && (
        <div>
          <h2 className="text-xl font-semibold mb-4 mt-8 text-left">
            List of Jobs
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 font-poppins">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Job Type
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Vacancies
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-green-700 uppercase tracking-wider">
                    Date Posted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-left">
                        <div>
                          <div className="text-sm font-medium text-gray-900 text-left">
                            {job.jobTitle}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-left">
                        {getCompanyName(job.company)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-left">
                        {job.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-left">
                        {job.jobType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-center">
                        {job.vacancies}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 text-left">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-left">
                        {user.age}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-left">
                        {user.createdAt}
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
