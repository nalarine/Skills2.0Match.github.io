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
import { useNavigate } from 'react-router-dom' // Import useNavigate hook
import { LegendToggleOutlined } from '@mui/icons-material'

const Questions = ({ questions = technicalSkillsQuestionnaires }) => {
  const navigate = useNavigate() // Initialize useNavigate
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
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
    let isChecked =
      questions[currentQuestion].correctAnswer.trim() ===
      questions[currentQuestion].choices[value].trim()

    // Check if the question has already been answered
    if (!answers.hasOwnProperty(questions[currentQuestion].question)) {
      // Increment total questions answered and store in localStorage
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
    // Redirect to JobMatchedDashboard after submitting questionnaire
    // console.log(answers)
    let score = 0

    Object.values(answers).forEach((item) => {
      score += item.point
    })

    // console.log('score', score)
    localStorage.setItem('answers', answers)
    localStorage.setItem('score', score)
    navigate('/skills-assessment/job-matched-dashboard')
  }, [answers])

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
          <Typography
            variant="body2"
            style={{ color: '#666', marginLeft: 'auto' }}
          >{`${currentQuestion + 1} / ${questions.length}`}</Typography>
          <div>
            <Button
              variant="contained"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              style={{ marginLeft: 'auto' }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              disabled={currentQuestion === questions.length - 1}
              style={{ marginLeft: '10px', marginRight: '30px' }}
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
