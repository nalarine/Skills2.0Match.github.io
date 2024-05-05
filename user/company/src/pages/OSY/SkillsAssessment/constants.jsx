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

//Start technical skills questionnaires
export const technicalSkillsQuestionnaires = [
  {
    category: 'Numeracy:',
    image: ' ',
    question: ' 58 + 79 = ',
    choices: [' A. 129 ', ' B. 139 ', ' C. 137 ', ' D. 127 '],
    correctAnswer: 'C. 137',
    points: 1, // Assigning 1 point for each correct answer
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: '6386 + 999 = ',
    choices: [' A. 7387', ' B. 6387 ', ' C. 6385  ', ' D. 7385 '],
    correctAnswer: 'D. 7385',
    points: 1, // Assigning 1 point for each correct answer
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: '76 - 34 = ',
    choices: [' A. 52 ', ' B. 38 ', ' C. 42 ', ' D. 28 '],
    correctAnswer: 'C. 42',
    points: 1, // Assigning 1 point for each correct answer
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: '67 × 2 = ',
    choices: ['A. 134', 'B. 124', 'C. 129', 'D. 144'],
    correctAnswer: 'A. 134',
    points: 1,
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: '437 × 7 = ',
    choices: ['A. 2819', 'B. 3024', 'C. 3059', 'D. 2804'],
    correctAnswer: 'C. 3059',
    points: 1,
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: '280 ÷ 8 = ',
    choices: ['A. 35', 'B. 32', 'C. 45', 'D. 38'],
    correctAnswer: 'A. 35',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Elena worked 38 hours last week and 36 hours this week. How many hours did she work in the two weeks? ',
    choices: ['A. 64', 'B. 74', 'C. 2', 'D. 68'],
    correctAnswer: 'B. 74',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'An electronics store had 182 customers on Thursday, 443 on Friday, and 509 on Saturday. How many customers did the store have in those three days? ',
    choices: ['A. 1,135', 'B. 1,244', 'C. 1,144', 'D. 1,134'],
    correctAnswer: 'D. 1,134',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Suzanna earned ₱65 in tips on Friday. She gave ₱18 of the tips to the busboy. How much did she have left? ',
    choices: ['A. ₱57', 'B. ₱47', 'C. ₱37', 'D. ₱83'],
    correctAnswer: 'B. ₱47',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'The Wilsons’ food budget is ₱90 per week. They have already spent ₱41 this week. How much is left in their food budget for this week? ',
    choices: ['A. ₱41', 'B. ₱59', 'C. ₱49', 'D. ₱51'],
    correctAnswer: 'A. ₱49',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Each box below contains 14 hammers. In total, how many hammers are contained in the boxes? ',
    choices: ['A. 50', 'B. 70', 'C. 19', 'D. 9'],
    correctAnswer: 'B. 70',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Linda found 4 boxes of file folders in the closet. Each box contained 24 file folders. In all, how many file folders were in the boxes? ',
    choices: ['A. 28', 'B. 20', 'C. 86', 'D. 96'],
    correctAnswer: 'D. 96',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: '683 ÷ 8 = ',
    choices: [
      'A. 84 Remainder 11',
      'B. 85 Remainder 3',
      'C. 76 Remainder 6',
      'D. 76 Remainder 7',
    ],
    correctAnswer: 'B. 85 Remainder 3',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: '304 ÷ 23 = ',
    choices: [
      'A. 12 Remainder 18',
      'B. 12 Remainder 6',
      'C. 13 Remainder 5',
      'D. 12 Remainder 28',
    ],
    correctAnswer: 'C. 13 Remainder 5',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: '272 ÷ 64 = ',
    choices: ['A. 4.25', 'B. 3.75', 'C. 4.50', 'D. 4.75'],
    correctAnswer: 'A. 4.25',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: '1/5 + 1/7 = ',
    choices: ['A. 12/35', 'B. 2/12', 'C. 1/35', 'D. 1/6'],
    correctAnswer: 'A. 12/35',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: '1/6 + 1/8 = ',
    choices: ['A. 1/7', 'B. 1/48', 'C. 7/24', 'D. 2/14'],
    correctAnswer: 'C. 7/24',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: 'Reduce 15/21 to its lowest terms. ',
    choices: ['A. 3/21', 'B. 5/7', 'C. 3/7', 'D. 6/21'],
    correctAnswer: 'B. 5/7',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: '16/9 is equal to:',
    choices: ['A. 1 6/9', 'B. 7/9', 'C. 12/3', 'D. 1 7/9'],
    correctAnswer: 'D. 1 7/9',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question: 'Which of the following numbers is the smallest? ',
    choices: ['A. 3/7', 'B. 1/3', 'C. 5/6', 'D. 9/14'],
    correctAnswer: 'B. 1/3',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Kate’s hat cost $23.40, her gloves cost $7.20, and her coat cost $74.95. How much did the three items cost? ',
    choices: ['A. $117.45', 'B. $106.55', 'C. $105.45', 'D. $105.55'],
    correctAnswer: 'D. $105.55',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Ben’s monthly commuting expenses are $109.32 for his train ticket, $16.45 for parking, and $68.00 for the bus. How much are his monthly commuting expenses? ',
    choices: ['A. $125.77', 'B. $173.77', '$193.77', '$293.77'],
    correctAnswer: 'C. $193.77',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'A company budgeted $3,050 to spend on advertising. So far, the company has spent $1,764.25 of the budget. How much money is left in the budget? ',
    choices: ['A. $4,814.25', 'B. $1,385.75', 'C. $1,285.75', 'D. $1,386.75'],
    correctAnswer: 'C. $1,285.75',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'A nursery sells apple trees at $24.95 each. A landscaper bought 8 trees from the nursery. What was the total cost of the trees? ',
    choices: ['A. $199.60', 'B. $169.24', 'C. $19.96', 'D. $16.92'],
    correctAnswer: 'A. $199.60',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'A repaving crew is putting a new surface on 79 kilometers of road. They have completed 28 kilometers. If they repave 3.4 kilometers per day in the next several days, how many more days will it take them to finish? ',
    choices: ['A. 15', 'B. 32.5', 'C. 14.5', 'D. 23'],
    correctAnswer: 'A. 15',
    points: 1,
  }, //
  {
    category: 'Numeracy',
    image: 'https://ibb.co/F4KRb8w',
    question:
      'A 6-foot tall man is standing near a tree on level ground as shown in the picture above. If the man’s shadow is 4 feet long, how many feet tall is the tree? ',
    choices: [' A. 27 ', ' B. 12 ', ' C. 45 ', ' D. 38 '],
    correctAnswer: 'A. 27',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: 'https://ibb.co/GFBvV84',
    question:
      'About how many more jazz records were sold in April than in February? ',
    choices: ['A. 750', ' B. 1,850  ', ' C. 2,950  ', ' D. 950  '],
    correctAnswer: 'A. 750',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: 'https://ibb.co/GFBvV84',
    question:
      'Two percent of the jazz records sold in April were from a new label. About how many records were from the new label? ',
    choices: ['A. 80', 'B. 800', 'C. 40', 'D. 400'],
    correctAnswer: 'C. 40',
    points: 1,
  },
  {
    category: 'Numeracy',
    image: 'https://ibb.co/GFBvV84',
    question:
      'March sales accounted for 1/7 of the total number of jazz records sold all year. About how many jazz records were sold all year? ',
    choices: ['A. 7,400', 'B. 10,500', 'C. 950', 'D. 220'],
    correctAnswer: 'B. 10,500',
    points: 1,
  }, // END OF 1 POINTS
  {
    category: 'Numeracy',
    image: ' ',
    question: 'y - 7 = 8 ',
    choices: [' A. 12 ', ' B. 15 ', ' C. 1', ' D. 10 '],
    correctAnswer: ' B. 15 ',
    points: 2,
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: '2(x - y) = 8 where x = 6 ',
    choices: [' A. 2 ', ' B. 4 ', ' C. 8 ', ' D. 10 '],
    correctAnswer: ' A. 2 ',
    points: 2,
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: '2y(4 - x) = x/2 where x = 2 ',
    choices: [' A. 1/2 ', ' B. 1/4 ', ' C. 4 ', ' D. 1 '],
    correctAnswer: ' B. 1/4 ',
    points: 2,
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question: '(1/3 )y2 + 12 = 5x where x = 3 ',
    choices: [' A. 9 ', ' B. 9 1/9 ', ' C. 3 1/3 ', 'D. 3'],
    correctAnswer: 'D. 3',
    points: 2,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      '. A farmer has 7 3/4 rows of radishes in one field, 4 3/4 rows of radishes in another field, and 6 1/4 rows of radishes in a third field. How many rows of radishes does he have altogether? ',
    choices: ['A. 18 3/4', ' B. 17 7/12 ', ' C. 17 1/2 ', ' D. 17 ¾'],
    correctAnswer: 'A. 18 3/4',
    points: 2,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'The main road in Belleville is 7 3/10 miles long. So far, 2 3/4 miles have been repaved. How many miles have not been repaved?  ',
    choices: ['A. 4 11/20', ' B. 5 11/20 ', ' C. 4 1/6 ', ' D. 5 ⅙'],
    correctAnswer: 'A. 4 11/20',
    points: 2,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Four friends went out for dinner. The bill, including tax, totaled $64.00. If they want to leave a 15% tip and want to share the bill and tip equally, what should each person pay? ',
    choices: [' A. $16.00 ', ' B. $18.40 ', 'C. $18.00', ' D. $73.60 '],
    correctAnswer: ' B. $18.40 ',
    points: 2,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'The Williams family wants to cover one wall in their living room with 1-foot square mirror tiles. The wall measures 8 feet by 10 feet. How many mirror tiles will they need to cover the wall? ',
    choices: [' A.  8 ', ' B. 10 ', ' C. 18 ', ' D. 80 '],
    correctAnswer: ' D. 80 ',
    points: 2,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Kenji has 8 apple trees that each produces about 20 bushels of apples, and 12 apple trees that each produces about 25 bushels. In total, about how many bushels of apples do his trees produce? ',
    choices: [' A. 45 ', ' B. 900 ', ' C. 460 ', ' D. 300'],
    correctAnswer: ' C. 460 ',
    points: 2,
  },
  {
    category: 'Numeracy',
    image: 'https://ibb.co/J3bJ0ZL',
    question:
      'Pete is designing a company logo by dividing a circle into five equal pieshaped sections as shown in the diagram above. How many degrees are in angle A?',
    choices: [' A.  36°  ', ' B. 72°  ', ' C. 50° ', ' D. 100°'],
    correctAnswer: ' B. 72° ',
    points: 2,
  },
  {
    category: 'Numeracy:',
    image: 'https://ibb.co/J3bJ0ZL',
    question:
      'Pete plans to put silver colored ribbon around the circular logo. About how many inches of silver colored ribbon will he need? ',
    choices: [' A. . 360 ', ' B. 20.0 ', ' C. 31.4 ', ' D. 62.8 '],
    correctAnswer: ' D. 62.8 ',
    points: 2,
  },
  {
    category: 'Numeracy:',
    image: 'https://ibb.co/J3bJ0ZL',
    question:
      'If Pete wants to paint the entire circle of his logo blue, how many square inches will he need to cover? ',
    choices: [' A.  31.4 ', ' B. 157 ', ' C. 314 ', ' D. 50 '],
    correctAnswer: ' C. 314 ',
    points: 2,
  },
  {
    category: 'Numeracy:',
    image: ' ',
    question:
      'How many 1 2/3 yard lengths of wire can be cut from 25 yards of wire?  ',
    choices: [' A. 41 2/3 ', ' B. 10 ', ' C. 23 1/3 ', ' D. 15  '],
    correctAnswer: ' D. 15  ',
    points: 2,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Joan received a discount of $4.80 on a book that originally cost $60. What was the percentage of discount she received? ',
    choices: [' A. 55.2% ', ' B. 44.8% ', ' C. 8.0% ', ' D. 80.0%'],
    correctAnswer: ' C. 8.0% ',
    points: 2,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Dr. Warren purchased some medical supplies for $670. Sales tax rate was 6.5%. How much did Dr. Warren spent on these supplies? ',
    choices: [' A.  $43.55  ', ' B. $711.25 ', ' C. $4355.00 ', ' D. $713.55'],
    correctAnswer: ' D. $713.55',
    points: 2,
  },
  {
    category: 'Numeracy',
    image: ' ',
    question:
      'Last year, about 2,400 people participated in a local Fourth of July parade. This year, about 3,200 people participated. What was the approximate percent increase in participation?  ',
    choices: [' A. 25% ', ' B. 50% ', ' C. 75% ', ' D. 33% '],
    correctAnswer: ' D. 33% ',
    points: 2,
  }, //end of numeracy category

  {
    //start of literacy category
    category: 'Literacy:',
    image: ' ',
    question: 'Have you ______ the painting yet? ',
    choices: [' A. hanged ', ' B. hang ', ' C. hanging', ' D. hung '],
    correctAnswer: ' D. hung ',
    points: 1,
  },
  {
    category: 'Literacy:',
    image: ' ',
    question: 'Kay ______ typing at school.',
    choices: [' study ', ' B. studies ', ' C. studying ', ' D. be studying '],
    correctAnswer: ' B. studies ',
    points: 1,
  },
  {
    category: 'Literacy:',
    image: ' ',
    question: 'I ______ the laughter from the conference room.',
    choices: [' A. hear ', ' B. hears ', ' C. hearing ', ' D. is hearing '],
    correctAnswer: ' A. hear ',
    points: 1,
  },
  {
    category: 'Literacy',
    image: ' ',
    question: 'This set of books ______ on that shelf.',
    choices: [' A. goes', ' B. go ', ' C. going ', ' D. gone '],
    correctAnswer: ' A. goes',
    points: 1,
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
    correctAnswer: ' B. in trouble ',
    points: 2,
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
    correctAnswer: ' C. set on fire ',
    points: 2,
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
    correctAnswer: ' A. mistake',
    points: 2,
  },
  {
    category: 'Literacy',
    image: 'https://ibb.co/njgF8BV',
    question: 'The item number for men’s socks is ______.',
    choices: [' A. 541B', ' B. 412R', ' C. 271D', ' D. 768U'],
    correctAnswer: ' C. 271D',
    points: 1,
  },
  {
    category: 'Literacy',
    image: 'https://ibb.co/njgF8BV ',
    question: 'The cost of one boy’s shirt is ______.',
    choices: [' A. $45', ' B. $40', ' C. $120', ' D. $20'],
    correctAnswer: ' D. $20',
    points: 1,
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
    correctAnswer: ' B. item 412R',
    points: 1,
  },
  {
    category: 'Literacy',
    image: 'https://ibb.co/njgF8BV ',
    question: 'The color of the men’s sweater being ordered is ______.',
    choices: [' A. white', ' B. black', ' C. gray', ' D. blue'],
    correctAnswer: ' D. blue',
    points: 1,
  },
  {
    category: 'Literacy',
    image: ' ',
    question: 'Which sentence is most correctly written?',
    choices: [
      ' A. The manager signed the register, before going to their rooms, the guests.',
      ' B. Before the register, the manager asked the rooms to sign the guests.',
      ' C. Sign the room to the manager, the guests before going to their register.',
      ' D. The manager asked the guests to sign the register before going to their rooms.',
    ],
    correctAnswer:
      ' D. The manager asked the guests to sign the register before going to their rooms.',
    points: 1,
  },
  {
    category: 'Literacy',
    image: ' ',
    question: 'Select the sentence that is most correctly written.',
    choices: [
      ' A. The car soon after the robbery speeding down Lark Street was seen.',
      ' B. Down Lark Street the car was seen after the robbery speeding soon.',
      ' C. The car was seen speeding down Lark Street soon after the robbery.',
      ' D. Speeding the car down Lark Street was seen soon after the robbery.',
    ],
    correctAnswer:
      ' A. The car soon after the robbery speeding down Lark Street was seen.',
    points: 1,
  },
  {
    category: 'Literacy',
    image: ' ',
    question: 'Identify the sentence that is most correctly written.',
    choices: [
      ' A. We impose a $10 charge for any check returned to us by the bank.',
      ' B. For any check, we impose the bank by a $10 charge returned to us.',
      ' C. For any bank, we impose by the check a $10 charge returned us.',
      ' D. We impose to us a $10 charge for any returned by the bank check.',
    ],
    correctAnswer:
      ' A. We impose a $10 charge for any check returned to us by the bank.',
    points: 1,
  },
  //digital literacy start
  {
    category: 'DigitalLiteracy',
    image: '', // You can include an image URL here if needed
    question:
      'Tom notices that when he runs several programs simultaneously on his computer, the performance of the programs slows down considerably. What is the reason for this?',
    choices: [
      'A. Nonfunctional keyboard',
      'B. Nonfunctional mouse',
      'C. Insufficient random access memory (RAM)',
      'D. Low monitor speed',
    ],
    correctAnswer: 'C. Insufficient random access memory (RAM)',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question:
      'Arno’s uncle owns a small business with 20 office employees. The computers in his office are connected to a network. Arno often helps his uncle to install new computers on the network, add and remove individuals from the list of authorized users, and archive files on a computer. He likes to perform these activities and wants to make them the focus of his profession. Which of the following job opportunities can Arno consider?',
    choices: [
      'A. Graphics designer',
      'B. Software developer',
      'C. Network administrator',
      'D. Database administrator',
    ],
    correctAnswer: 'C. Network administrator',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question:
      'Your sister travels to another country for an on-site business project. You want to tell her about your new job by sending her an e-mail message from your computer. Which of the following devices will you use to connect your computer to the Internet?',
    choices: ['A. Printer', 'B. Scanner', 'C. Modem', 'D. Sound card'],
    correctAnswer: 'C. Modem',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question:
      'Morten wants to play a game online. He hears modem tones every time his computer sends a request to the Internet service provider (ISP) to establish an Internet connection. What type of Internet connection does Morten use?',
    choices: ['A. Dial-up', 'B. Broadband', 'C. WiFi', 'D. Dedicated'],
    correctAnswer: 'A. Dial-up',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question:
      "You want to know more about active volcanoes in the world. You connect your computer to the Internet to find information based on the keyword 'active volcanoes.' Which of the following features of the World Wide Web (WWW) will you use?",
    choices: [
      'A. Search engine',
      'B. Plug-in',
      'C. Uniform Resource Locator (URL)',
      'D. World Wide Web (www)',
    ],
    correctAnswer: 'A. Search engine',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question:
      "Eric teaches his daughter Tina how to work with productivity programs. Tina notices a small blinking bar that stays in place until Eric clicks the mouse in a new location in the document. Tina wants to know the name of this blinking bar. Which of the following terms will Eric use to answer Tina's question?",
    choices: [
      'A. Mouse pointer',
      'B. Insertion point',
      'C. Scroll bar',
      'D. Status bar',
    ],
    correctAnswer: 'B. Insertion point',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question:
      'Markus creates a document by using Microsoft® Office Word 2010 and saves it with the name Office.docx. Which of the following components of Word 2010 will display the document name?',
    choices: ['A. Menu bar', 'B. Toolbar', 'C. Title bar', 'D. Status bar'],
    correctAnswer: 'C. Title bar',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question:
      'Stephan creates a business presentation by using Microsoft Office PowerPoint® 2010. He saves it with the name Presentation.ppt. Stephan opens the file to make some changes, and he wants to save it with a different name. Which of the following commands on the File menu will Stephan use to save the file with a different name?',
    choices: ['A. Save', 'B. Save As', 'C. Send To', 'D. Page Setup'],
    correctAnswer: 'B. Save As',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question:
      'Nina uses Office Excel 2010 to create a work plan for her team. She wants to print the plan and discuss it with the team members in a meeting. Which of the following menus will Nina use to print the plan?',
    choices: ['A. File', 'B. View', 'C. Format', 'D. Tools'],
    correctAnswer: 'A. File',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question:
      'Barbara wants to create a newsletter. She needs a program that provides several newsletter templates. Which of the following programs will meet her needs?',
    choices: [
      'A. Desktop publishing program',
      'B. Presentation program',
      'C. E-mail program',
      'D. Spreadsheet program',
    ],
    correctAnswer: 'A. Desktop publishing program',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question:
      'Paula manages the recruitments for A. Datum Corporation. The company hires 500 employees. Paula needs to store on her computer the personal details, compensation structure, and insurance details for each employee. Which of the following programs will Paula use?',
    choices: [
      'A. Microsoft® Notepad',
      'B. Photo editing program',
      'C. Presentation program',
      'D. Database program',
    ],
    correctAnswer: 'D. Database program',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question: 'The _____________ shows what files and applications are open.',
    choices: [
      'A. Shortcut Menu',
      'B. Documents Library',
      'C. Taskbar',
      'D. Start Button',
    ],
    correctAnswer: 'C. Taskbar',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question: "When you're connected to the Internet, you are:",
    choices: ['A. Outline', 'B. Offline', 'C. Online', 'D. Out of line'],
    correctAnswer: 'C. Online',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question:
      'Elisabeth reads an article on common computer terminology. She does not understand the meaning of the operating system. She comes to you for help. How will you explain the operating system to Elisabeth?',
    choices: [
      'A. An electronic device connected to your computer.',
      'B. An electronic device connected to your computer.',
      'C. A program that controls and manages the computer.',
      'D. A circuit board that connects the input, output, and processing devices.',
    ],
    correctAnswer: 'C. A program that controls and manages the computer.',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question:
      'You create a presentation by using newer versions of PowerPoint. Which of the following toolbars will you use to add geometric shapes to the presentation?',
    choices: [
      'A. Drawing',
      'B. Formatting',
      'C. Reviewing',
      'D. Illustrations',
    ],
    correctAnswer: 'D. Illustrations',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question:
      'Any computer parts that you can actually touch are considered to be:',
    choices: ['A. Software', 'B. Systems', 'C. Platforms', 'D. Hardware'],
    correctAnswer: 'D. Hardware',
    points: 1,
  },
  {
    category: 'DigitalLiteracy',
    image: '',
    question: '"Desktop" is a computer term that refers to:',
    choices: [
      'A. The initial screen showing icons for folders, files, and applications.',
      'B. The part of your work area where the computer monitor sits.',
      'C. Something that can and should be ignored by most users.',
      'D. The list of all of the contents on a particular computer.',
    ],
    correctAnswer:
      'A. The initial screen showing icons for folders, files, and applications.',
    points: 1,
  },
]
export const softSkillsQuestionnaires = [
  {
    category: 'CommunicationSkills',
    image: ' ',
    question:
      'What is the process of exchanging information and meaning between individuals or groups called?',
    choices: [
      ' A. Communication',
      ' B. Negotiation',
      ' C. Persuasion',
      ' D. Presentation',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question:
      'Which of the following is an example of nonverbal communication?',
    choices: [
      ' A. Speaking',
      ' B. Writing',
      ' C. Using hand gestures',
      ' D. Sending an email',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'What does active listening involve?',
    choices: [
      ' A. Interrupting the speaker',
      ' B. Focusing on your response',
      ' C. Avoiding eye contact',
      ' D. Paying attention and understanding the speaker',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'Which of the following is an example of written communication?',
    choices: [
      ' A. Having a conversation',
      ' B. Sending a text message',
      ' C. Making a phone call',
      ' D. Attending a meeting',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'What is empathy?',
    choices: [
      ' A. Understanding and sharing the feelings of others',
      ' B. Convincing others to agree with your viewpoint',
      ' C. Interrupting others while they are speaking',
      ' D. Ignoring the emotions of others',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'What are interpersonal skills?',
    choices: [
      ' A. Skills used in written communication',
      ' B. Skills used in nonverbal communication',
      ' C. Skills used in one-on-one interactions',
      ' D. Skills used in public speaking',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'What is an essential element of effective public speaking?',
    choices: [
      ' A. Speaking as fast as possible',
      ' B. Using complex vocabulary',
      ' C. Maintaining eye contact with the audience',
      ' D. Avoiding visual aids',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'What does emotional intelligence involve?',
    choices: [
      ' A. Ignoring the emotions of others',
      " B. Recognizing and managing one's own emotions",
      ' C. Focusing solely on logical reasoning',
      ' D. Avoiding personal connections with others',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'What is the purpose of feedback in communication?',
    choices: [
      ' A. To criticize and belittle others',
      ' B. To express personal opinions',
      ' C. To evaluate and improve communication',
      ' D. To dominate the conversation',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'Why is cultural awareness important in communication?',
    choices: [
      " A. To impose one's cultural values on others",
      ' B. To avoid any communication with people from different cultures',
      ' C. To understand and respect cultural differences',
      ' D. To promote misunderstandings and conflicts',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question:
      'Which communication skill involves using appropriate vocabulary and tone?',
    choices: [
      ' A. Verbal communication',
      ' B. Nonverbal communication',
      ' C. Listening skills',
      ' D. Written communication',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question:
      'What is the ability to understand and share the perspective of others called?',
    choices: [
      ' A. Empathy',
      ' B. Assertiveness',
      ' C. Negotiation',
      ' D. Emotional intelligence',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question:
      'Which of the following is an example of a nonverbal communication cue?',
    choices: [
      ' A. Speaking clearly',
      ' B. Using appropriate grammar',
      ' C. Nodding your head in agreement',
      ' D. Writing an email',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'What does it mean to be an active listener?',
    choices: [
      ' A. Focusing on your response',
      ' B. Interrupting the speaker frequently',
      ' C. Asking questions and providing feedback',
      ' D. Avoiding eye contact',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question:
      'Which communication skill involves expressing ideas effectively through writing?',
    choices: [
      ' A. Verbal communication',
      ' B. Nonverbal communication',
      ' C. Listening skills',
      ' D. Written communication',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question:
      'What is the ability to deliver information or ideas to an audience in a clear and engaging manner called?',
    choices: [
      ' A. Negotiation',
      ' B. Presentation skills',
      ' C. Interpersonal skills',
      ' D. Empathy',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'What does emotional intelligence help in establishing?',
    choices: [
      ' A. Rapport and trust',
      ' B. Conflict and misunderstandings',
      ' C. Authoritative dominance',
      ' D. Personal biases and opinions',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'What is the purpose of providing constructive feedback?',
    choices: [
      ' A. To criticize and blame others',
      ' B. To control and dominate the conversation',
      ' C. To improve performance and communication',
      ' D. To avoid any form of feedback',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question:
      'Which communication skill involves understanding and respecting cultural differences?',
    choices: [
      ' A. Verbal communication',
      ' B. Nonverbal communication',
      ' C. Cultural awareness',
      ' D. Written communication',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question:
      'Which communication skill involves using body language and facial expressions?',
    choices: [
      ' A. Verbal communication',
      ' B. Nonverbal communication',
      ' C. Listening skills',
      ' D. Written communication',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question:
      'What is the ability to interact effectively with others in various settings called?',
    choices: [
      ' A. Verbal communication',
      ' B. Nonverbal communication',
      ' C. Interpersonal skills',
      ' D. Presentation skills',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question:
      'Which communication skill involves delivering information to a large audience?',
    choices: [
      ' A. Negotiation',
      ' B. Public speaking',
      ' C. Emotional intelligence',
      ' D. Empathy',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question:
      "What is the skill of recognizing and managing one's own emotions and the emotions of others called?",
    choices: [
      ' A. Empathy',
      ' B. Emotional intelligence',
      ' C. Active listening',
      ' D. Written communication',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'What is an effective way to provide feedback?',
    choices: [
      ' A. Be vague and general',
      ' B. Focus on personal attacks',
      ' C. Be specific and constructive',
      ' D. Avoid giving any feedback',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'Which of the following is an example of written communication?',
    choices: [
      ' A. Engaging in a conversation',
      ' B. Making a phone call',
      ' C. Writing an email',
      ' D. Using hand gestures',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'What does it mean to be an active listener?',
    choices: [
      ' A. Multitasking while listening',
      ' B. Interrupting the speaker frequently',
      ' C. Paying full attention and understanding the speaker',
      " D. Ignoring the speaker's message",
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question:
      'Which communication skill involves understanding and respecting cultural differences?',
    choices: [
      ' A. Verbal communication',
      ' B. Nonverbal communication',
      ' C. Cultural awareness',
      ' D. Listening skills',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'What is the purpose of feedback in communication?',
    choices: [
      ' A. To criticize and blame others',
      ' B. To provide personal opinions',
      ' C. To evaluate and improve communication',
      ' D. To dominate the conversation',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'What does emotional intelligence involve?',
    choices: [
      ' A. Ignoring the emotions of others',
      " B. Recognizing and managing one's own emotions",
      ' C. Focusing solely on logical reasoning',
      ' D. Avoiding personal connections with others',
    ],
  },
  {
    category: 'CommunicationSkills',
    image: ' ',
    question: 'Why is cultural awareness important in communication?',
    choices: [
      " A. To impose one's cultural values on others",
      ' B. To avoid communication with people from different cultures',
      ' C. To understand and respect cultural differences',
      ' D. To promote misunderstandings and conflicts',
    ], //teamwork/self assessment
  },
  {
    category: 'Teamwork:',
    image: ' ',
    question: 'What experiences have you had in a team?',
    choices: [
      'a) None. I’m more of a lone wolf.',
      'b) Some. I’ve played a bit of team sport and have done a few group activities at school.',
      'c) A reasonable amount – e.g. I’ve played some team sport.',
      'd) A good amount. I’ve played a decent amount of team sport and/or have worked with others at the marae, at church or with friends in the community.',
      'e) Lots. I have played team sport; I’ve worked with others to help on the marae or at church; I am also in a kapa haka or other performance group/band; and I’ve had experience working in a team at work.',
      'f) Other.',
    ],
  },
  {
    category: 'Teamwork:',
    image: ' ',
    question: 'How actively involved are you when working in a team?',
    choices: [
      'a) Not applicable – I don’t do teams.',
      'b) I’m pretty shy / whakamā, so I tend to be quiet.',
      'c) I’m the sort of person who is fine to go along with whatever is decided. I don’t need to be involved in making decisions; I’m happy just to cruise.',
      'd) I like to have a say in what’s going on. I also like it when teams work together and share the decision making – so I would push this.',
      'e) I like taking on a leadership role.',
      'f) Other.',
    ],
  },
  {
    category: 'Teamwork:',
    image: ' ',
    question:
      'Being a good team player means pitching in and helping, even if the job that needs finishing first is not your regular job. How good are you at pitching in?',
    choices: [
      'a) I don’t do other people’s work for them. I just focus on doing my own job.',
      'b) I would help if necessary but would worry that I would be told off for being slow at getting my regular work done.',
      'c) I would help a bit to get them started and then go back to my own job.',
      'd) I would give them a hand but would expect they come help me afterwards.',
      'e) I would help them get it done and then start on my job. I would feel confident the boss would appreciate me doing this.',
      'f) Other.',
    ],
  },
  {
    category: 'Teamwork:',
    image: ' ',
    question: 'How flexible are you?',
    choices: [
      'a) I would not be happy about it.',
      'b) I would be nervous about it. I would worry I wouldn’t do it right.',
      'c) I would do it if I had to, but I would mention to the boss that it’s not fair that, when I finally get a cruisy day, I get moved because others are being slack.',
      'd) I would go help but probably wouldn’t be too happy about it.',
      'e) I would be fine about being moved to a different job to help the others catch up with work.',
      'f) Other.',
    ],
  },
  {
    category: 'Teamwork:',
    image: ' ',
    question:
      'Team commitment is important if your team is to trust and respect you. Would you put the team’s needs ahead of your own?',
    choices: [
      'a) I would ring in sick. No regrets.',
      'b) I might ring in sick but would make up a good excuse and hope my workmates would be OK with it.',
      'c) It would depend on how bad I was feeling. No point going to work if you feel disgusting.',
      'd) I would go to work, but I’d let my mates know I’m not feeling the greatest.',
      'e) I would go to work, dig in and get through it.',
      'f) Other.',
    ],
  },
  {
    category: 'Teamwork:',
    image: ' ',
    question:
      'What do you think are the biggest differences between being part of a sport or performance team and being part of a team at work?',
    choices: [
      'a) I don’t know.',
      'b) With sport or performance, you are with your mates and having fun. At work, it’s more stressful.',
      'c) With one, you get to choose who you are with and what you do; with the other, you are told who you will work with and what to do.',
      'd) Teams at work can be made up of different age groups, different cultures, different belief systems. You need to work out how to get on with them and how to work together to get the job done.',
      'e) The biggest difference is working with people you may have little or nothing in common with, building friendly and respectful relationships with them and learning how to work together to do the best job.',
      'f) Other.',
    ],
  },
  {
    category: 'Teamwork:',
    image: ' ',
    question:
      'Team players have positive and friendly attitudes. How would you describe your attitude?',
    choices: [
      'a) I’m told my attitude is bad. I don’t see much that inspires me.',
      'b) My attitude could be better. I lose my motivation easily.',
      'c) My attitude is a bit up and down, depending on my mood.',
      'd) My attitude is pretty good. Mostly I am a happy and friendly sort of person.',
      'e) I have a positive attitude. I bounce back from bad days easily, and I see opportunities everywhere I look.',
      'f) Other.',
    ],
  },
  {
    category: 'Teamwork:',
    image: ' ',
    question:
      'One challenge of teamwork is working through conflict. How confident are you at working through conflict in a positive way?',
    choices: [
      'a) Terrible. I have a bit of a temper.',
      'b) Not confident. I am shy / whakamā and this makes it difficult for me to put my opinion forward.',
      'c) I’m OK at it. Depends on my mood.',
      'd) I am usually OK at it. Depends on my relationship with the other person.',
      'e) I am good at working through conflict. I don’t let other people make me angry, I don’t have a need to always win arguments and I am a good problem solver.',
      'f) Other.',
    ],
  },
  {
    category: 'Teamwork:',
    image: ' ',
    question:
      'Great team players have empathy and courage. If you saw some people on your team bullying another team member, how would you respond?',
    choices: [
      'a) It’s not my business.',
      'b) I would feel sorry for the person being bullied but would not have the courage to say anything.',
      'c) I would feel bad for the person but would have to weight up the risk before deciding to say anything or not.',
      'd) I would feel bad for the person and perhaps mention to the others that they were upsetting the other person.',
      'e) I would absolutely challenge them. I don’t like bullying. I would tell them that if they kept doing it, I would report them.',
      'f) Other.',
    ],
  },
  {
    category: 'Teamwork:',
    image: ' ',
    question:
      'Great team players understand the authority of supervisors and managers and can follow their directions. How easy is it for you to follow instructions?',
    choices: [
      'a) Not at all easy because I don’t like being told what to do.',
      'b) Not easy, but I would like to be better. When the boss speaks to me, I get so nervous that I find it hard to listen.',
      'c) Meh. Depends on what sort of head space I’m in.',
      'd) Easy enough. I’m fine with them being the boss, and I’m fine with getting instructions.',
      'e) Easy! I am relaxed and respectful about the boss being the boss. I am good at following instructions. I like to do things right and this helps.',
      'f) Other.',
    ],
  }, //start of problem solving
  {
    category: 'ProblemSolving',
    image: ' ',
    question:
      'Is it financially wise to apply a high deductible for dental treatment? Argument No, due to the financial threshold, many people with mild complaints will postpone a visit to the dentist until more severe complaints occur. Argument: This causes unnecessary suffering.',
    choices: ['a) Weak argument', 'b) Strong argument'],
  },
  {
    category: 'ProblemSolving',
    image: ' ',
    question:
      'Pablo participates in a chess tournament. Together with 4 friends who also participate in the tournament, he has practiced for more than 5 hours every day in recent months. It has been a very busy period, because Pablo also had his normal obligations for his French studies and his side job at a restaurant. The preparations paid off, because in the end Pablo wins the chess tournament while he had not thought this possible a few months before. Inference: Without the preparations, Pablo would not have won the tournament.',
    choices: [
      'a) Definitely False',
      'b) Probably False',
      'c) Insufficient Data',
      'd) Probably True',
      'e) Definitely True',
    ],
  },
  {
    category: 'ProblemSolving',
    image: ' ',
    question:
      'Football players and hockey players are both athletes, the difference is that football players often sprint, while hockey players almost never do this. Hockey players always wear a helmet, while football players never do. Another difference is that hockey players are often late, while football players are never late. Conclusion: If an athlete is sprinting, chances are it is a footballer.',
    choices: [
      'a) Definitely False',
      'b) Probably False',
      'c) Insufficient Data',
      'd) Probably True',
      'e) Definitely True',
    ],
  },
  {
    category: 'ProblemSolving',
    image: ' ',
    question:
      'The universities of Oxford and Yale asked several hundred scientists in the field of artificial intelligence (AI) to put dates on the various breakthroughs. Not only in the field of art, but also in matters such as writing an essay, translating, operating, driving a car or assembling Lego. Art remains one of the toughest things, but the AI ​​experts expect that by 2060 the machine will rule man in all domains. Statement: Art is one of the hardest fields for computers to beat humans.',
    choices: ['a) Conclusion does not follow', 'b) Conclusion follows'],
  },
  {
    category: 'ProblemSolving',
    image: ' ',
    question: 'There are tools that make the assessment easier.',
    choices: ['a) Assumption not made', 'b) Assumption made'],
  },
  {
    category: 'ProblemSolving',
    image: ' ',
    question:
      'Using a calculator makes the assessment a lot easier. Assumption: There are tools that make the assessment easier',
    choices: ['a) The conclusion does not follow', 'b) The conclusion follows'],
  },
  {
    category: 'ProblemSolving',
    image: ' ',
    question:
      'The number of registered speeding offenses on the highway has risen sharply in recent years. However, the amount of cameras used to track down offenders has also grown significantly and the quality of the cameras has improved, with each camera registering a higher percentage of speeding offenses. Peter has been fined a lot lately and is wondering if he really started to drive faster. He knows nothing about the growth in the number of cameras and the improved quality. Conclusion: It is certain that Peter did not drive faster, but that he received more fines because the chance of getting caught has increased.',
    choices: [
      'a) The conclusion does not follow ',
      'b) The conclusion follows',
    ],
  },
  {
    category: 'ProblemSolving',
    image: ' ',
    question:
      'Should primary schools offer young children the opportunity to learn to code? Argument: Yes, programming is becoming increasingly important in society and it is good if children come into contact with software and its development at an early stage because there is a good chance that they will have a lot to do with it later in life.',
    choices: ['a) Weak argument', 'b) Strong argument'],
  },
  {
    category: 'ProblemSolving',
    image: ' ',
    question:
      'Could traditional companies make more profit if they free up more budget to digitize and have a prominent presence on social media? Argument: Yes, a better online and social presence makes it easier for customers to get in touch with traditional companies directly and they feel more involved with the brands.',
    choices: ['a) Weak argument', 'b) Strong argument'],
  },
  {
    category: 'ProblemSolving',
    image: ' ',
    question:
      'Free delivery of online purchases makes more people buy online. The delivery costs that companies have to pay for their customers are much lower than the extra turnover that is made by companies that do not pass the costs on to customers. Yet more and more companies are charging delivery costs to ensure that fewer parcels are returned unused, because this entails a lot of costs. Conclusion: The extra turnover generated by offering free delivery does not outweigh the extra costs of the many returned parcels.',
    choices: ['a) The conclusion does not follow', 'b) The conclusion follows'],
  },
  {
    category: 'ProblemSolving',
    image: ' ',
    question:
      "In a survey of 750 young adults, job security and work environment were found to be the most important factors in choosing the first job. In a survey of 100 employers, it appeared that employers assume that salary and career opportunities are the most important factors for people who apply for a first job with the employer. Inference: Salary and career advancement are not really important factors in young adults' first job selection.",
    choices: [
      'a) Definitely False',
      'b) Probably False',
      'c) Insufficient Data',
      'd) Probably True',
      'e) Definitely True',
    ],
  },
]
// start of behavioral assessment
export const behavioralAssessment = [
  {
    category: 'Hogan Personality Inventory (HPI)',
    image: ' ',
    question: 'I am a calm and unstressed individual',
    choices: [
      'a) Strongly Disagree',
      'b) Disagree',
      'c) Agree',
      'd) Strongly Agree',
    ],
  },
  {
    category: 'Hogan Personality Inventory (HPI)',
    image: ' ',
    question: 'I regularly stay until the end when at parties',
    choices: [
      'a) Strongly Disagree',
      'b) Disagree',
      'c) Agree',
      'd) Strongly Agree',
    ],
  },
  {
    category: 'Hogan Personality Inventory (HPI)',
    image: ' ',
    question: 'I am more comfortable working with data than with people',
    choices: [
      'a) Strongly Disagree',
      'b) Disagree',
      'c) Agree',
      'd) Strongly Agree',
    ],
  },
  {
    category: 'Hogan Personality Inventory (HPI)',
    image: ' ',
    question: 'I am constantly in heated discussions with others',
    choices: [
      'a) Strongly Disagree',
      'b) Disagree',
      'c) Agree',
      'd) Strongly Agree',
    ],
  },
  {
    category: 'Hogan Personality Inventory (HPI)',
    image: ' ',
    question: 'Solving riddles gives me pleasure',
    choices: [
      'a) Strongly Disagree',
      'b) Disagree',
      'c) Agree',
      'd) Strongly Agree',
    ],
  },
  //start of HDS
  {
    category: 'Hogan Development Survey (HDS)',
    image: ' ',
    question:
      'Most of the time, I do what my manager tells me to, despite my own opinions',
    choices: [
      'a) Strongly Disagree',
      'b) Disagree',
      'c) Agree',
      'd) Strongly Agree',
    ],
  },
  {
    category: 'Hogan Development Survey (HDS)',
    image: ' ',
    question:
      'If I weren’t disrupted so much during my work, I would be more successful at it',
    choices: [
      'a) Strongly Disagree',
      'b) Disagree',
      'c) Agree',
      'd) Strongly Agree',
    ],
  },
  {
    category: 'Hogan Development Survey (HDS)',
    image: ' ',
    question: 'The problems of others usually bother me',
    choices: [
      'a) Strongly Disagree',
      'b) Disagree',
      'c) Agree',
      'd) Strongly Agree',
    ],
  },
  {
    category: 'Hogan Development Survey (HDS)',
    image: ' ',
    question:
      'There is almost always a self-serving reason behind a person doing a service for you',
    choices: [
      'a) Strongly Disagree',
      'b) Disagree',
      'c) Agree',
      'd) Strongly Agree',
    ],
  },
  {
    category: 'Hogan Development Survey (HDS)',
    image: ' ',
    question: "I enjoy having everyone's attention on me",
    choices: [
      'a) Strongly Disagree',
      'b) Disagree',
      'c) Agree',
      'd) Strongly Agree',
    ],
  },
  //start of MVPI
  {
    category: 'Hogan MVPI',
    image: ' ',
    question: 'The humanities are the principle of all culture',
    choices: ['a) Disagree', 'b) Agree', 'c) Uncertain'],
  },
  {
    category: 'Hogan MVPI',
    image: ' ',
    question: 'The universe’s unknowns are concrete and learnable',
    choices: ['a) Disagree', 'b) Agree', 'c) Uncertain'],
  },
  {
    category: 'Hogan MVPI',
    image: ' ',
    question: 'I would like it more if I were to work independently',
    choices: ['a) Disagree', 'b) Agree', 'c) Uncertain'],
  },
  {
    category: 'Hogan MVPI',
    image: ' ',
    question: 'People who prefer to focus on labor over fun are uninteresting',
    choices: ['a) Disagree', 'b) Agree', 'c) Uncertain'],
  },
  {
    category: 'Hogan MVPI',
    image: ' ',
    question: 'It is preferable to be in charge than to be a subordinate',
    choices: ['a) Disagree', 'b) Agree', 'c) Uncertain'],
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
      'Writing Proficiency',
      'Digital Literacy',
    ],
    questions: technicalSkillsQuestionnaires,
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
    questions: softSkillsQuestionnaires,
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
    questions: behavioralAssessment,
  },
]
