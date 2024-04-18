import { GoLocation } from 'react-icons/go';
import moment from 'moment';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; // Import useState and useEffect from React
import { Skeleton } from "@nextui-org/react";

const JobCard = ({ job }) => {
  // State to manage hover state and loading state for Skeleton components
  const [isHovered, setIsHovered] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    // Set a timer to hide Skeleton components after 3 seconds
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, []); // Run this effect only once after the initial render

  return (
    <Link to={`/job-detail/${job?._id}`}>
      <div
        className="w-full md:w-[20rem] 2xl:w-[18rem] min-h-[16rem] md:min-h-[18rem] bg-white flex flex-col justify-between shadow-lg 
               rounded-md px-3 py-5 overflow-hidden"
        style={{
          outline: isHovered ? '2px solid green' : 'none', // Apply outline when hovered
          transition: 'outline 0.1s ease', // Smooth transition
        }}
        onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on mouse enter
        onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
      >
        <div className="flex gap-3">
          {showSkeleton ? (
            <Skeleton img src={job?.logo} alt={job?.name} className="w-16 h-16" />
          ) : (
            <img src={job?.logo} alt={job?.name} className="w-16 h-16" />
          )}
          
          <div className="w-full h-16 flex flex-col justify-center">
            {showSkeleton ? (
              <>
                <Skeleton className="w-full h-12 flex items-center text-lg font-semibold overflow-hidden leading-5">
                  {job?.jobTitle}
                </Skeleton>
                <Skeleton className="flex gap-2 items-center">
                  <GoLocation className="text-slate-900 text-sm" />
                  {job?.location}
                </Skeleton>
              </>
            ) : (
              <>
                <div className="w-full h-12 flex items-center text-lg font-semibold overflow-hidden leading-5">
                  {job?.jobTitle}
                </div>
                <div className="flex gap-2 items-center">
                  <GoLocation className="text-slate-900 text-sm" />
                  {job?.location}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="py-3">
          {showSkeleton ? (
            <Skeleton className="text-sm">
              {job?.detail[0]?.desc?.slice(0, 150) + '...'}
            </Skeleton>
          ) : (
            <div className="text-sm">
              {job?.detail[0]?.desc?.slice(0, 150) + '...'}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          {showSkeleton ? (
            <>
              <Skeleton className="bg-[#BEF264] text-[#86CA16 ] py-0.5 px-1.5 rounded font-semibold text-sm">
                {job?.jobType}
              </Skeleton>
              <Skeleton className="text-gray-500 text-sm">
                {moment(job?.createdAt).fromNow()}
              </Skeleton>
            </>
          ) : (
            <>
              <div className="bg-[#BEF264] text-[#86CA16 ] py-0.5 px-1.5 rounded font-semibold text-sm">
                {job?.jobType}
              </div>
              <div className="text-gray-500 text-sm">
                {moment(job?.createdAt).fromNow()}
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
