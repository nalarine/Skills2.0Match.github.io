import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const GenerateReports = () => {
  // State for selected start and end dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // State for filtering applicants and jobs
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  // Dummy data for applicants and jobs
  const applicants = [
    { id: 1, name: 'John Doe', email: 'john@example.com', appliedDate: '2024-04-10' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', appliedDate: '2024-04-12' },
    // Add more dummy applicants as needed
  ];

  const jobs = [
    { id: 1, title: 'Frontend Developer', company: 'ABC Inc.', postedDate: '2024-04-09' },
    { id: 2, title: 'Backend Developer', company: 'XYZ Corp.', postedDate: '2024-04-11' },
    // Add more dummy jobs as needed
  ];

  // Function to filter applicants and jobs based on selected dates
  const filterData = () => {
    const filteredApplicants = applicants.filter(applicant => {
      const appliedDate = new Date(applicant.appliedDate);
      return (!startDate || appliedDate >= startDate) && (!endDate || appliedDate <= endDate);
    });
    const filteredJobs = jobs.filter(job => {
      const postedDate = new Date(job.postedDate);
      return (!startDate || postedDate >= startDate) && (!endDate || postedDate <= endDate);
    });
    setFilteredApplicants(filteredApplicants);
    setFilteredJobs(filteredJobs);
  };

  // Function to generate report
  const generateReport = () => {
    // Add logic to generate report using selected dates and filtered data
    console.log('Generating report...');
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Reports</h2>
      {/* Date pickers for start and end dates */}
      <div className="flex mb-4">
        <div className="mr-4">
          <label className="block text-sm font-medium">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <button
        onClick={filterData}
        className="bg-green-700 hover:bg-green-200 text-white hover:text-green-700 text-white font-bold py-2 px-4 rounded mb-4 ml-4 mt-5" // Adjust the margin-top as needed
      >
        Apply Filters
      </button>
      </div>

      {/* Tables for filtered applicants and jobs */}
      <div className="grid grid-cols-2 gap-4">
        {/* Table for filtered applicants */}
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Applicants</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td className="border px-4 py-2">{applicant.name}</td>
                  <td className="border px-4 py-2">{applicant.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table for filtered job postings */}
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Job Postings</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Company</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td className="border px-4 py-2">{job.title}</td>
                  <td className="border px-4 py-2">{job.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>-

      {/* Button to generate report */}
      <button
        onClick={generateReport}
        className="bg-green-700 hover:bg-green-200 text-white hover:text-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Generate Report
      </button>

      {/* Placeholder for SVG template */}
      {/* You can insert SVG templates for styling here */}
    </div>
  );
};

export default GenerateReports;
