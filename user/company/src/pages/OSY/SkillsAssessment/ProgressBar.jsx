import React from 'react'
import { CircularProgress } from '@mui/material'

const ProgressBar = () => {
  // Dummy progress value, replace with actual progress state
  const progress = 50 // Example progress value

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
