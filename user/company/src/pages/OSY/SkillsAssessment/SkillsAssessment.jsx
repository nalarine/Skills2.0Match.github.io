import React, { useCallback, useState } from 'react'
import axios from 'axios'
import {
  Typography,
  Button,
  Container,
  Paper,
  CircularProgress,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import Questions from './Questions'
import AssessmentCategorySelect from './AssessmentCategorySelect'
import { useNavigate } from 'react-router-dom'

const candidate = {
  skills: ['cleaning', 'data entry', 'food server', 'cook'],
  experience: 1,
  location: 'NCR Metro Manila Manila',
  desiredSalary: 2000,
}

function calculateJobScore(job, candidate) {
  let score = 0

  job?.skillsRequired?.forEach((skill) => {
    if (candidate.skills.includes(skill)) {
      score += 1
    }
  })

  if (job.experience <= candidate.experience) {
    score += 1
  }

  if (job.location === candidate.location) {
    score += 1
  }

  if (job.salary >= candidate.desiredSalary) {
    score += 1
  }

  return score
}

function findSuitableJobs(candidate, jobs) {
  return jobs
    .map((job) => ({
      ...job,
      score: calculateJobScore(job, candidate),
    }))
    .filter((job) => job.score >= 2)
    .sort((a, b) => b.score - a.score)
}

const SkillsAssessment = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [error, setError] = useState(null)
  const [showCategorySelect, setShowCategorySelect] = useState(false)
  const [showQuestions, setShowQuestions] = useState(false) // State to manage visibility of questions
  const [loading, setLoading] = useState(false) // State to manage loading indicator

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const fetchAllJobs = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        'http://localhost:8800/api-v1/jobs/alljobs',
      )
      if (response.data.success) {
        setJobs(response.data.data)
      }
    } catch (error) {
      setError('Failed to fetch jobs')
    } finally {
      setLoading(false)
    }
  }

  const handleStartAssessment = useCallback(() => {
    // setShowQuestions(true)
    setShowCategorySelect(true)
    navigate('/skills-assessment/select-category')
  }, [setShowCategorySelect])

  const onSubmit = () => console.log('on submit')

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper
        elevation={3}
        style={{ padding: '90px', borderRadius: '10px', background: '#fff' }}
      >
        {/* Show landing page if showQuestions is false */}
        {!showQuestions && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              style={{
                color: '#333',
                marginBottom: '20px',
                fontFamily: 'Poppins',
                flex: '0',
                fontWeight: '600',
              }}
            >
              Welcome to Skills Assessment
            </Typography>
            <div
              style={{
                paddingLeft: '20px',
                paddingRight: '20px',
                marginLeft: '50px',
              }}
            >
              <Typography
                variant="body1"
                gutterBottom
                style={{
                  color: '#666',
                  marginBottom: '20px',
                  fontFamily: 'Poppins',
                  paddingLeft: '60px',
                }}
              >
                Discover your strengths and find the perfect job match!
              </Typography>
              <Button
                variant="contained"
                onClick={handleStartAssessment}
                style={{
                  fontFamily: 'Poppins',
                  marginLeft: '60px',
                  backgroundColor: '#14532d',
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Start Assessment'}
              </Button>
            </div>
            <div
              style={{
                position: 'absolute',
                top: '-30%',
                bottom: '3%',
                left: '55%',
                transform: 'translateX(-50%)',
                borderLeft: '1px solid #ccc',
                height: '300px',
              }}
            ></div>
          </div>
        )}

        {showCategorySelect && <AssessmentCategorySelect />}

        {/* Show questions if showQuestions is true */}
        {showQuestions && (
          <Questions handleSubmit={handleSubmit} onSubmit={onSubmit} />
        )}

        {error && (
          <div style={{ textAlign: 'center', color: 'red' }}>
            Error: {error}
          </div>
        )}
      </Paper>
    </Container>
  )
}

export default SkillsAssessment
