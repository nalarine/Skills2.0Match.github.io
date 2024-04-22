import React, { useState } from 'react'
import question from '../../assets/question.svg'

const FAQs = () => {
  const [expanded, setExpanded] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null) // State to track the active category

  const toggleFAQ = (index) => {
    setExpanded(expanded === index ? null : index)
  }

  const handleClickCategory = (category) => {
    setActiveCategory(category) // Set the active category when a TOC link is clicked
  }

  const faqData = [
    {
      category: 'General',
      content: [
        {
          question: ' What is the goal of Skills2.0Match?',
          answer:
            ' We prioritize data security and comply with all relevant data protection regulations. Your personal and professional information is encrypted and securely stored.',
        },
        {
          question: 'How secure is my data on this portal?',
          answer:
            'During your first consultation, we will assess your needs and discuss any concerns you have. This session will help us tailor our services to fit your specific requirements.',
        },
        {
          question: 'Can I access the job portal on my mobile device?',
          answer:
            'Yes, our job portal is mobile-friendly. You can access it from any device, allowing you to search and apply for jobs on the go.',
        },
        {
          question: 'Who can I contact if I have problems using the portal?',
          answer:
            ' If you encounter any issues or have questions, you can contact our support team via the contact information provided on the site. We offer support through email and phone.',
        },
      ],
    },
    {
      category: 'For OSY',
      content: [
        {
          question:
            'What job opportunities are available for OSYs on Skills2.0Match?',
          answer:
            'OSYs can explore various entry-level positions tailored to their skill levels and interests.  We partner with companies offering opportunities suitable for OSYs to kickstart their careers.',
        },
        {
          question: 'How does Skills2.0Match work?',
          answer:
            'Skills2.0Match utilizes automated algorithms to analyze the skills and qualifications of OSY users and match them with job opportunities listed on our platform. Users can create a profile, input their skills and preferences, and receive personalized job recommendations.',
        },
        {
          question:
            'What kind of job opportunities can I find on Skills2.0Match?',
          answer:
            'Skills2.0Match features a wide range of job opportunities across various industries, and categories.',
        },
        {
          question: 'How can I update my profile on Skills2.0Match?',
          answer:
            'You can update your profile information, including your skills, qualifications, and preferences, at any time by logging into your Skills2.0Match account and accessing the profile settings. Make sure to keep your profile up to date to receive the best job matches!',
        },
      ],
    },
    {
      category: 'For Companies',
      content: [
        {
          question: 'How can our company post job openings on this portal?',
          answer:
            'Companies can register on the portal through a simple sign-up process. Once registered, you can post job openings, describe the roles, set requirements, and manage applications through your dashboard.',
        },
        {
          question: 'What type of candidates can we expect from this portal?',
          answer:
            ' Our job portal specifically supports out-of-school youth, which includes a diverse group of candidates with various skills and potential. These individuals may range from having informal job experiences to possessing specific technical skills.',
        },
        {
          question: 'Is there a fee for posting jobs on the portal?',
          answer:
            'Currently, posting jobs on our portal is free. We aim to support companies in finding the right talent while providing job opportunities to out-of-school youth.',
        },
        {
          question:
            'How can we ensure our job listings reach the right candidates?',
          answer:
            'We offer tools to help target your job postings effectively. You can use filters and keywords to specify the skills and qualifications required, ensuring that your job listing reaches suitable candidates',
        },
      ],
    },
  ]

  return (
    <section className="bg-green-100 dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="flex items-center justify-center text-center">
          {/* Flex container for the image and header */}
          <img src={question} alt="Question Icon" className=" w-20 h-20" />
          {/* Image element with margin-right */}
          <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">
            Have any Questions?
          </h1>
        </div>

        <div className="xl:mt-16 lg:flex lg:-mx-12">
          <div className="lg:mx-12">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              Table of Contents
            </h1>
            <div className="mt-4 space-y-4 lg:mt-8">
              {faqData.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleClickCategory(category.category)}
                  className={`block hover:underline ${
                    activeCategory === category.category
                      ? 'text-green-700 font-bold'
                      : 'text-slate-500 dark:text-gray-400'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
            {faqData.map(
              (category, catIndex) =>
                activeCategory === category.category && (
                  <div key={catIndex}>
                    {category.content.map((faq, index) => (
                      <div key={index}>
                        <button
                          onClick={() => toggleFAQ(catIndex + '-' + index)}
                          className="flex items-center focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0 w-6 h-6 text-green-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            {/* Toggle between plus and minus */}
                            {expanded === catIndex + '-' + index ? (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20 12H4"
                              />
                            ) : (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                              />
                            )}
                          </svg>
                          <h1 className="mx-4 text-lg text-gray-700 dark:text-white ">
                            {faq.question}
                          </h1>
                        </button>
                        <div
                          className={
                            expanded === catIndex + '-' + index
                              ? 'flex mt-8 md:mx-10'
                              : 'hidden'
                          }
                        >
                          <span className="border border-green-700"></span>
                          <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300 text-left">
                            {faq.answer}
                          </p>
                        </div>
                        <hr className="my-8 border-gray-200 dark:border-gray-700" />
                      </div>
                    ))}
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQs
