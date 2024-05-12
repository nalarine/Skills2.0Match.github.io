import { useState, useEffect } from 'react'
import { apiRequest } from '../utils' // Import your API request utility
import Loading from '../components/Loading' // Import your Loading component
import JobCard from '../components/JobCard' // Import your JobCard component
import { useSelector } from 'react-redux'
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import { semanticSearch } from '../utils/SemanticSearch.jsx'
import { result } from 'lodash'

const JobAvailable = ({ showTopJobs, showHeader }) => {
  const { user } = useSelector((state) => state.user)
  const [postedJobs, setPostedJobs] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [matchedJobs, setMatchedJobs] = useState([]) // State to hold matched jobs
  const [matchedJobsAssessment, setMatchedJobAssessment] = useState([])
  const [resultAssessment, setResultAssessment] = useState(null)

  useEffect(() => {
    const resultAssessment = localStorage.getItem('resultAssessment')

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

        let jobDetails = []
        for (const job of response.data || []) {
          jobDetails.push(job.detail[0].desc)
        }
        // console.log(jobDetails)
        const userResponse = await apiRequest({
          url: `/users/get-user`,
          token: JSON.parse(localStorage.getItem('userInfo')).token,
          method: 'GET',
        })
        const userSkills = userResponse.user.skills
        // Uses semanticSearch for job matching
        const matchedJobItems = await semanticSearch(jobDetails, userSkills) // Query from User-defined skills
        // Semantic search using assessment result as query

        if (resultAssessment) {
          const matchedJobItemsAssessmentBased = await semanticSearch(
            jobDetails,
            resultAssessment,
          )

          setMatchedJobAssessment(matchedJobItemsAssessmentBased.slice(0, 3))
          setResultAssessment(resultAssessment)
        }
        console.log(matchedJobItems.slice(0, 3))
        console.log(matchedJobsAssessment)

        // Set matched jobs to state
        if (showTopJobs === true) {
          setMatchedJobs(matchedJobItems.slice(0, 3))
        } else {
          setMatchedJobs(matchedJobItems)
        }
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
      setIsFetching(false)
    }

    fetchJobs()
  }, [user?._id])

  if (!user?._id) {
    return <div>No user data available.</div>
  }

  return (
    <div
      className="p-4 rounded-lg border border-gray flex flex-col flex-2 w-full"
      style={{ height: '100vh' }} // Set height to 100vh for full screen height
    >
      {showHeader ? (
        <DashboardStatsGrid
          jobMatches={matchedJobs.length + matchedJobsAssessment.length}
        />
      ) : (
        ''
      )}
      <div className="flex flex-row justify-between items-center">
        <strong className="font-bold text-2xl mb-4 ml-20 mt-5">
        Top 3 jobs matched to your skills
        </strong>
      </div>
      <div className="w-full flex flex-wrap gap-4 justify-center ">
        {matchedJobs.map((matchedJob, index) => (
          <JobCard job={postedJobs[matchedJob.document]} key={index} />
        ))}
      </div>
      {resultAssessment && resultAssessment?.length > 0 && (
        <>
          <div className="flex flex-row justify-between items-center mt-5 ml-20">
            <strong className="font-bold text-2xl mb-4">
              Top 3 jobs matched based on assessed skills
            </strong>
          </div>
          <div className="w-full flex flex-wrap gap-4 justify-center">
            {matchedJobsAssessment.map((matchedJob, index) => (
              <JobCard job={postedJobs[matchedJob.document]} key={index} />
            ))}
          </div>
        </>
      )}
      {isFetching && <Loading />}
    </div>
  )
}

export default JobAvailable
