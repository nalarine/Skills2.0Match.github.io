import React, { useMemo } from 'react'
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from '@mui/material'

const ProgressBar = ({ categories }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {categories.map((category, index) => (
        <CategoryProgress key={index} category={category} />
      ))}
    </div>
  )
}

const CategoryProgress = ({ category }) => {
  // Calculate progress percentage
  const progress = useMemo(() => {
    return Math.round(
      (category.currentQuestion / category.totalQuestions) * 100,
    )
  }, [category.currentQuestion, category.totalQuestions])

  return (
    <Card
      style={{
        margin: '10px',
        width: '300px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderRadius: '10px',
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            marginBottom: '10px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {category.name}
        </Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <CircularProgress
            variant="determinate"
            value={progress}
            size={60}
            style={{ marginRight: '10px' }}
          />
          <Typography variant="body1">{progress}% Complete</Typography>
        </div>
        <LinearProgress
          variant="determinate"
          value={progress}
          style={{ height: '10px' }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <Typography variant="body2">
            {category.currentQuestion} of {category.totalQuestions} Questions
          </Typography>
          <Typography variant="body2">
            {category.totalQuestions - category.currentQuestion} Remaining
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProgressBar
