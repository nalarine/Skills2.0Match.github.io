import React, { useState, useEffect } from 'react'
import { GoLocation } from 'react-icons/go'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Skeleton } from '@nextui-org/react'

const JobCard2 = ({ job, onSave, isSaved }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSaveJob = () => {
    onSave(job)
  }

  return (
    <div className="relative">
      <Link to={`/job-detail/${job?.job_id}`}>
        <div
          className="w-full md:w-[20rem] 2xl:w-[18rem] min-h-[16rem] md:min-h-[18rem] bg-white flex flex-col justify-between shadow-lg rounded-md px-3 py-5 overflow-hidden"
          style={{
            outline: isHovering ? '2px solid green' : 'none',
            transition: 'outline 0.1s ease',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex gap-3">
            {showSkeleton ? (
              <Skeleton
                img
                src={job?.logo}
                alt={job?.employer_name}
                className="w-16 h-16"
              />
            ) : (
              <img
                src={job?.logo}
                alt={job?.employer_name}
                className="w-16 h-16"
              />
            )}

            <div className="w-full h-16 flex flex-col justify-center">
              {showSkeleton ? (
                <>
                  <Skeleton className="w-full h-12 flex items-center text-lg font-semibold overflow-hidden leading-5">
                    {job?.job_title}
                  </Skeleton>
                  <Skeleton className="flex gap-2 items-center">
                    <GoLocation className="text-slate-900 text-sm" />
                    {job?.job_city}, {job?.job_state}, {job?.job_country}
                  </Skeleton>
                </>
              ) : (
                <>
                  <div className="w-full h-12 flex items-center text-lg font-semibold overflow-hidden leading-5">
                    {job?.job_title}
                  </div>
                  <div className="flex gap-2 items-center text-left">
                    <GoLocation className="text-slate-900 text-sm" />
                    {job?.job_city}, {job?.job_state}, {job?.job_country}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="py-3">
            {showSkeleton ? (
              <Skeleton className="text-sm">{job?.job_description}</Skeleton>
            ) : (
              <div className="text-sm">{job?.job_description}</div>
            )}
          </div>

          <div className="flex items-center justify-between">
            {showSkeleton ? (
              <>
                <Skeleton className="bg-[#BEF264] text-[#86CA16] py-0.5 px-1.5 rounded font-semibold text-sm">
                  {job?.job_employment_type}
                </Skeleton>
                <Skeleton className="text-gray-500 text-sm">
                  {moment(job?.createdAt).fromNow()}
                </Skeleton>
              </>
            ) : (
              <>
                <div className="bg-[#BEF264] text-[#86CA16] py-0.5 px-1.5 rounded font-semibold text-sm">
                  {job?.job_employment_type}
                </div>
                <div className="text-gray-500 text-sm">
                  {moment(job?.createdAt).fromNow()}
                </div>
              </>
            )}
          </div>
        </div>
      </Link>

      <button onClick={handleSaveJob} className="absolute top-2 right-2">
        {showSkeleton ? (
          <Skeleton className="h-6 w-6" />
        ) : (
          <>
            {isSaved ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 hover:text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
                />
              </svg>
            )}
          </>
        )}
      </button>
    </div>
  )
}

export default JobCard2
