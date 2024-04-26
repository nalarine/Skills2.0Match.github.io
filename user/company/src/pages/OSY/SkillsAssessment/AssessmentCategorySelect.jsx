import React, { useState } from 'react'
import {
  Container,
  Paper,
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { skillAssessmentModules } from './constants'
import { isEmpty } from 'lodash'
import Questions from './Questions'

const Item = ({ title, description, sx, onClick, ...other }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        p: 3,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
        height: '250px',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '1.2rem',
        fontWeight: '700',
        transition: 'background-color 0.3s',
        '&:hover': {
          cursor: 'pointer',
          color: 'white',
          bgcolor: 'green',
        },
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        component="ul"
        style={{ pointerEvents: 'none', fontSize: '0.9rem' }}
      >
        {description.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </Typography>
    </Box>
  )
}

const AssessmentCategorySelect = () => {
  const [selectedModule, setSelectedModule] = useState()
  const navigate = useNavigate() // Use useHistory hook to access history object

  const handleCategoryClick = (module) => {
    if (module.title === 'Technical Skills') {
      // history.push('/technicalSkillsQuestionnaires') // Redirect to technicalSkillsQuestionnaires
      // navigate('/technicalSkillsQuestionnaires')
      console.log('module', module)
    } else {
      // Handle other categories as needed
    }
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper
        elevation={3}
        style={{ padding: '20px', borderRadius: '10px', background: '#fff' }}
      >
        {isEmpty(selectedModule) ? (
          <div>
            <Typography
              variant="h4"
              gutterBottom
              style={{
                color: '#333',
                marginBottom: '20px',
                fontFamily: 'Poppins',
                flex: '0',
                fontWeight: '600',
              }}
            >
              Select Assessment Category
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                {!isEmpty(skillAssessmentModules) &&
                  skillAssessmentModules.map((module, index) => (
                    <Grid item xs={6} key={module?.id + index}>
                      <Item
                        title={module?.title}
                        description={module?.description}
                        onClick={() => setSelectedModule(module)}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </div>
        ) : (
          <Questions questions={selectedModule?.questions} />
        )}
      </Paper>
    </Container>
  )
}

export default AssessmentCategorySelect
