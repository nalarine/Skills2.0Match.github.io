function categorizeAssessment(data) {
  const categories = {
    Professionalism: [
      'I address concerns in an appropriate, timely, and professional manner after adequately contemplating available courses of action.',
      'I consistently operate with integrity in my daily activities and stand for the truth without compromise.',
      'I uphold public service ethics and accountability.',
      'I take personal responsibility for the quality and timeliness of work and achieve results with little oversight. I get the job done.',
      'I ensure information is complete, accurate, and managed in a systematic and orderly manner.',
      'I secure confidential information.',
    ],
    Leadership: [
      'I recognize and reward people for doing their best.',
      'I empower others to achieve results and hold them accountable for actions.',
      'I adapt and support changing business needs, conditions, and work responsibilities.',
      'I motivate people in order to reach organizational goals and hold them accountable for actions.',
    ],
    Communication: [
      'I compose clear, direct, concise, and complete messages. (correct vocabulary, spelling grammar)',
      'I display good oral communication skills.',
      'I articulate the vision and mission of the institution to all.',
      'I listen carefully.',
      'I come up with creative ideas, processes and resources that can lead to new and improved programs and systems.',
      'I am able to deliver influential presentations.',
    ],
    Collaboration: [
      'I work well with others and encourage collaboration among fellow employees to achieve common objectives & organizational goals.',
      'I collaborate and network with others across organizational boundaries.',
      'I seek and utilize opportunities for continuous learning and self-development.',
      'I receive constructive criticism and suggestions from others.',
      'I accurately attend to ideas and talents of my staff and team members.',
    ],
    'Customer Focus': [
      'I express loyalty and dedication to QCG in interactions with others.',
      'I seek ways to meet and increase customer satisfaction.',
      'I pursue the best customer-focused responses that add value to the customer QCG service delivery system.',
    ],
    'Analytical Skills': [
      'I select and use appropriate techniques for analysis.',
      'I anticipate unexpected hurdles or obstacles to a plan or project.',
    ],
  }

  return categories
}

function calculateCategoryScores(data, categories) {
  const categoryScores = {}
  for (const category in categories) {
    const items = categories[category]
    const totalScore = items.reduce((sum, item) => {
      if (data[item]) {
        return sum + data[item].index
      } else {
        console.error(`Error: "${item}" is not found in the assessment data.`)
        return sum
      }
    }, 0)
    categoryScores[category] = totalScore / items.length
  }
  return categoryScores
}

function generateCategoryDescriptions(scores) {
  const categoryDescriptions = {
    Professionalism:
      'Demonstrates a high level of professionalism by addressing concerns promptly and professionally, operating with integrity, respecting diversity, and exhibiting strong ethical judgment.',
    Collaboration:
      'Excels in collaboration by working well with others, encouraging teamwork, fostering a trusting environment, and effectively managing conflicts.',
    Communication:
      'Demonstrates exemplary communication skills by composing clear and concise messages, articulating the vision and mission effectively, and communicating strategic goals clearly.',
    'Customer Focus':
      'Displays a strong customer focus, seeking ways to meet and increase customer satisfaction and delivering customer-focused responses that add value.',
    'Innovation and Improvement':
      'Encourages innovation and continuous improvement by supporting new product development, exploring new ideas, promoting a culture of excellence, and generating creative solutions.',
    Leadership:
      "Demonstrates leadership by recognizing and rewarding team members, displaying confidence in others' abilities, leading by example, advocating for professional development, and empowering others.",
    'Responsibility and Accountability':
      'Takes personal responsibility for work quality and timeliness, ensures accuracy and confidentiality of information, and complies with legal and regulatory requirements.',
  }

  const adaptableDescriptions = {}
  let hasHighScores = false

  for (const category in categoryDescriptions) {
    const score = scores[category]
    if (score >= 4) {
      adaptableDescriptions[category] = categoryDescriptions[category]
      hasHighScores = true
    }
  }

  if (!hasHighScores) {
    for (const category in categoryDescriptions) {
      const score = scores[category]
      if (score >= 3 && score < 4) {
        adaptableDescriptions[category] = categoryDescriptions[category]
      }
    }
  }

  return adaptableDescriptions
}

function generateSummary(descriptions) {
  const summaryParts = []
  const sortedCategories = Object.keys(descriptions).sort(
    (a, b) => descriptions[b].score - descriptions[a].score,
  )
  const topCategories = sortedCategories.slice(0, 2)
  topCategories.forEach((category) => {
    summaryParts.push(descriptions[category])
  })
  return `${summaryParts.join(' ')}`
}

export function generateSelfAssessment(assessmentData) {
  //   console.log('Assessment data received:', assessmentData)

  const categories = categorizeAssessment(assessmentData)
  //   console.log('Categories:', categories)

  const categoryScores = calculateCategoryScores(assessmentData, categories)
  //   console.log('Category scores:', categoryScores)

  const descriptions = generateCategoryDescriptions(categoryScores)
  //   console.log('Category descriptions:', descriptions)

  const summary = generateSummary(descriptions)
  //   console.log('Final summary:', summary)

  return summary
}
