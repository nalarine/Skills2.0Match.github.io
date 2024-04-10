import { useState, useEffect } from 'react'
import { apiRequest } from '../utils' // Import your API request utility
import Loading from '../components/Loading' // Import your Loading component
import JobCard from '../components/JobCard' // Import your JobCard component
import { useSelector } from 'react-redux'
import DashboardStatsGrid from '../components/DashboardStatsGrid'

const JobAvailable = () => {
  const { user } = useSelector((state) => state.user)
  const [postedJobs, setPostedJobs] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchJobs = async () => {
      setIsFetching(true)
      try {
        const response = await apiRequest({
          // url: "/jobs/job-available",
          url: '/jobs/job-available?user_id=' + user._id,
          method: 'GET',
        })
        setPostedJobs(response.data)
        setIsFetching(false)
      } catch (error) {
        console.error('Error fetching jobs:', error)
        setIsFetching(false)
      }
    }
    fetchJobs()
  }, [user._id])

  return (
    <div
      className="p-4 rounded-lg border border-gray flex flex-col flex-2 w-full"
      style={{ height: '32rem' }}
    >
      <DashboardStatsGrid jobMatches={postedJobs.length} />
      <div className="flex flex-row justify-between items-center">
        <strong className="font-bold text-3xl mb-4">Job Matches</strong>
        {/* <strong className="font-bold text-xl">View All</strong> */}
      </div>
      <div className="w-full flex flex-wrap gap-4">
        {postedJobs &&
          postedJobs.map((job, index) => {
            const newJob = {
              name: job?.company?.name,
              logo: job?.company?.profileUrl,
              ...job,
            }

            return job.vacancies >= 1 && <JobCard job={newJob} key={index} />
          })}
      </div>
      {isFetching && (
        <div className="py-10">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default JobAvailable
