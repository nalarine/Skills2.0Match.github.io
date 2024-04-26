import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Box, // Add Box component for layout
} from '@mui/material'
import JobCard from '../components/JobCard' // Import your JobCard component
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import ProgressBar from './ProgressBar' // Import your ProgressBar component

const JobMatchedDashboard = () => {
  const { user } = useSelector((state) => state.user)
  const [matchedJobs, setMatchedJobs] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    // Simulate fetching matched jobs (replace with actual API call)
    setIsFetching(true)
    // Replace this with your actual API call to fetch matched jobs
    setTimeout(() => {
      const dummyMatchedJobs = [
        {
          id: 1,
          title: 'Software Engineer',
          company: 'ABC Tech',
          location: 'San Francisco, CA',
        },
        {
          id: 2,
          title: 'Data Analyst',
          company: 'XYZ Corp',
          location: 'New York, NY',
        },
        {
          id: 3,
          title: 'Product Manager',
          company: '123 Inc',
          location: 'Seattle, WA',
        },
      ]
      setMatchedJobs(dummyMatchedJobs)
      setIsFetching(false)
    }, 1500) // Simulate loading delay
  }, [])

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper
        elevation={3}
        style={{
          padding: '20px',
          borderRadius: '10px',
          background: '#fff',
          display: 'flex',
        }} // Use flex to arrange content horizontally
      >
        <div style={{ flex: 1 }}>
          {' '}
          {/* Left side content */}
          <DashboardStatsGrid jobMatches={matchedJobs.length} />
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
              matchedJobs.map((job) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
                  <JobCard job={job} />
                </Grid>
              ))
            )}
          </Grid>
        </div>
        <Box
          style={{
            marginLeft: '20px', // Add spacing between the main content and the progress bar
            width: '100px', // Adjust width of the progress bar sidebar
          }}
        >
          {/* Progress bar here */}
          <ProgressBar currentQuestion={0} totalQuestions={10} />{' '}
          {/* Example usage */}
        </Box>
      </Paper>
    </Container>
  )
}

export default JobMatchedDashboard
