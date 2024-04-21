import * as React from 'react'
import { Accordion, AccordionItem } from '@nextui-org/accordion'

import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
}

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

export default function JobPortalFAQs() {
  const [activeIndex, setActiveIndex] = React.useState(null)

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const [value, setValue] = React.useState(2)
  const [hover, setHover] = React.useState(-1)
  const [comment, setComment] = React.useState('')
  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false)

  const handleRatingChange = (event, newValue) => {
    setValue(newValue)
    setFeedbackSubmitted(false) // Reset the feedback submission status
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleSubmitFeedback = () => {
    alert(`Feedback submitted!\nRating: ${value}\nComment: ${comment}`)
    setFeedbackSubmitted(true)

    // Reset the input fields
    setValue(2) // Set it to the initial value or any default value
    setComment('')
  }

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? '#14532d'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="accordion-container m-12">
      <style>{`
        .accordion-container1 {
          display: flex;
          justify-content: space-between;
          margin: 15px;
          border-radius: 50px; 
        }`}
      </style>

      <div className="title-container">
        <p className="font-bold text-xl">Frequently Asked Questions</p>
        <h2 className="italic text-lg">You May Ask</h2>
      </div>

      <div class="accordion-container1">
        <div className="mr-4">
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" className="">
              <div className="text-left">What opportunities are available for OSYs on our job portal?</div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                OSYs can explore various entry-level positions, internships, and
                apprenticeships tailored to their skill levels and interests. We
                partner with companies offering opportunities suitable for OSYs
                to kickstart their careers.
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <div>How does Skills2.0Match work?</div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                Skills2.0Match utilizes automated algorithms to analyze the skills and qualifications of OSY users and match them with job opportunities listed on our platform. Users can create a profile, input their skills and preferences, and receive personalized job recommendations.
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <div className="text-left">What kind of job opportunities can I find on Skills2.0Match?</div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                Skills2.0Match features a wide range of job opportunities across various industries, and categories.
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div>
          <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
              <div className="text-left">Can employers post job opportunities on Skills2.0Match?</div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                Yes, employers can post job opportunities on Skills2.0Match to reach a diverse pool of talented OSY users. If you're an employer interested in posting a job listing, please contact us for more information on our employer services.
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
              <div>How can I update my profile on Skills2.0Match?</div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                You can update your profile information, including your skills, qualifications, and preferences, at any time by logging into your Skills2.0Match account and accessing the profile settings. Make sure to keep your profile up to date to receive the best job matches!
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
            <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
              <Typography>How can I contact Skills2.0Match for support?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              If you have any questions or need assistance, you can contact our support team by emailing support@skills2match.com or filling out the contact form on our website. We're here to help!
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      {/* Rating Start ----------------------------------------------------------- */}

      <Box
        sx={{
          border: '2px solid green',
          borderRadius: '30px',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center', // Center the content horizontally
          width: '99%',
        }}
      >
        <div
          style={{
            width: '50%',
            marginRight: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ textAlign: 'center' }}>How was your experience?</h1>
          <p style={{ textAlign: 'center' }}>
            Share your feedback. Let us know about your experience!
          </p>
        </div>
        <div style={{ width: '50%' }}>
          <Box
            sx={{
              borderLeft: '1px solid green',
              paddingLeft: '20px',
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={handleRatingChange}
              onChangeActive={(event, newHover) => {
                setHover(newHover)
              }}
              emptyIcon={
                <StarOutlineRoundedIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              size="large" // Increase the size
            />
            {value !== null && (
              <Box sx={{ mt: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
            <textarea
              placeholder="Add your comment here..."
              value={comment}
              onChange={handleCommentChange}
              rows={4}
              style={{ marginTop: '10px', width: '100%' }}
            />
            <button
              onClick={handleSubmitFeedback}
              style={{
                marginTop: '10px',
                padding: '8px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Submit Feedback
            </button>
            {feedbackSubmitted && (
              <div style={{ marginTop: '10px', color: 'green' }}>
                Feedback submitted successfully!
              </div>
            )}
          </Box>
        </div>
      </Box>
    </div>
  )
}


