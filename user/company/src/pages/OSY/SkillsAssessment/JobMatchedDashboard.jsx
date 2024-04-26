import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Paper, Typography, Grid } from '@mui/material'
import JobCard2 from '@/components/JobCard'
import ProgressBar from './ProgressBar'
import { isEmpty } from 'lodash'
import {
  behavioralAssessment,
  softSkillsQuestionnaires,
  technicalSkillsQuestionnaires,
} from './constants'
import { JobAvailable } from './../../../../src/components'

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
  }, [setIsFetching])

  // Define categories
  const categories = [
    {
      name: 'Technical Skills Assessment',
      currentQuestion: 3,
      totalQuestions: technicalSkillsQuestionnaires?.length,
    },
    {
      name: 'Soft Skills Assessment',
      currentQuestion: 7,
      totalQuestions: softSkillsQuestionnaires?.length,
    },
    {
      name: 'Behavioral Assessment',
      currentQuestion: 5,
      totalQuestions: behavioralAssessment?.length,
    },
    // { name: 'Scenario-Based', currentQuestion: 5, totalQuestions: 10 },
  ]

  const handleButtonClick = () => {
    // Define functionality for the button click event here
  }

  return (
    <Container
      maxWidth="lg"
      style={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'flex-start',
        maxWidth: 'screen',
      }} // Adjust justifyContent to 'flex-start'
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <Paper
            elevation={0}
            style={{
              padding: '20px',
              borderRadius: '10px',
              background: '#fff',
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              style={{
                color: '#333',
                marginBottom: '20px',
                fontFamily: 'Poppins',
                fontWeight: '600',
              }}
            >
              Job Matches
            </Typography>
            <Grid container spacing={2}>
              <JobAvailable />

              {!isEmpty(matchedJobs) &&
                matchedJobs?.map((job) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={job.job_id}>
                    <JobCard2 job={job} />
                  </Grid>
                ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={2}>
          <div style={{ position: 'sticky', top: '20px' }}>
            <ProgressBar categories={categories} />
            <button onClick={handleButtonClick}>Start New Assessment</button>
          </div>
        </Grid>
      </Grid>
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
