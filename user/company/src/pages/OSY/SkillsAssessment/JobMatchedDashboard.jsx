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
  selfAssessment,
  softSkillsQuestionnaires,
  technicalSkillsQuestionnaires,
} from './constants'
import { JobAvailable } from '@/components'
import { generateSelfAssessment } from './selfAssessmentSummary.js'

const JobMatchedDashboard = () => {
  const [matchedJobs, setMatchedJobs] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [assessmentResult, setAssessmentResults] = useState('')
  const [selfAssessmentSummary, setSelfAssessmentSummary] = useState('')

  const totalPointsTech = technicalSkillsQuestionnaires.reduce(
    (total, item) => {
      // Check if the item has a 'point' key and if it's a number
      if (item && typeof item.points === 'number') {
        // Add the value of 'point' to the total
        return total + item.points
      } else {
        return total // Ignore invalid items
      }
    },
    0,
  )

  const totalPointsSoft = softSkillsQuestionnaires.reduce((total, item) => {
    // Check if the item has a 'point' key and if it's a number
    if (item && typeof item.points === 'number') {
      // Add the value of 'point' to the total
      return total + item.points
    } else {
      return total // Ignore invalid items
    }
  }, 0)

  const categories = [
    {
      name: 'Technical Skills Assessment',
      currentQuestion: localStorage.getItem(
        'technicalquestions-totalQuestionsAnswered',
      ),
      totalQuestions: technicalSkillsQuestionnaires?.length,
      score:
        localStorage.getItem('technicalquestions-score') !== null
          ? localStorage.getItem('technicalquestions-score')
          : undefined,
      totalPoints: totalPointsTech,
    },
    {
      name: 'Soft Skills Assessment',
      currentQuestion: localStorage.getItem('Literacy-totalQuestionsAnswered'),
      totalQuestions: softSkillsQuestionnaires?.length,
      score:
        localStorage.getItem('Literacy-score') !== null
          ? localStorage.getItem('Literacy-score')
          : undefined,
      totalPoints: totalPointsSoft,
    },
    {
      name: 'Self Assessment Tool',
      currentQuestion: localStorage.getItem(
        'SelfAssessmentQuestions-totalQuestionsAnswered',
      ),
      totalQuestions: selfAssessment?.length,
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

  // Handles summary for technical skills questions
  useEffect(() => {
    const score = localStorage.getItem('technicalquestions-score')
    const _result = evaluateSkills(score)
    setAssessmentResults(_result)
    localStorage.setItem('resultAssessment', _result)

    // console.log(localStorage.getItem('SelfAssessmentQuestions-answers'))
  }, [])

  // Handles summary for self assessment questions
  useEffect(() => {
    const assessmentDataString = localStorage.getItem(
      'SelfAssessmentQuestions-answers',
    )

    if (assessmentDataString) {
      console.log('Retrieved data from localStorage:', assessmentDataString)

      try {
        const assessmentData = JSON.parse(assessmentDataString)
        console.log('Parsed assessment data:', assessmentData)

        const generatedSelfAssessmentSummary =
          generateSelfAssessment(assessmentData)
        setSelfAssessmentSummary(generatedSelfAssessmentSummary)
        console.log(selfAssessmentSummary)
      } catch (error) {
        console.error('Error parsing assessment data from localStorage:', error)
      }
    } else {
      console.warn('No assessment data found in localStorage.')
    }
  }, [])

  return (
    <Container maxWidth="xl" style={{ marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Paper
            elevation={3}
            style={{ padding: '20px', borderRadius: '10px' }}
          >
            <Typography
              variant="h4"
              gutterBottom
              style={{
                color: '#333',
                marginBottom: '30px',
                fontFamily: 'Poppins',
                fontWeight: '600',
              }}
            >
              Assessment Results
            </Typography>
            <Grid container spacing={3}>
              {categories.map((category, index) => (
                <Grid item xs={12} sm={12} md={4} key={index}>
                  <Paper
                    elevation={2}
                    style={{
                      padding: '20px',
                      borderRadius: '10px',
                      background: '#fff',
                      marginBottom: '20px',

                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        color: '#333',
                        fontWeight: '600',
                        marginBottom: '10px',
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color:
                          category.score !== undefined && category.score !== 0
                            ? category.score / category.totalPoints >= 0.6
                              ? 'green'
                              : 'red'
                            : '',
                      }}
                    >
                      {category.score !== undefined && category.score !== 0 ? (
                        <>
                          {category.score} out of {category.totalPoints}
                        </>
                      ) : (
                        'Score not available'
                      )}
                    </Typography>

                    <Typography
                      variant="body2"
                      style={{
                        color: '#333',
                        marginBottom: '20px',
                        flex: 1,
                        height: '100vh',
                      }}
                    >
                      {category.score
                        ? assessmentResult
                        : selfAssessmentSummary}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
              <br />

              <JobAvailable
                showTopJobs={true}
                showHeader={false}
                showBasedSkills={false}
              />
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            style={{
              padding: '20px',
              borderRadius: '10px',
              background: '#f9f9f9',
              width: '360px',
              height: '103vh',
            }}
          >
            <Typography
              variant="h6"
              style={{ color: '#333', fontWeight: '600', marginBottom: '1px' }}
            >
              Progress
            </Typography>
            <ProgressBar categories={categories} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default JobMatchedDashboard
