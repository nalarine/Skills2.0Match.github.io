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
        bgcolor: 'white',
        color: '#333',
        border: '0px solid',
        height: '400px',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 10,
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
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontWeight: 'bold', marginTop: '20px', textAlign: 'center' }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        component="ul"
        style={{
          pointerEvents: 'none',
          fontSize: '0.9rem',
          marginTop: '40px',
          textAlign: 'center',
        }}
      >
        {description.map((desc, index) => (
          <li key={index} style={{ marginTop: '5px', textAlign: 'center' }}>
            {desc}
          </li>
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
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <Paper
        elevation={0}
        style={{ padding: '20px', borderRadius: '10px', background: 'none' }}
      >
        {isEmpty(selectedModule) ? (
          <div>
            <Typography
              variant="h3"
              gutterBottom
              style={{
                color: '#333',
                marginBottom: '50px',
                fontFamily: 'Poppins',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              Select Assessment Category
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                {!isEmpty(skillAssessmentModules) &&
                  skillAssessmentModules.map((module, index) => (
                    <Grid item xs={4} key={module?.id + index}>
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
