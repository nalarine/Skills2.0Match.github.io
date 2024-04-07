import * as React from 'react'
import { Accordion, AccordionItem } from '@nextui-org/accordion'

import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star'

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

  return (
    <div className="accordion-container">
      <style>
        {`
					.accordion-container {
						width: 90%; /* Adjust the width as needed */
						margin: auto; /* Center the accordion */
						display: flex; /* Use flexbox for layout */
						flex-direction: column; /* Align items vertically */
						align-items: center; /* Center align items */
						gap: 20px; /* Add gap between title and accordion */
						backgroundImage: url('../../assets/questions.png');
            background-size: cover;
            background-position: center;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
					}
					.title-container {
						text-align: center; /* Center align title */
					}
					.accordion-columns {
						display: flex; /* Use flexbox for accordion columns */
						justify-content: space-between; /* Space out accordion columns */
						width: 100%; /* Occupy full width */
					}
					.accordion-column {
						width: 50%; /* Set width for each accordion column */
					}
					.custom-accordion-item {
						border: 2px solid green; /* Add green border */
						border-radius: 5px; /* Optional: Add border radius */
						padding: 0 14px;
						font-weight: bold;
						font-size: 14px;
					}
					.custom-accordion-header {
						border-bottom: 2px solid green; /* Add bottom border for header */
						border-radius: 5px 5px 0 0; /* Apply border radius only to top */
						cursor: pointer; /* Add cursor pointer for hover effect */
					}
					.custom-accordion-header.active {
						border-bottom: none; /* Remove bottom border when active */
					}
					.custom-accordion-content {
						padding: 15px; /* Add padding for content */
						font-size: 16px; /* Adjust content text size */
					}
					textarea {
            width: 100%;
          }
				`}
      </style>

      <div className="title-container">
        <p className="font-bold text-xl">Frequently Asked Questions</p>
        <h2 className="italic text-lg">You May Ask</h2>
      </div>

      <div className="accordion-columns">
        <div className="accordion-column">
          <Accordion variant="splitted">
            <AccordionItem
              key="1"
              aria-label="What opportunities are available for OSYs on our job portal?"
              title="What opportunities are available for OSYs on your job portal?"
              className={`custom-accordion-item ${
                activeIndex === 1 ? 'active' : ''
              }`}
              onClick={() => handleClick(1)}
            >
              <div className="custom-accordion-header"></div>
              <div className="custom-accordion-content font-normal">
                OSYs can explore various jobs that tailored to their skill levels and interests. 
                We partner with companies and organization offering opportunities suitable for OSYs
                to kickstart their careers.
              </div>
            </AccordionItem>

            <AccordionItem
              key="2"
              aria-label="How does Skills2.0Match work?"
              title="How does Skills2.0Match work?" 
              className={`custom-accordion-item ${
                activeIndex === 2 ? 'active' : ''
              }`}
              onClick={() => handleClick(2)}
              style={{ paddingBottom: '20px' }}
            >
              <div className="custom-accordion-header"></div>
              <div className="custom-accordion-content font-normal">
                Skills2.0Match utilizes automated algorithms to analyze the skills and qualifications of OSY users and match them with job opportunities listed on our platform. Users can create a profile, input their skills and preferences, and receive personalized job recommendations.
              </div>
            </AccordionItem>

            <AccordionItem
              key="3"
              aria-label="What kind of job opportunities can I find on Skills2.0Match?"
              title="What kind of job opportunities can I find on Skills2.0Match?"
              className={`custom-accordion-item ${
                activeIndex === 3 ? 'active' : ''
              }`}
              onClick={() => handleClick(3)}
            >
              <div className="custom-accordion-header"></div>
              <div className="custom-accordion-content font-normal">
                Skills2.0Match features a wide range of job opportunities across various industries, and categories.
              </div>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="accordion-column">
          <Accordion variant="splitted">
            <AccordionItem
              key="4"
              aria-label="Can employers post job opportunities on Skills2.0Match?"
              title="Can employers post job opportunities on Skills2.0Match?"
              className={`custom-accordion-item ${
                activeIndex === 4 ? 'active' : ''
              }`}
              onClick={() => handleClick(4)}
            >
              <div className="custom-accordion-header"></div>
              <div className="custom-accordion-content font-normal">
                Yes, employers can post job opportunities on Skills2.0Match to reach a diverse pool of talented OSY users. If you're an employer interested in posting a job listing, please contact us for more information on our employer services.
              </div>
            </AccordionItem>

            <AccordionItem
              key="5"
              aria-label="How can I update my profile on Skills2.0Match?"
              title="How can I update my profile on Skills2.0Match?"
              className={`custom-accordion-item ${
                activeIndex === 5 ? 'active' : ''
              }`}
              onClick={() => handleClick(5)}
              style={{ paddingBottom: '20px' }}
            >
              <div className="custom-accordion-header"></div>
              <div className="custom-accordion-content font-normal">
                You can update your profile information, including your skills, qualifications, and preferences, at any time by logging into your Skills2.0Match account and accessing the profile settings. Make sure to keep your profile up to date to receive the best job matches!
              </div>
            </AccordionItem>

            <AccordionItem
              key="6"
              aria-label="How can I contact Skills2.0Match for support?"
              title="How can I contact Skills2.0Match for support?"
              className={`custom-accordion-item ${
                activeIndex === 6 ? 'active' : ''
              }`}
              onClick={() => handleClick(6)}
              style={{ paddingBottom: '20px' }}
            >
              <div className="custom-accordion-header"></div>
              <div className="custom-accordion-content font-normal">
                If you have any questions or need assistance, you can contact our support team by emailing support@skills2match.com or filling out the contact form on our website. We're here to help!
              </div>
            </AccordionItem>
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
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
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
