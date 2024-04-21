import { AiFillHome, AiOutlineMessage } from 'react-icons/ai'
import { BiBuildings } from 'react-icons/bi'
import { IoCalendar, IoSettingsSharp } from 'react-icons/io5'
import { PiQuestionDuotone } from 'react-icons/pi'
import { TbNotes } from 'react-icons/tb'
import { BiSolidReport } from 'react-icons/bi'

import dashboard from '../../../assets/dashboard.svg'
import message from '../../../assets/message.svg'
import profile from '../../../assets/profile.svg'
import application from '../../../assets/application.svg'
import calendar from '../../../assets/calendar.svg'
import report from '../../../assets/report.svg'
import settings from '../../../assets/settings.svg'
import help from '../../../assets/help.svg'

export const COMPANY_DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/CompanyDash',
    icon: (
      <img src={dashboard} alt="Dashboard Icon" className="w-[28px] h-[28px]" />
    ),
  },
  {
    key: 'messages',
    label: 'Messages',
    path: '/cmessages',
    icon: (
      <img src={message} alt="Dashboard Icon" className="w-[28px] h-[28px]" />
    ),
  },
  {
    key: 'profile',
    label: 'Profile',
    path: '/company-profile',
    icon: (
      <img src={profile} alt="Dashboard Icon" className="w-[28px] h-[28px]" />
    ),
  },
  {
    key: 'allApplicants',
    label: 'All Applicants',
    path: '/all-applicants',
    icon: (
      <img
        src={application}
        alt="Dashboard Icon"
        className="w-[28px] h-[28px]"
      />
    ),
  },
  {
    key: 'mySchedule',
    label: 'My Schedule',
    path: '/schedule',
    icon: (
      <img src={calendar} alt="Dashboard Icon" className="w-[28px] h-[28px]" />
    ),
  },
  {
    key: 'reports',
    label: 'Generate Reports',
    path: '/generate-reports',
    icon: (
      <img src={report} alt="Dashboard Icon" className="w-[28px] h-[28px]" />
    ),
  },
]

export const COMPANY_DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'settings',
    label: 'Settings',
    path: '',
    icon: (
      <img src={settings} alt="Dashboard Icon" className="w-[28px] h-[28px]" />
    ),
  },
  {
    key: 'helpCenter',
    label: 'Help Center',
    path: '',
    icon: <img src={help} alt="Dashboard Icon" className="w-[28px] h-[28px]" />,
  },
]
