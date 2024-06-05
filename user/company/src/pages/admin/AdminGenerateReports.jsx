import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  const handleDownloadReport = (type, format) => {
    let data;
    let filename;
    
    switch (type) {
      case 'users':
        data = users.map(({ id, ...rest }) => rest); // Remove 'id' field
        filename = 'users_report';
        break;
      case 'companies':
        data = companies.map(({ id, ...rest }) => rest); // Remove 'id' field
        filename = 'companies_report';
        break;
      case 'jobs':
        data = jobs.map(({ id, ...rest }) => rest); // Remove 'id' field
        filename = 'jobs_report';
        break;
      default:
        return;
    }
  
    // Filter data based on selected criteria
    if (selectedFilter !== 'all') {
      data = data.filter(item => {
        switch (type) {
          case 'users':
            switch (selectedFilter) {
              case 'registrationDate':
                return new Date(item.createdAt) >= startDate && new Date(item.createdAt) <= endDate;
              case 'birthday':
                return item.birthdate === new Date().toLocaleDateString();
              case 'age':
                return item.age === calculateAge(new Date().setFullYear(new Date().getFullYear() - parseInt(searchQuery)));
              default:
                return true;
            }
          case 'companies':
            switch (selectedFilter) {
              case 'name':
                return item.name.includes(searchQuery); // Filter by name
              case 'email':
                return item.email.includes(searchQuery); // Filter by email
              case 'location':
                return item.location.includes(searchQuery); // Filter by location
              default:
                return true;
            }
          case 'jobs':
            switch (selectedFilter) {
              case 'title':
                return item.title.includes(searchQuery);
              case 'type':
                return item.jobType.includes(searchQuery);
              case 'company':
                return item.company.includes(searchQuery);
              case 'vacancies':
                return item.vacancies === parseInt(searchQuery);
              default:
                return true;
            }
          default:
            return true;
        }
      });
    }
  
    if (format === 'pdf') {
      const doc = new jsPDF({
        orientation: 'landscape'
      });
  
      // Prepare data for the PDF
      const headers = Object.keys(data[0]);
      const content = data.map(row => Object.values(row));
  
      // Remove 'id' field from headers and content
      const idIndex = headers.indexOf('id');
      if (idIndex !== -1) {
        headers.splice(idIndex, 1);
        content.forEach(row => row.splice(idIndex, 1));
      }
  
      // Add autotable plugin
      doc.autoTable({
        head: [headers],
        body: content,
        startY: 20, // Adjust the starting position if needed
        columnStyles: { 0: { cellWidth: 'auto' } }, // Adjust the width of the first column
        bodyStyles: { minCellHeight: 15 } // Adjust the height of the rows
      });
  
      // Save the PDF
      doc.save(`${filename}.pdf`);
    }
  };
  
  
  const getCompanyName = (companyId) => {
    const company = companies.find((company) => company.id === companyId);
    return company ? company.name : 'N/A';
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    const companyName = getCompanyName(job.company);
    return (
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 mt-12">Generate Reports</h1>
        <ToastContainer />
        <div className="mb-4 flex justify-between">
          <div className="relative">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={toggleDropdown}
            >
              Generate Reports
            </button>
            {isActionsOpen && (
              <div className="absolute bg-white border rounded mt-2 py-2 w-48">
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  onClick={handleAllApplicantsClick}
                >
                  List of all Applicants
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  onClick={handleListOfCompaniesClick}
                >
                  List of all Companies
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  onClick={handleListOfJobsClick}
                >
                  List of all Jobs
                </button>
              </div>
            )}
          </div>
        </div>
        {reportType === 'userList' && (
          <div>
            <h2 className="text-xl font-bold mb-4">List of all Applicants</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <div className="flex items-center mb-4">
                  <label className="mr-2">Filter by:</label>
                  <select
                    className="border rounded px-2 py-1 mr-4"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="registrationDate">Registration Date</option>
                    <option value="birthdate">Birthdate</option>
                    <option value="age">Age</option>
                  </select>
                  {selectedFilter === 'registrationDate' && (
                    <div className="flex items-center mr-4">
                      <DatePicker
                        selected={startDate}
                        onChange={(update) => setDateRange(update)}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                      />
                    </div>
                  )}
                  {selectedFilter === 'age' && (
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="border rounded px-2 py-1"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter age"
                      />
                    </div>
                  )}
                   <button
                      className="bg-green-500 text-white px-4 py-2 rounded ml-4"
                      onClick={() => handleDownloadReport('users', 'pdf')}
                    >
                      Download Users PDF
                    </button>
                </div>
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Email</th>
                      <th className="px-4 py-2 border">Birthdate</th>
                      <th className="px-4 py-2 border">Age</th>
                      <th className="px-4 py-2 border">Registration Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-4 py-2 border">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="px-4 py-2 border">{user.email}</td>
                        <td className="px-4 py-2 border">{user.birthdate}</td>
                        <td className="px-4 py-2 border">{user.age}</td>
                        <td className="px-4 py-2 border">{user.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-4 flex justify-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 border mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
        {reportType === 'companyList' && (
          <div>
            <h2 className="text-xl font-bold mb-4">List of all Companies</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
              <div className="flex items-center mb-4">
                <label className="mr-2">Filter by:</label>
                <select
                  className="border rounded px-2 py-1 mr-4"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="location">Location</option>
                </select>
                {selectedFilter === 'registrationDate' && (
                  <div className="flex items-center mr-4">
                    <DatePicker
                      selected={startDate}
                      onChange={(update) => setDateRange(update)}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      inline
                    />
                  </div>
                )}
                {selectedFilter === 'age' && (
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="border rounded px-2 py-1"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter age"
                    />
                  </div>
                )}
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                  onClick={() => handleDownloadReport('companies', 'pdf')}
                >
                  Download Companies PDF
                </button>
              </div>
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.id}>
                      <td className="px-4 py-2 border">{company.name}</td>
                      <td className="px-4 py-2 border">{company.email}</td>
                      <td className="px-4 py-2 border">{company.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
          </div>
        )}

        {reportType === 'jobList' && (
          <div>
            <h2 className="text-xl font-bold mb-4">List of all Jobs</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
              <div className="flex items-center mb-4">
                <label className="mr-2">Filter by:</label>
                <select
                  className="border rounded px-2 py-1 mr-4"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="jobTitle">Title</option>
                  <option value="company">Job Type</option>
                  <option value="jobType">Company</option>
                  <option value="vacancies">Vacancy</option>
                </select>
                {selectedFilter === 'registrationDate' && (
                  <div className="flex items-center mr-4">
                    <DatePicker
                      selected={startDate}
                      onChange={(update) => setDateRange(update)}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      inline
                    />
                  </div>
                )}
                {selectedFilter === 'age' && (
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="border rounded px-2 py-1"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter age"
                    />
                  </div>
                )}
                  <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-2"
                onClick={() => handleDownloadReport('jobs', 'pdf')}
              >
                Download Jobs PDF
              </button>
              </div>
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Title</th>
                    <th className="px-4 py-2 border">Company</th>
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">Vacancies</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td className="px-4 py-2 border">{job.jobTitle}</td>
                      <td className="px-4 py-2 border">{getCompanyName(job.company)}</td>
                      <td className="px-4 py-2 border">{job.jobType}</td>
                      <td className="px-4 py-2 border">{job.vacancies}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

