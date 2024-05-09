import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Paper,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material'
import JobCard2 from '@/components/JobCard'
import ProgressBar from './ProgressBar'
import { isEmpty } from 'lodash'
import {
  behavioralAssessment,
  softSkillsQuestionnaires,
  technicalSkillsQuestionnaires,
} from './constants'
import { JobAvailable } from '@/components'

const JobMatchedDashboard = () => {
  const [matchedJobs, setMatchedJobs] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [assessmentResult, setAssessmentResults] = useState('')

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
  }, [])

  const categories = [
    {
      name: 'Technical Skills Assessment',
      currentQuestion: localStorage.getItem('totalQuestionsAnswered'),
      totalQuestions: technicalSkillsQuestionnaires?.length,
      score: localStorage.getItem('score'),
      totalPoints: 95,
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
  ]

  const evaluateSkills = (score) => {
    if (score >= 0.8 * 95) {
      return 'Advanced proficiency in basic math, math problem-solving, reading comprehension, writing, and digital literacy.'
    } else if (score >= 0.6 * 95 && score <= 0.79 * 95) {
      return 'Strong skills in basic math, math problem-solving, reading comprehension, writing, and fundamental knowledge in digital literacy.'
    } else if (score >= 0.4 * 95 && score <= 0.59 * 95) {
      return 'Adequate skills in basic math, math problem-solving, reading comprehension, writing, with basic knowledge in digital literacy.'
    } else {
      return 'Needs improvement in basic math, math problem-solving, reading comprehension, writing, and digital literacy.'
    }
  }

  useEffect(() => {
    const score = localStorage.getItem('score')
    const _result = evaluateSkills(score)
    setAssessmentResults(_result)
    localStorage.setItem('resultAssessment', _result)
  }, [])

  const handleButtonClick = () => {
    // Define functionality for the button click event here
  }

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: '20px', marginRight: '200px' }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <Paper
            elevation={0}
            style={{
              marginTop: '10px',
              padding: '20px',
              borderRadius: '10px',
              background: '#f9f9f9',
              height: '175%',
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
              Assessment Results
            </Typography>

            <Grid container spacing={2}>
              {categories.map((category, index) => (
                <Grid item xs={4} key={index}>
                  <Typography
                    variant="body1"
                    style={{
                      color: '#000',
                      marginBottom: '10px',
                      fontWeight: '600',
                      borderBottom: '2px solid #333',
                      paddingBottom: '5px',
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Typography variant="body2" style={{ color: 'red' }}>
                    Total Score: {category.score} out of {category.totalPoints}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: '#000', marginBottom: '20px' }}
                  >
                    {category.score
                      ? assessmentResult
                      : 'Assessment not completed'}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <JobAvailable showTop={false} showHeader={false} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={2}>
          <div style={{ position: 'sticky', top: '20px' }}>
            <ProgressBar categories={categories} />
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

// async function searchJob(payload) {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Credentials': true,
//   };
//   try {
//     const response = await axios.post('http://127.0.0.1:5000/match', payload, {
//       headers: headers,
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export default JobMatchedDashboard
