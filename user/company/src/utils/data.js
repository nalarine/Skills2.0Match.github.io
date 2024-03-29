import {
  WhatsApp,
  Twitter,
  Instagram,
  Spotify,
  Linkedin,
  Youtube,
  Google,
  Facebook,
  CodeWave,
} from '../assets'

export const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Intern']

export const salaryPeriod = ['Day', 'Week', 'Month']

export const experience = [
  { title: 'Under 1 Year', value: '0-1' },
  { title: '1 -2 Year', value: '1-2' },
  { title: '2 -6 Year', value: '2-6' },
  { title: 'Over 6 Years', value: '6' },
]

export const jobCategories = [
  {
    category: 'Retail and Sales',
    subcategories: [
      'Sales Associate',
      'Cashier',
      'Merchandiser',
      'Store Assistant',
    ],
  },
  {
    category: 'Customer Service',
    subcategories: ['Call Center Agent', 'Customer Service Representative'],
  },
  {
    category: 'Food Service and Hospitality',
    subcategories: ['Food Server', 'Kitchen Staff', 'Hotel Attendants'],
  },
  {
    category: 'Construction and Manual Labor',
    subcategories: ['General Laborers', 'Helpers', 'Skilled Trade Assistants'],
  },
  {
    category: 'Domestic Helper',
    subcategories: ['Household Helper', 'Household Cleaner', 'Caregiver'],
  },
  {
    category: 'Informal Sector Jobs',
    subcategories: ['Street Vending', 'Peddling Goods'],
  },
  {
    category: 'manufacturing and Factory Work',
    subcategories: ['Product Line Workers', 'Machine Operators'],
  },
  {
    category: 'Security Guard Services',
    subcategories: ['Seucurity Guard Services'],
  },
  {
    category: 'Domestic Helper',
    subcategories: ['Domestic Helper'],
  },
  {
    category: 'Warehouse Worker',
    subcategories: ['Packeging, Sortingm and Inventory Management'],
  },
  {
    category: 'Childcare Assistant',
    subcategories: ['Childcare Assistant'],
  },
  {
    category: 'Data Entry Clerk',
    subcategories: ['Data Entry Clerk'],
  },
  {
    category: 'Fitness Instructor',
    subcategories: ['Fitness Instructor'],
  },
  {
    category: 'Event Staff',
    subcategories: [
      'Event Setup',
      'Crowd Management',
      'Audio and Visual Support',
    ],
  },
  {
    category: 'Photography Assistant',
    subcategories: ['Photographer', 'Photo Editing', 'Equipment Setup'],
  },
  {
    category: 'Research Assistant',
    subcategories: ['Research Assistant'],
  },
  {
    category: 'Social Service Aid',
    subcategories: ['Outreach', 'Resource Coordinator', 'Client Assistant'],
  },
  {
    category: 'Pet Caretaker',
    subcategories: ['Pet Caretaker'],
  },
  {
    category: 'Event Planning Assistant',
    subcategories: [
      'Venue Scouting',
      'Logistics Coordinator',
      'Vendor Management',
      'Onsite Event Support',
    ],
  },
]

// export const popularSearch = [
//   "Software Engineer",
//   "Developer",
//   "Full-Stack Developer",
//   "Data Scientist",
//   "Remote",
//   "Full-Time",
//   "Sales",
//   "Office Assistant",
// ];

export const jobs = [
  {
    id: '1',
    company: {
      name: 'Microsoft Corporation',
      location: 'Califonia',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: Twitter,
    },
    jobTitle: 'Software Engineer',
    location: 'West US',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: new Date(),
  },
  {
    id: '2',
    company: {
      name: 'Google Corporation',
      location: 'Califonia',
      email: 'support@google.com',
      contact: 'support@google',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: Google,
    },
    jobTitle: 'System Analyst',
    location: 'New York',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: new Date(),
  },
  {
    id: '3',
    company: {
      name: 'LinkedIn Corporation',
      location: 'Germany',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: Linkedin,
    },
    jobTitle: 'Social Meia Manager',
    location: 'India, Mumbai',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: new Date(),
  },
  {
    id: '4',
    company: {
      name: 'Spotify Corporation',
      location: 'Germany',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: Spotify,
    },
    jobTitle: 'CFO',
    location: 'Norway',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: new Date(),
  },
  {
    id: '5',
    company: {
      name: 'Facebook Corporation',
      location: 'Germany',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: Facebook,
    },
    jobTitle: 'CFO',
    location: 'Norway',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: new Date(),
  },
  {
    id: '6',
    company: {
      name: 'WhatsApp Corporation',
      location: 'Germany',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: WhatsApp,
    },
    jobTitle: 'Product Manager',
    location: 'Norway',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: new Date(),
  },
  {
    id: '7',
    company: {
      name: 'Instagram Corporation',
      location: 'Germany',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: Instagram,
    },
    jobTitle: 'Product Manager',
    location: 'Norway',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: new Date(),
  },
  {
    id: '8',
    company: {
      name: 'Youtube Corporation',
      location: 'Germany',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: Youtube,
    },
    jobTitle: 'Product Manager',
    location: 'Norway',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: new Date(),
  },
  {
    id: '9',
    company: {
      name: 'CodeWave Solutions',
      location: 'India',
      email: 'support@microsoft.com',
      contact: 'support@microsoft',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      profileUrl: CodeWave,
    },
    jobTitle: 'Subscribe Please',
    location: 'Norway',
    jobType: 'Full-Time',
    salary: '1200',
    detail: [
      {
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        requirement:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
    applicants: ['1', '2', '3', '4'],
    vacancies: 25,
    createdAt: new Date(),
  },
]

export const footerLinks = [
  {
    id: '01',
    title: 'Company',
    links: ['Home', 'About Us', 'Services', 'Our Team'],
  },
  {
    id: '02',
    title: 'Policy',
    links: ['Policies', 'Contact', 'FAQ'],
  },
  {
    id: '03',
    title: 'Support',
    links: ['Account', 'Support Center', 'Feedback', 'Accessibility'],
  },
]

export const companies = [
  {
    _id: 1,
    name: 'Microsoft Corporation',
    location: 'Califonia',
    email: 'support@microsoft.com',
    contact: 'support@microsoft',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileUrl: Twitter,
    jobPosts: ['1', '2'],
  },
  {
    _id: 2,
    name: 'Google Corporation',
    location: 'Califonia',
    email: 'support@google.com',
    contact: 'support@google',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileUrl: Google,
    jobPosts: ['1', '2'],
  },
  {
    _id: 3,
    name: 'LinkedIn Corporation',
    location: 'Germany',
    email: 'support@microsoft.com',
    contact: 'support@microsoft',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileUrl: Linkedin,
    jobPosts: ['1', '2'],
  },
  {
    _id: 4,
    name: 'Spotify Corporation',
    location: 'Germany',
    email: 'support@microsoft.com',
    contact: 'support@microsoft',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileUrl: Spotify,
    jobPosts: ['1', '2'],
  },
  {
    _id: 5,
    name: 'Facebook Corporation',
    location: 'Germany',
    email: 'support@microsoft.com',
    contact: 'support@microsoft',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileUrl: Facebook,
    jobPosts: ['1', '2'],
  },
  {
    _id: 6,
    name: 'WhatsApp Corporation',
    location: 'Germany',
    email: 'support@microsoft.com',
    contact: 'support@microsoft',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileUrl: WhatsApp,
    jobPosts: ['1', '2'],
  },
  {
    _id: 7,
    name: 'Instagram Corporation',
    location: 'India',
    email: 'support@microsoft.com',
    contact: 'support@microsoft',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileUrl: Instagram,
    jobPosts: ['1', '2'],
  },
  {
    _id: 8,
    name: 'Youtube Corporation',
    location: 'Germany',
    email: 'support@microsoft.com',
    contact: 'support@microsoft',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileUrl: Youtube,
    jobPosts: ['1', '2'],
  },
  {
    _id: 9,
    name: 'CodeWave Solutions',
    location: 'Ghana',
    email: 'support@microsoft.com',
    contact: 'support@microsoft',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileUrl: CodeWave,
    jobPosts: ['1', '2'],
  },
]

export const users = [
  {
    name: 'Google Corporation',
    location: 'Califonia',
    email: 'support@google.com',
    contact: 'support@google',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileUrl: Google,
    jobPosts: ['1', '2'],
    token: 'gjhsdgsjgdjh',
  },
  {
    firstName: 'CodeWaver',
    lastName: 'Solutions',
    email: 'support@code.com',
    contact: 'support@google',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileUrl: CodeWave,
    accountType: 'seeker',
    cvUrl: '',
    token: 'gjhsdgsjgdjh',
  },
]
