import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { questions } from './constants'

const SkillsAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  console.log('question', currentQuestion)
  console.log('answer:', watch(`answer${currentQuestion}`))

  const [jobs, setJobs] = useState({})
  const [error, setError] = useState(null)

  const fetchAllJobs = async () => {
    try {
      const response = await axios.get(
        // TODO: proxy server
        'http://localhost:8800/api-v1/jobs/alljobs'
      )
      if (response.data.success) {
        setJobs(response.data)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchAllJobs()
  }, [])

  const handleAnswerChange = (value) => {
    console.log(value)
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestion].category]: value,
    }))
  }

  const onSubmit = () => console.log('on submit')

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1)
  }

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1)
  }

  return (
    <div>
      <Card variant="outlined" className="m-10">
        <CardContent>
          <Typography variant="h5" component="div">
            Skill Assessment
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>{questions[currentQuestion].question}</h3>
            {questions[currentQuestion].choices.map((choice, index) => (
              <div key={index}>
                <label>
                  {JSON.stringify(answers[`answer${currentQuestion}`])}
                  <input
                    type="radio"
                    name={`answer${currentQuestion}`}
                    value={index}
                    onChange={() => console.log('on change')}
                    checked={answers[`answer${currentQuestion}`] === index}
                    {...register(`answer${currentQuestion}`)}
                  />
                  {choice}
                </label>
              </div>
            ))}
          </form>
        </CardContent>
        <CardActions>
          <div className="button-container">
            <Button
              variant="contained"
              onClick={handlePreviousQuestion}
              style={{ marginRight: '8px' }}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </Button>
          </div>
          {currentQuestion === questions.length - 1 && (
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </CardActions>
      </Card>

      {error && <div>Error: {error}</div>}
    </div>
  )
}

export default SkillsAssessment
