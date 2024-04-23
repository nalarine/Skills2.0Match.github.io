import React from 'react'
import { Container, Paper, Box, Grid, Typography } from '@mui/material'
import { skillAssessmentModules } from './constants'
import { isEmpty } from 'lodash'

const Item = (props) => {
  const { sx, ...other } = props
  return (
    <Box
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
        ...sx,
      }}
      {...other}
    />
  )
}

const AssessmentCategorySelect = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper
        elevation={3}
        style={{ padding: '20px', borderRadius: '10px', background: '#fff' }}
      >
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
          Select Category
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            {!isEmpty(skillAssessmentModules) &&
              skillAssessmentModules?.map((module, index) => (
                <Grid item xs={6}>
                  <Item key={module?.id + index}>{module?.title}</Item>
                </Grid>
              ))}
          </Grid>
        </Box>
        {/* <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'stretch',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            height: 200,
            borderRadius: 1,
          }}
        >
          {!isEmpty(skillAssessmentModules) &&
            skillAssessmentModules?.map((module, index) => (
              <Item key={module?.id + index}>{module?.title}</Item>
            ))}
        </Box> */}
      </Paper>
    </Container>
  )
}

export default AssessmentCategorySelect
