import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Container, Paper, Typography, Grid, Box } from '@mui/material'
import JobCard2 from '@/components/JobCard'
import ProgressBar from './ProgressBar'
import { isEmpty } from 'lodash'

const JobMatchedDashboard = () => {
  const [matchedJobs, setMatchedJobs] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setIsFetching(true)
    setTimeout(() => {
      const dummyMatchedJobs = searchJob({
        query: ['public speaking', 'communication'],
        k: 5,
      })
      setMatchedJobs(dummyMatchedJobs)
      setIsFetching(false)
    }, 1500)
  }, [searchJob, setIsFetching])

  // Define categories
  const categories = [
    {
      name: 'Technical Skills Assessment',
      currentQuestion: 3,
      totalQuestions: 10,
    },
    { name: 'Soft Skills Assessment', currentQuestion: 7, totalQuestions: 10 },
    { name: 'Behavioral Assessment', currentQuestion: 5, totalQuestions: 10 },
    { name: 'Scenario-Based', currentQuestion: 5, totalQuestions: 10 },
  ]

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper
        elevation={3}
        style={{
          padding: '20px',
          borderRadius: '10px',
          background: '#fff',
          display: 'flex',
        }}
      >
        <div style={{ flex: 1 }}>
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
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Pass categories as props */}
              <ProgressBar categories={categories} />
            </div>

            {!isEmpty(matchedJobs) &&
              matchedJobs?.map((job) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={job.job_id}>
                  <JobCard2 job={job} />
                </Grid>
              ))}
          </Grid>
        </div>
        {/* No need to render additional components like New Job Suited, Schedule Interview, and Messages Received */}
      </Paper>
    </Container>
  )
}

async function searchJob(payload) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  }
  try {
    const response = await axios.post(
      'http://127.0.0.1:5000/match',
      payload,
      headers,
    )
    console.log(response.data)
    return JSON.parse(response.data)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default JobMatchedDashboard
