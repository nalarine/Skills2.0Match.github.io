import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Typography, Button, FormControlLabel, Radio, RadioGroup, Container, Paper, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { questions } from './constants';
import { Link } from 'react-router-dom';

const candidate = {
  skills: ['cleaning', 'data entry', 'food server', 'cook'],
  experience: 1,
  location: 'NCR Metro Manila Manila',
  desiredSalary: 2000,
};

function calculateJobScore(job, candidate) {
  let score = 0;

  job?.skillsRequired?.forEach((skill) => {
    if (candidate.skills.includes(skill)) {
      score += 1;
    }
  });

  if (job.experience <= candidate.experience) {
    score += 1;
  }

  if (job.location === candidate.location) {
    score += 1;
  }

  if (job.salary >= candidate.desiredSalary) {
    score += 1;
  }

  return score;
}

function findSuitableJobs(candidate, jobs) {
  return jobs
    .map((job) => ({
      ...job,
      score: calculateJobScore(job, candidate),
    }))
    .filter((job) => job.score >= 2)
    .sort((a, b) => b.score - a.score);
}

const SkillsAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false); // State to manage visibility of questions
  const [loading, setLoading] = useState(false); // State to manage loading indicator

  const { register, handleSubmit, formState: { errors } } = useForm();

  const fetchAllJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8800/api-v1/jobs/alljobs');
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (error) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleStartAssessment = () => {
    setShowQuestions(true);
  };

  const handleAnswerChange = (value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestion].category]: value,
    }));
  };

  const onSubmit = () => console.log('on submit');

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', background: '#fff' }}>
        {/* Show landing page if showQuestions is false */}
        {!showQuestions && (
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom style={{ color: '#333', marginBottom: '20px', fontFamily: 'Poppins' }}>
              Welcome to Skills Assessment
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: '#666', marginBottom: '20px', fontFamily: 'Poppins' }}>
              Discover your strengths and find the perfect job match!
            </Typography>
            <Button variant="contained" color="primary" onClick={handleStartAssessment}>
              {loading ? <CircularProgress size={24} /> : 'Start Assessment'}
            </Button>
          </div>
        )}

        {/* Show questions if showQuestions is true */}
        {showQuestions && (
          <div>
            <Typography variant="h4" gutterBottom style={{ color: '#333', marginBottom: '20px', fontFamily: 'Poppins' }}>
              Skill Assessment
            </Typography>
            <Card variant="outlined" style={{ marginBottom: '20px', background: '#fff' }}>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Typography variant="h6" gutterBottom style={{ marginBottom: '20px', color: '#333', fontFamily: 'Poppins' }}>
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
                        checked={answers[questions[currentQuestion].category] === index}
                        style={{ color: '#666', marginBottom: '10px', fontFamily: 'Poppins' }}
                      />
                    ))}
                  </RadioGroup>
                </form>
              </CardContent>
              <CardActions style={{ justifyContent: 'space-between', padding: '16px', background: '#fff' }}>
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
                <Typography variant="body2" style={{ color: '#666', marginRight: 'auto', fontFamily: 'Poppins' }}>{`${currentQuestion + 1} / ${questions.length}`}</Typography>
                {currentQuestion === questions.length - 1 && (
                  <Button variant="contained" onClick={handleSubmit} color="primary">
                    Submit
                  </Button>
                )}
              </CardActions>
            </Card>
          </div>
        )}

        {error && <div style={{ textAlign: 'center', color: 'red', fontFamily: 'Poppins' }}>Error: {error}</div>}
      </Paper>
    </Container>
  );
};

export default SkillsAssessment;
