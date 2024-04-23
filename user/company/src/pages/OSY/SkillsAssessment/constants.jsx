import { faker } from '@faker-js/faker'

export const questions = [
  {
    category: 'communication',
    question:
      'How would you handle a situation where there is a miscommunication with a team member?',
    choices: [
      ' A. Schedule a meeting to discuss and clarify the communication.',
      ' B. Send a detailed email to all involved parties explaining the situation.',
      ' C. Pick up the phone and directly communicate to resolve the issue.',
    ],
  },
  {
    category: 'communication',
    question:
      'In a professional setting, how do you tailor your communication style when interacting with different stakeholders (e.g., team members, managers, clients)?',
    choices: [
      ' A. Use the same communication style with everyone.',
      ' B. Adapt communication style based on the audience to ensure understanding.',
      ' C. Only communicate through written channels.',
    ],
  },
  {
    category: 'problem-solving',
    question:
      'Describe a challenging problem you faced at a previous job and how you approached solving it.',
    choices: [
      ' A. Ignored the problem, hoping it would resolve itself.',
      ' B. Collaborated with colleagues to brainstorm and implement a solution',
      ' C. Took immediate action without consulting others.',
    ],
  },
  {
    category: 'problem-solving',
    question: 'How do you prioritize tasks when faced with multiple deadlines?',
    choices: [
      ' A. Tackle tasks randomly as they come in.',
      ' B. Prioritize based on urgency and importance.',
      ' C. Focus only on tasks that are personally interesting.',
    ],
  },
  {
    category: 'technical-proficiency',
    question: 'What programming languages or tools are you proficient in?',
    choices: [
      ' A. None.',
      ' B. Proficient in one or two specific languages/tools.',
      ' C. Proficient in multiple languages/tools with examples of projects.',
    ],
  },
  {
    category: 'technical-proficiency',
    question:
      'How do you stay updated on industry trends and new technologies relevant to your field?',
    choices: [
      " A. I don't follow industry trends.",
      ' B. Occasionally read articles or blogs.',
      ' C. Regularly attend conferences, webinars, and actively engage in the community.',
    ],
  },
  {
    category: 'teamwork',
    question:
      "Describe a successful team project you were part of. What was your role, and how did you contribute to the team's success?",
    choices: [
      ' A. Never worked in a team project.',
      " B. Had a minor role and didn't contribute significantly.",
      " C. Played a key role, collaborating and contributing to the team's success.",
    ],
  },
  {
    category: 'teamwork',
    question: 'How do you handle conflicts within a team?',
    choices: [
      ' A. Avoid conflicts and hope they resolve on their own.',
      ' B. Confront conflicts directly and seek resolution.',
      ' C. Escalate conflicts to higher management immediately.',
    ],
  },
  {
    category: 'timeManagement',
    question:
      'How do you organize your tasks and manage your time to meet deadlines?',
    choices: [
      ' A. Work on tasks as they come in without a plan.',
      ' B. Use a to-do list or project management tool to prioritize tasks.',
      ' C. Rely solely on memory to keep track of tasks.',
    ],
  },
  {
    category: 'timeManagement',
    question:
      'Have you ever missed a deadline, and if so, how did you handle the situation.',
    choices: [
      ' A. Never missed a deadline.',
      ' B. Missed a deadline but communicated proactively and worked to resolve it.',
      ' C. Missed a deadline without communication or attempting to resolve the issue.',
    ],
  },
]

export const skillAssessmentModules = [
  {
    id: faker.string.uuid(),
    title: 'Technical Skills Assessment',
    description: '',
    questions,
  },
  {
    id: faker.string.uuid(),
    title: 'Soft Skills Assessment',
    description: '',
    questions,
  },
  {
    id: faker.string.uuid(),
    title: 'Behavioral Assessment',
    description: '',
    questions,
  },
  {
    id: faker.string.uuid(),
    title: 'Scenario-Based Questions / Job Readiness',
    description: '',
    questions,
  },
]
