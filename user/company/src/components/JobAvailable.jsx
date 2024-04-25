import React, { useState, useEffect } from 'react'
import { apiRequest } from '../utils' // Import your API request utility
import { useSelector } from 'react-redux'
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Grid,
} from '@mui/material'
import JobCard from '../components/JobCard' // Import your JobCard component
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
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper
        elevation={3}
        style={{ padding: '20px', borderRadius: '10px', background: '#fff' }}
      >
        <DashboardStatsGrid jobMatches={postedJobs.length} />
        <Typography
          variant="h4"
          gutterBottom
          style={{
            color: '#333',
            marginBottom: '20px',
            fontFamily: 'Poppins',
            flex: '0',
            fontWeight: '600',
          }}
        >
          Job Matches
        </Typography>
        <Grid container spacing={2}>
          {isFetching ? (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            postedJobs.map((job, index) => {
              const newJob = {
                name: job?.company?.name,
                logo: job?.company?.profileUrl,
                ...job,
              }

              return (
                job.vacancies >= 1 && (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <JobCard job={newJob} />
                  </Grid>
                )
              )
            })
          )}
        </Grid>
      </Paper>
    </Container>
  )
}

export default JobAvailable
