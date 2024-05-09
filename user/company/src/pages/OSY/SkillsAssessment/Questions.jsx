import React, { useCallback, useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom'

const Questions = ({ questions = technicalSkillsQuestionnaires }) => {
  const navigate = useNavigate()
  const { handleSubmit } = useForm()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0)

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1)
  }

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1)
  }

  const handleAnswerChange = (value) => {
    const isChecked =
      questions[currentQuestion].correctAnswer.trim() ===
      questions[currentQuestion].choices[value].trim()

    if (!answers.hasOwnProperty(questions[currentQuestion].question)) {
      setTotalQuestionsAnswered((prevTotal) => prevTotal + 1)
      localStorage.setItem('totalQuestionsAnswered', totalQuestionsAnswered + 1)
    }

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestion].question]: {
        index: value,
        correctAnswer: questions[currentQuestion].correctAnswer.trim(),
        choice: questions[currentQuestion].choices[value].trim(),
        point: isChecked ? questions[currentQuestion].points : 0,
      },
    }))
  }

  const onSubmit = useCallback(() => {
    let score = 0
    Object.values(answers).forEach((item) => {
      score += item.point
    })

    localStorage.setItem('answers', JSON.stringify(answers)) // Ensure to stringify before storing in localStorage
    localStorage.setItem('score', score)
    navigate('/skills-assessment/job-matched-dashboard')
  }, [answers, navigate])

  const handleDashboardRedirect = () => {
    navigate('/skills-assessment/job-matched-dashboard')
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
                  value={choice}
                  onChange={() => handleAnswerChange(index)}
                  checked={
                    answers[questions[currentQuestion].question]?.index ===
                    index
                  }
                  style={{
                    color: '#666',
                    marginBottom: '10px',
                    fontFamily: 'Poppins',
                    marginLeft: '30px',
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
          <Button
            variant="outlined"
            onClick={handleDashboardRedirect}
            style={{ marginLeft: 'auto' }}
          >
            Go to Dashboard
          </Button>
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
              style={{ marginLeft: '10px' }}
            >
              Next
            </Button>
          </div>
          {currentQuestion === questions.length - 1 && (
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              style={{ marginLeft: '30px' }}
            >
              Submit
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  )
}

export default Questions
