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
      if (!user?._id) {
        // No user id available, cannot fetch jobs
        console.error('No user ID available, skipping jobs fetch.')
        return
      }

      setIsFetching(true)
      try {
        const response = await apiRequest({
          url: `/jobs/job-available?user_id=${user._id}`,
          method: 'GET',
        })
        setPostedJobs(response.data || []) // Ensure always an array
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
      setIsFetching(false)
    }

    fetchJobs()
  }, [user._id])

  if (!user?._id) {
    return <div>No user data available.</div>
  }

  return (
    <div
      className="p-4 rounded-lg border border-gray flex flex-col flex-2 w-full"
      style={{ height: '32rem' }}
    >
      <DashboardStatsGrid jobMatches={postedJobs.length} />
      <div className="flex flex-row justify-between items-center">
        <strong className="font-bold text-3xl mb-4">Job Matches</strong>
      </div>
      <div className="w-full flex flex-wrap gap-4">
        {postedJobs.map((job, index) => {
          const newJob = {
            name: job?.company?.name,
            logo: job?.company?.profileUrl,
            ...job,
          }

          return job.vacancies >= 0 && <JobCard job={newJob} key={index} />
        })}
      </div>
      {isFetching && <Loading />}
    </div>
  )
}

export default JobAvailable
