import React, { useMemo } from 'react'
import { CircularProgress } from '@mui/material'

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  // Calculate progress percentage
  const progress = useMemo(() => {
    return Math.round((currentQuestion / totalQuestions) * 100)
  }, [currentQuestion, totalQuestions])

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <CircularProgress variant="determinate" value={progress} />
    </div>
  )
}

export default ProgressBar
