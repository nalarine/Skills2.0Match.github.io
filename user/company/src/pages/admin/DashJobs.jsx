import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/index';

const DashJobs = () => {
  const [data, setData] = useState([]);
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
            jobType: job.jobType || '', // Populate jobType
            vacancies: job.vacancies || 0, // Populate vacancies
          }));
          setData(modifiedJobs);
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
    fetchJobs();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '90%' }}>
        <div style={{ marginTop: '100px' }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="">
              <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 font-poppins">
                {/* Table headers */}
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Job Title</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Company</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Location</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Job Type</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Vacancies</th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {/* Map over your data array to generate table rows */}
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">{row.jobTitle}</td>
                      <td className="px-6 py-4">{row.company}</td>
                      <td className="px-6 py-4">{row.location}</td>
                      <td className="px-6 py-4">{row.jobType}</td>
                      <td className="px-6 py-4">{row.vacancies}</td>
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