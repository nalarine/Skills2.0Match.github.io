import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { technicalSkillsQuestionnaires } from './constants'
import { useNavigate } from 'react-router-dom' // Import useNavigate hook

const Questions = ({ questions = technicalSkillsQuestionnaires }) => {
  const navigate = useNavigate() // Initialize useNavigate
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1)
  }

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1)
  }

  const handleAnswerChange = (value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestion].category]: value,
    }))
  }

  const onSubmit = () => {
    // Redirect to JobMatchedDashboard after submitting questionnaire
    navigate('/job-matched-dashboard')
  }

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        style={{ color: '#333', marginBottom: '20px', fontFamily: 'Poppins' }}
      >
        Skill Assessment
      </Typography>
      <Card
        variant="outlined"
        style={{ marginBottom: '20px', background: '#fff' }}
      >
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                marginBottom: '20px',
                color: '#333',
                fontFamily: 'Poppins',
              }}
            >
              {questions[currentQuestion].question}
            </Typography>
            <RadioGroup>
              {questions[currentQuestion].choices.map((choice, index) => (
                <FormControlLabel
                  key={index}
                  control={<Radio />}
                  label={choice}
                  value={index}
                  onChange={() => handleAnswerChange(index)}
                  checked={
                    answers[questions[currentQuestion].category] === index
                  }
                  style={{
                    color: '#666',
                    marginBottom: '10px',
                    fontFamily: 'Poppins',
                  }}
                />
              ))}
            </RadioGroup>
          </form>
        </CardContent>
        <CardActions
          style={{
            justifyContent: 'space-between',
            padding: '16px',
            background: '#fff',
          }}
        >
          <div>
            <Button
              variant="contained"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              disabled={currentQuestion === questions.length - 1}
              style={{ marginLeft: '8px' }}
            >
              Next
            </Button>
          </div>
          <Typography
            variant="body2"
            style={{ color: '#666', marginRight: 'auto' }}
          >{`${currentQuestion + 1} / ${questions.length}`}</Typography>
          {currentQuestion === questions.length - 1 && (
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  )
}

export default Questions
