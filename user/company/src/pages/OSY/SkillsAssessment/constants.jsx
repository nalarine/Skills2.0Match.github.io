import { faker } from '@faker-js/faker'

// export const questions = [
//   {
//     category: 'communication',
//     question:
//       'How would you handle a situation where there is a miscommunication with a team member?',
//     choices: [
//       ' A. Schedule a meeting to discuss and clarify the communication.',
//       ' B. Send a detailed email to all involved parties explaining the situation.',
//       ' C. Pick up the phone and directly communicate to resolve the issue.',
//     ],
//   },
//   {
//     category: 'communication',
//     question:
//       'In a professional setting, how do you tailor your communication style when interacting with different stakeholders (e.g., team members, managers, clients)?',
//     choices: [
//       ' A. Use the same communication style with everyone.',
//       ' B. Adapt communication style based on the audience to ensure understanding.',
//       ' C. Only communicate through written channels.',
//     ],
//   },
//   {
//     category: 'problem-solving',
//     question:
//       'Describe a challenging problem you faced at a previous job and how you approached solving it.',
//     choices: [
//       ' A. Ignored the problem, hoping it would resolve itself.',
//       ' B. Collaborated with colleagues to brainstorm and implement a solution',
//       ' C. Took immediate action without consulting others.',
//     ],
//   },
//   {
//     category: 'problem-solving',
//     question: 'How do you prioritize tasks when faced with multiple deadlines?',
//     choices: [
//       ' A. Tackle tasks randomly as they come in.',
//       ' B. Prioritize based on urgency and importance.',
//       ' C. Focus only on tasks that are personally interesting.',
//     ],
//   },
//   {
//     category: 'technical-proficiency',
//     question: 'What programming languages or tools are you proficient in?',
//     choices: [
//       ' A. None.',
//       ' B. Proficient in one or two specific languages/tools.',
//       ' C. Proficient in multiple languages/tools with examples of projects.',
//     ],
//   },
//   {
//     category: 'technical-proficiency',
//     question:
//       'How do you stay updated on industry trends and new technologies relevant to your field?',
//     choices: [
//       " A. I don't follow industry trends.",
//       ' B. Occasionally read articles or blogs.',
//       ' C. Regularly attend conferences, webinars, and actively engage in the community.',
//     ],
//   },
//   {
//     category: 'teamwork',
//     question:
//       "Describe a successful team project you were part of. What was your role, and how did you contribute to the team's success?",
//     choices: [
//       ' A. Never worked in a team project.',
//       " B. Had a minor role and didn't contribute significantly.",
//       " C. Played a key role, collaborating and contributing to the team's success.",
//     ],
//   },
//   {
//     category: 'teamwork',
//     question: 'How do you handle conflicts within a team?',
//     choices: [
//       ' A. Avoid conflicts and hope they resolve on their own.',
//       ' B. Confront conflicts directly and seek resolution.',
//       ' C. Escalate conflicts to higher management immediately.',
//     ],
//   },
//   {
//     category: 'timeManagement',
//     question:
//       'How do you organize your tasks and manage your time to meet deadlines?',
//     choices: [
//       ' A. Work on tasks as they come in without a plan.',
//       ' B. Use a to-do list or project management tool to prioritize tasks.',
//       ' C. Rely solely on memory to keep track of tasks.',
//     ],
//   },
//   {
//     category: 'timeManagement',
//     question:
//       'Have you ever missed a deadline, and if so, how did you handle the situation.',
//     choices: [
//       ' A. Never missed a deadline.',
//       ' B. Missed a deadline but communicated proactively and worked to resolve it.',
//       ' C. Missed a deadline without communication or attempting to resolve the issue.',
//     ],
//   },
// ]

//Start
export const technicalSkillsQuestionnaires = [
  {
    category: 'Numeracy:',
    image: ' ',
    question: ' 58 + 79 = ',
    choices: [' A. 129 ', ' B. 139 ', ' C. 137 ', ' D. 127 '],
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: '6386 + 999 = ',
    choices: [' A. 7387', ' B. 6387 ', ' C. 6385  ', ' D. 7385 '],
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: '76 - 34 = ',
    choices: [' A. 52 ', ' B. 38 ', ' C. 42 ', ' D. 28 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: '67 × 2 =',
    choices: [' A. 134', ' B. 124 ', ' C. 129 ', ' D. 144 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: '437 × 7 = ',
    choices: [' A. 2819 ', ' B. 3024 ', ' C. 3059 ', ' D. 2804 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: '280 ÷ 8 = ',
    choices: [' A. 35 ', ' B. 32', ' C. 45 ', ' D. 38 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Elena worked 38 hours last week and 36 hours this week. How many hours did she work in the two weeks? ',
    choices: [' A. 64 ', ' B. 74 ', ' C. 2 ', ' D. 68 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'An electronics store had 182 customers on Thursday, 443 on Friday, and 509 on Saturday. How many customers did the store have in those three days? ',
    choices: [' A. 1,135 ', ' B. 1,244 ', ' C. 1,144 ', ' D. 1,134  '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Suzanna earned ₱65 in tips on Friday. She gave ₱18 of the tips to the busboy. How much did she have left?',
    choices: [' A. ₱57 ', ' B. ₱47 ', ' C. ₱37 ', ' D. ₱83 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'The Wilsons’ food budget is ₱90 per week. They have already spent ₱41 this week. How much is left in their food budget for this week? ',
    choices: [' A. ₱41 ', ' B. ₱59 ', ' C. ₱49 ', ' D. ₱51 '],
  }, //
  {
    category: 'Numeracy:',
    image: ' ',
    question:
      ' Each box below contains 14 hammers. In total, how many hammers are contained in the boxes? ',
    choices: [' A. 50 ', ' B. 70 ', ' C. 19 ', ' D. 9 '],
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question:
      'Linda found 4 boxes of file folders in the closet. Each box contained 24 file folders. In all, how many file folders were in the boxes? ',
    choices: [' A. 28 ', ' B. 20 ', ' C. 86  ', ' D. 96 '],
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: '683 ÷ 8 = ',
    choices: [
      ' A. 84 Remainder 11 ',
      ' B. 85 Remainder 3  ',
      ' C. 76 Remainder 6  ',
      ' D. 76 Remainder 7  ',
    ],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: '304 ÷ 23 = ',
    choices: [
      ' A. 12 Remainder 18 ',
      ' B. 12 Remainder 6',
      ' C. 13 Remainder 5  ',
      ' D. 12 Remainder 28 ',
    ],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: '272 ÷ 64 = ',
    choices: [' A. 4.25 ', ' B. 3.75  ', ' C. 4.50  ', ' D. 4.75'],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: '1/5 + 1/7 = ',
    choices: [' A. 12/35 ', ' B. 2/12 ', ' C. 1/35  ', ' D. 1/6'],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: ' 1/6 + 1/8 = ',
    choices: [' A. 1/7  ', ' B. 1/48  ', ' C. 7/24  ', ' D. 2/14 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: 'Reduce 15/21 to its lowest terms. ',
    choices: [' A. 3/21 ', ' B. 5/7 ', ' C. 3/7 ', ' D. 6/21 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: '16/9 is equal to: ',
    choices: [' A. 1 6/9 ', ' B. 7/9 ', ' C. 12/3  ', ' D. 1 7/9  '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: 'Which of the following numbers is the smallest? ',
    choices: [' A. 3/7  ', ' B. 1/3  ', ' C. 5/6  ', ' D. 9/14 '],
  }, //
  {
    category: 'Numeracy:',
    image: ' ',
    question:
      ' Kate’s hat cost $23.40, her gloves cost $7.20, and her coat cost $74.95. How much did the three items cost? ',
    choices: [' A.  $117.45', ' B.  $106.55  ', ' C. $105.45  ', ' D. $105.55'],
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question:
      'Ben’s monthly commuting expenses are $109.32 for his train ticket, $16.45 for parking, and $68.00 for the bus. How much are his monthly commuting expenses? ',
    choices: [' A. $125.77', ' B. $173.77 ', ' C. $193.77 ', ' D. $293.77 '],
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question:
      'A company budgeted $3,050 to spend on advertising. So far, the company has spent $1,764.25 of the budget. How much money is left in the budget? ',
    choices: [
      ' A. $4,814.25 ',
      ' B. $1,385.75 ',
      ' C. $1,285.75  ',
      ' D. $1,386.75 ',
    ],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'A nursery sells apple trees at $24.95 each. A landscaper bought 8 trees from the nursery. What was the total cost of the trees? ',
    choices: [' A. $199.60 ', ' B. $169.24 ', ' C. $19.96 ', ' D. $16.92 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'A repaving crew is putting a new surface on 79 kilometers of road. They have completed 28 kilometers. If they repave 3.4 kilometers per day in the next several days, how many more days will it take them to finish? ',
    choices: [' A. 15  ', ' B. 32.5  ', ' C. 14.5 ', ' D. 23 '],
  }, //
  {
    category: 'Numeracy',
    image: 'https://ibb.co/F4KRb8w',
    question:
      'A 6-foot tall man is standing near a tree on level ground as shown in the picture above. If the man’s shadow is 4 feet long, how many feet tall is the tree? ',
    choices: [' A. 27 ', ' B. 12 ', ' C. 45 ', ' D. 38 '],
  },
  {
    category: 'Numeracy',
    image: 'https://ibb.co/GFBvV84',
    question:
      'About how many more jazz records were sold in April than in February? ',
    choices: [' A. 750 ', ' B. 1,850  ', ' C. 2,950  ', ' D. 950  '],
  },
  {
    category: 'Numeracy',
    image: 'https://ibb.co/GFBvV84',
    question:
      'Two percent of the jazz records sold in April were from a new label. About how many records were from the new label? ',
    choices: [' A. 80 ', ' B. 800 ', ' C. 40 ', ' D. 400 '],
  },
  {
    category: 'Numeracy',
    image: 'https://ibb.co/GFBvV84',
    question:
      'March sales accounted for 1/7 of the total number of jazz records sold all year. About how many jazz records were sold all year? ',
    choices: [' A. 7,400 ', ' B. 10,500 ', ' C. 950 ', ' D. 220 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: 'y - 7 = 8 ',
    choices: [' A. 12 ', ' B. 15 ', ' C. 1', ' D. 10 '],
  }, //
  {
    category: 'Numeracy:',
    image: ' ',
    question: ' 2(x - y) = 8 where x = 6 ',
    choices: [' A. 2 ', ' B. 4 ', ' C. 8 ', ' D. 10 '],
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: ' 2y(4 - x) = x/2 where x = 2 ',
    choices: [' A. 1/2 ', ' B. 1/4 ', ' C. 4 ', ' D. 1 '],
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: '(1/3 )y2 + 12 = 5x where x = 3 ',
    choices: [' A. 9 ', ' B. 9 1/9 ', ' C. 3 1/3 ', ' D. 3 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      '. A farmer has 7 3/4 rows of radishes in one field, 4 3/4 rows of radishes in another field, and 6 1/4 rows of radishes in a third field. How many rows of radishes does he have altogether? ',
    choices: [' A. 18 3/4 ', ' B. 17 7/12 ', ' C. 17 1/2 ', ' D. 17 ¾'],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'The main road in Belleville is 7 3/10 miles long. So far, 2 3/4 miles have been repaved. How many miles have not been repaved?  ',
    choices: [' A.  4 11/20 ', ' B. 5 11/20 ', ' C. 4 1/6 ', ' D. 5 ⅙'],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Four friends went out for dinner. The bill, including tax, totaled $64.00. If they want to leave a 15% tip and want to share the bill and tip equally, what should each person pay? ',
    choices: [' A. $16.00 ', ' B. $18.40 ', ' C. $18.00 ', ' D. $73.60 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      ' The Williams family wants to cover one wall in their living room with 1-foot square mirror tiles. The wall measures 8 feet by 10 feet. How many mirror tiles will they need to cover the wall? ',
    choices: [' A.  8 ', ' B. 10 ', ' C. 18 ', ' D. 80 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: 'Reduce 15/21 to its lowest terms. ',
    choices: [' A. 3/21 ', ' B. 5/7 ', ' C. 3/7 ', ' D. 6/21 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Kenji has 8 apple trees that each produces about 20 bushels of apples, and 12 apple trees that each produces about 25 bushels. In total, about how many bushels of apples do his trees produce? ',
    choices: [' A. 45 ', ' B. 900 ', ' C. 460 ', ' D. 300'],
  },
  {
    category: 'Numeracy',
    image: 'https://ibb.co/J3bJ0ZL',
    question:
      'Pete is designing a company logo by dividing a circle into five equal pieshaped sections as shown in the diagram above. How many degrees are in angle A?',
    choices: [' A.  36°  ', ' B. 72°  ', ' C. 50° ', ' D. 100°'],
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: ' 2(x - y) = 8 where x = 6 ',
    choices: [' A. 2 ', ' B. 4 ', ' C. 8 ', ' D. 10 '],
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: ' 2y(4 - x) = x/2 where x = 2 ',
    choices: [' A. 1/2 ', ' B. 1/4 ', ' C. 4 ', ' D. 1 '],
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: '(1/3 )y2 + 12 = 5x where x = 3 ',
    choices: [' A. 9 ', ' B. 9 1/9 ', ' C. 3 1/3 ', ' D. 3 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      '. A farmer has 7 3/4 rows of radishes in one field, 4 3/4 rows of radishes in another field, and 6 1/4 rows of radishes in a third field. How many rows of radishes does he have altogether? ',
    choices: [' A. 18 3/4 ', ' B. 17 7/12 ', ' C. 17 1/2 ', ' D. 17 ¾'],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'The main road in Belleville is 7 3/10 miles long. So far, 2 3/4 miles have been repaved. How many miles have not been repaved?  ',
    choices: [' A.  4 11/20 ', ' B. 5 11/20 ', ' C. 4 1/6 ', ' D. 5 ⅙'],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Four friends went out for dinner. The bill, including tax, totaled $64.00. If they want to leave a 15% tip and want to share the bill and tip equally, what should each person pay? ',
    choices: [' A. $16.00 ', ' B. $18.40 ', ' C. $18.00 ', ' D. $73.60 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      ' The Williams family wants to cover one wall in their living room with 1-foot square mirror tiles. The wall measures 8 feet by 10 feet. How many mirror tiles will they need to cover the wall? ',
    choices: [' A.  8 ', ' B. 10 ', ' C. 18 ', ' D. 80 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: 'Reduce 15/21 to its lowest terms. ',
    choices: [' A. 3/21 ', ' B. 5/7 ', ' C. 3/7 ', ' D. 6/21 '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Kenji has 8 apple trees that each produces about 20 bushels of apples, and 12 apple trees that each produces about 25 bushels. In total, about how many bushels of apples do his trees produce? ',
    choices: [' A. 45 ', ' B. 900 ', ' C. 460 ', ' D. 300'],
  },
  {
    category: 'Numeracy',
    image: 'https://ibb.co/J3bJ0ZL',
    question:
      'Pete is designing a company logo by dividing a circle into five equal pieshaped sections as shown in the diagram above. How many degrees are in angle A?',
    choices: [' A.  36°  ', ' B. 72°  ', ' C. 50° ', ' D. 100°'],
  }, //
  {
    category: 'Numeracy:',
    image: 'https://ibb.co/J3bJ0ZL',
    question:
      ' Pete plans to put silver colored ribbon around the circular logo. About how many inches of silver colored ribbon will he need? ',
    choices: [' A. . 360 ', ' B. 20.0 ', ' C. 31.4 ', ' D. 62.8 '],
  },
  {
    category: 'Numeracy:',
    image: 'https://ibb.co/J3bJ0ZL',
    question:
      ' If Pete wants to paint the entire circle of his logo blue, how many square inches will he need to cover? ',
    choices: [' A.  31.4 ', ' B. 157 ', ' C. 314 ', ' D. 50 '],
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question:
      'How many 1 2/3 yard lengths of wire can be cut from 25 yards of wire?  ',
    choices: [' A. 41 2/3 ', ' B. 10 ', ' C. 23 1/3 ', ' D. 15  '],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Joan received a discount of $4.80 on a book that originally cost $60. What was the percentage of discount she received? ',
    choices: [' A. 55.2% ', ' B. 44.8% ', ' C. 8.0% ', ' D. 80.0%'],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Dr. Warren purchased some medical supplies for $670. Sales tax rate was 6.5%. How much did Dr. Warren spent on these supplies? ',
    choices: [' A.  $43.55  ', ' B. $711.25 ', ' C. $4355.00 ', ' D. $713.55'],
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Last year, about 2,400 people participated in a local Fourth of July parade. This year, about 3,200 people participated. What was the approximate percent increase in participation?  ',
    choices: [' A. 25% ', ' B. 50% ', ' C. 75% ', ' D. 33% '],
  }, //end of numeracy category
  {
    //start of literacy category
    category: 'Literacy:',
    image: ' ',
    question: 'Have you ______ the painting yet? ',
    choices: [' A. hanged ', ' B. hang ', ' C. hanging', ' D. hung '],
  },
  {
    category: 'Literacy:',
    image: ' ',
    question: 'Kay ______ typing at school.',
    choices: [' study ', ' B. studies ', ' C. studying ', ' D. be studying '],
  },
  {
    category: 'Literacy:',
    image: ' ',
    question: 'I ______ the laughter from the conference room.',
    choices: [' A. hear ', ' B. hears ', ' C. hearing ', ' D. is hearing '],
  },
  {
    category: 'Literacy',
    image: ' ',
    question: 'This set of books ______ on that shelf.',
    choices: [' A. goes', ' B. go ', ' C. going ', ' D. gone '],
  },
  {
    category: 'Literacy',
    image: ' ',
    question: 'Hysterical means:',
    choices: [
      ' A. out of control ',
      ' B. in trouble ',
      ' C. very loud ',
      ' D. too difficult',
    ],
  },
  {
    category: 'Literacy',
    image: ' ',
    question: 'To ignite is to:',
    choices: [
      ' A. pay no attention ',
      ' B. make fun of',
      ' C. set on fire ',
      ' D. run an engine ',
    ],
  },
  {
    category: 'Literacy',
    image: ' ',
    question: 'An inaccuracy is a: ',
    choices: [
      ' A. mistake',
      ' B. type of medicine ',
      ' C. prison ',
      ' D. chance happening ',
    ],
  },
  {
    category: 'Literacy',
    image: 'https://ibb.co/njgF8BV',
    question: 'The item number for men’s socks is ______.',
    choices: [' A. 541B', ' B. 412R', ' C. 271D', ' D. 768U'],
  },
  {
    category: 'Literacy',
    image: 'https://ibb.co/njgF8BV ',
    question: 'The cost of one boy’s shirt is ______.',
    choices: [' A. $45', ' B. $40', ' C. $120', ' D. $20'],
  },
  {
    category: 'Literacy',
    image: ' https://ibb.co/njgF8BV',
    question: 'The order form does not show a size for ______.',
    choices: [
      ' A. item 541B',
      ' B. item 412R',
      ' C. men’s socks',
      ' D. boys’ shirt',
    ],
  },
  {
    category: 'Literacy',
    image: 'https://ibb.co/njgF8BV ',
    question: 'The color of the men’s sweater being ordered is ______.',
    choices: [' A. white', ' B. black', ' C. gray', ' D. blue'],
  },
  {
    category: 'Literacy',
    image: ' ',
    question:
      'For questions 12, choose the sentence that is most correctly written.',
    choices: [
      ' A. The manager signed the register, before going to their rooms, the guests.',
      ' B. Before the register, the manager asked the rooms to sign the guests.',
      ' C. Sign the room to the manager, the guests before going to their register.',
      ' D. The manager asked the guests to sign the register before going to their rooms.',
    ],
  },
  {
    category: 'Literacy',
    image: ' ',
    question:
      'For questions 13, choose the sentence that is most correctly written.',
    choices: [
      ' A. The car soon after the robbery speeding down Lark Street was seen.',
      ' B. Down Lark Street the car was seen after the robbery speeding soon.',
      ' C. The car was seen speeding down Lark Street soon after the robbery.',
      ' D. Speeding the car down Lark Street was seen soon after the robbery.',
    ],
  },
  {
    category: 'Literacy',
    image: ' ',
    question:
      'For questions 14, choose the sentence that is most correctly written.',
    choices: [
      ' A. We impose a $10 charge for any check returned to us by the bank.',
      ' B. For any check, we impose the bank by a $10 charge returned to us.',
      ' C. For any bank, we impose by the check a $10 charge returned us.',
      ' D. We impose to us a $10 charge for any returned by the bank check.',
    ],
  },
  {
    category: 'Literacy',
    image: ' ',
    question:
      'For questions 15, choose the sentence that is most correctly written.',
    choices: [
      ' A. No longer working here, the telephone number of James is 412-555-0924.',
      ' B. The number 412-555-0924 is James no longer working here’s telephone.',
      ' C. James is no longer working here, the telephone number is 412-555-0924.',
      ' D. No longer working here’s James telephone number is 412-555-0924.',
    ],
  },
]

export const skillAssessmentModules = [
  {
    id: faker.string.uuid(),
    title: 'Technical Skills Assessment',
    description: [
      'Basic Math',
      'Math Problem-solving',
      'Reading Comprehension',
      'Writing Proficiency (grammar, spelling, punctuation)',
      'Digital Literacy',
    ],
    technicalSkillsQuestionnaires,
  },
  {
    id: faker.string.uuid(),
    title: 'Soft Skills Assessment',
    description: [
      'Written and Verbal Communication',
      'Teamwork',
      'Problem-solving',
      'Adaptability Test',
      'Time Management',
    ],
    technicalSkillsQuestionnaires,
  },
  {
    id: faker.string.uuid(),
    title: 'Behavioral Assessment',
    description: [
      'Motivation and Initiative',
      'Work Ethic',
      'Attitude',
      'Leadership Potential',
    ],
    technicalSkillsQuestionnaires,
  },
  {
    id: faker.string.uuid(),
    title: 'Scenario-Based Questions',
    description: ['Situational', 'Decision-making ability', 'Job Readiness'],
    technicalSkillsQuestionnaires,
  },
]
