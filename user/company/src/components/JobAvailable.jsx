import React, { useState, useEffect } from 'react';
import JobCard from "./JobCard";

export default function JobAvailable() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch the data from your database
    const fetchData = async () => {
      const response = await fetch('/jobs');
      const jobs = await response.json();
      setJobs(jobs);
    };
    fetchData();
  }, []);

  return (
    <div
      className="bg-white p-4 rounded-lg border border-gray flex flex-col flex-2 w-full"
      style={{ height: "32rem" }}
    >
      {" "}
      <div className="flex flex-row justify-between items-center">
        <strong className="font-bold text-3xl">Job Available</strong>
        <strong className="font-bold text-xl">View All</strong>
      </div>
      <div className="flex gap-2 py-4">
        {jobs && jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}
