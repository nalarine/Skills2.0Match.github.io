import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/index';

const DashJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        } else {
          console.error('Error: Jobs data is missing or not an array');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

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
        } else {
          console.error('Error: Companies data is missing or not an array');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchJobs();
    fetchCompanies();
  }, []);

  const getCompanyName = (companyId) => {
    const company = companies.find((company) => company.id === companyId);
    return company ? company.name : 'N/A';
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '90%' }}>
          <div style={{ marginTop: '100px' }}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 font-poppins">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Job Title</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Company</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Location</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Job Type</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Vacancies</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4">{job.jobTitle}</td>
                        <td className="px-6 py-4">{getCompanyName(job.company)}</td>
                        <td className="px-6 py-4">{job.location}</td>
                        <td className="px-6 py-4">{job.jobType}</td>
                        <td className="px-6 py-4">{job.vacancies}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashJobs;