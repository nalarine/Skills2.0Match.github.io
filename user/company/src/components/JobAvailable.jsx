import { useState, useEffect } from "react";
import { apiRequest } from "../utils"; // Import your API request utility
import Loading from "../components/Loading"; // Import your Loading component
import JobCard from "../components/JobCard"; // Import your JobCard component

const JobAvailable = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsFetching(true);
      try {
        const response = await apiRequest({
          url: "/jobs/job-available",
          method: "GET",
        });
        setPostedJobs(response.data);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setIsFetching(false);
      }
    };
    fetchJobs();
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
};

export default JobAvailable;