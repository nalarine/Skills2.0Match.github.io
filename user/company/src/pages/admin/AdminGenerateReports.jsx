import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function AdminGenerateReports() {
  const [reportType, setReportType] = useState('');
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobMetrics, setJobMetrics] = useState({
    totalJobs: 0,
    totalVacancies: 0,
    jobsPerCompany: {},
    jobsPerType: {},
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 10;

  const [startDate, endDate] = dateRange;

  function calculateAge(birthdate) {
    const birthday = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
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
          jobType: job.jobType || '',
          vacancies: job.vacancies || 0,
        }));
        setJobs(modifiedJobs);
        calculateJobMetrics(modifiedJobs); // Calculate job metrics after fetching jobs
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

  const calculateJobMetrics = (jobs) => {
    const totalJobs = jobs.length;
    const totalVacancies = jobs.reduce((sum, job) => sum + job.vacancies, 0);

    const jobsPerCompany = jobs.reduce((acc, job) => {
      acc[job.company] = (acc[job.company] || 0) + 1;
      return acc;
    }, {});

    const jobsPerType = jobs.reduce((acc, job) => {
      acc[job.jobType] = (acc[job.jobType] || 0) + 1;
      return acc;
    }, {});

    setJobMetrics({ totalJobs, totalVacancies, jobsPerCompany, jobsPerType });
  };

  useEffect(() => {
    fetchUsers();
    fetchCompanies(); // Fetch companies when component mounts
    fetchJobs(); // Fetch jobs when component mounts
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchUsersWithDateRange(); // Fetch users when date range changes
    } else {
      fetchUsers(); // Fetch all users when date range is cleared
    }
  }, [startDate, endDate]);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      console.log(`Fetching users for page: ${page}`);
      const response = await apiRequest({
        url: `/users/allusers?page=${page}&limit=${usersPerPage}`, // Append page and limit to the URL
        method: 'GET',
      });
      console.log('API response:', response);
      const modifiedUsers = response.data.users.map((user) => ({
        ...user,
        id: user._id,
        birthdate: user.birthdate ? new Date(user.birthdate).toLocaleDateString() : 'N/A',
        age: user.birthdate ? calculateAge(user.birthdate) : 'N/A',
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      }));
      setUsers(modifiedUsers);
      setTotalPages(response.data.pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

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
    if (!startDate || !endDate) return; // Ensure both dates are selected

    try {
      const response = await apiRequest({
        url: '/users/allusers',
        method: 'GET',
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });
      const modifiedUsers = response.data.users.map((user) => ({
        ...user,
        id: user._id,
        birthdate: user.birthdate
          ? new Date(user.birthdate).toLocaleDateString()
          : 'N/A',
        age: user.birthdate ? calculateAge(user.birthdate) : 'N/A',
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      }));
      setUsers(modifiedUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users with date range:', error);
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsActionsOpen(!isActionsOpen);
  };

  const handleAllApplicantsClick = () => {
    setReportType('userList');
  };

  const handleListOfCompaniesClick = () => {
    setReportType('companyList');
  };

  const handleListOfJobsClick = () => {
    setReportType('jobList');
  };

  const handlePageChange = (pageNumber) => {
    console.log(`Page changed to: ${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  const handleDownloadReport = (type) => {
    let data;
    let filename;

    switch (type) {
      case 'users':
        data = users;
        filename = 'users_report.csv';
        break;
      case 'companies':
        data = companies;
        filename = 'companies_report.csv';
        break;
      case 'jobs':
        data = jobs;
        filename = 'jobs_report.csv';
        break;
      default:
        return;
    }

    const csv = data.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCompanyName = (companyId) => {
    const company = companies.find((company) => company.id === companyId);
    return company ? company.name : 'N/A';
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Data for charts
  const jobsChartData = {
    labels: jobs.map(job => job.jobTitle),
    datasets: [
      {
        label: '# of Vacancies',
        data: jobs.map(job => job.vacancies),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const companiesChartData = {
    labels: companies.map(company => company.name),
    datasets: [
      {
        label: 'Number of Jobs',
        data: companies.map(company => jobs.filter(job => job.company === company.id).length),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div className="rounded-lg mt-[100px]">
      <ToastContainer />

      <div className="flex gap-2 w-[50%] top-[80px]">
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

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {reportType === 'userList' && (
            <>
              <h2 className="text-2xl font-bold mb-4">All Applicants</h2>
              {/* <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border rounded-md"
                />
              </div> */}
              <div>
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 font-sm text-green-900 font-semibold text-base">First Name</th>
                      <th className="px-6 py-4 font-sm text-green-900 font-semibold text-base">Last Name</th>
                      <th className="px-6 py-4 font-sm text-green-900 font-semibold text-base">Email</th>
                      <th className="px-6 py-4 font-sm text-green-900 font-semibold text-base">Birthdate</th>
                      <th className="px-6 py-4 font-sm text-green-900 font-semibold text-base">Age</th>
                      <th className="px-6 py-4 font-sm text-green-900 font-semibold text-base">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4">{user.firstName}</td>
                        <td className="px-6 py-4">{user.lastName}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.birthdate}</td>
                        <td className="px-6 py-4">{user.age}</td>
                        <td className="px-6 py-4">{user.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center mt-4">
                  <nav className="bg-white rounded-md border border-gray-200">
                    <ul className="flex">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i} className="cursor-pointer">
                          <button
                            className={`relative block p-2 px-4 border text-sm leading-5 font-medium focus:z-10 focus:outline-none transition ease-in-out duration-150 ${
                              currentPage === i + 1
                                ? 'text-green-700 border-green-700 bg-green-50'
                                : 'text-gray-700 border-gray-300 hover:text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => handleDownloadReport('users')}>
                Download Report
              </button>
            </>
          )}

          {reportType === 'companyList' && (
            <>
              <h2 className="text-2xl font-bold mb-4">List of Companies</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2">Company Name</th>
                      <th className="border p-2">Location</th>
                      <th className="border p-2">Registration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((company) => (
                      <tr key={company.id}>
                        <td className="border p-2">{company.name}</td>
                        <td className="border p-2">{company.location}</td>
                        <td className="border p-2">{new Date(company.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => handleDownloadReport('companies')}>
                Download Report
              </button>
              <h2 className="text-2xl font-bold mt-8 mb-4">Company-wise Job Distribution</h2>
              <Bar data={companiesChartData} options={{ indexAxis: 'y' }} />
            </>
          )}

          {reportType === 'jobList' && (
            <>
              <h2 className="text-2xl font-bold mb-4">List of Jobs</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2">Job Title</th>
                      <th className="border p-2">Company</th>
                      <th className="border p-2">Job Type</th>
                      <th className="border p-2">Vacancies</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td className="border p-2">{job.jobTitle}</td>
                        <td className="border p-2">{getCompanyName(job.company)}</td>
                        <td className="border p-2">{job.jobType}</td>
                        <td className="border p-2">{job.vacancies}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => handleDownloadReport('jobs')}>
                Download Report
              </button>
              <h2 className="text-2xl font-bold mt-8 mb-4">Job-wise Vacancy Distribution</h2>
              <Bar data={jobsChartData} options={{ indexAxis: 'y' }} />
            </>
          )}
        </>
      )}
    </div>
  );
}