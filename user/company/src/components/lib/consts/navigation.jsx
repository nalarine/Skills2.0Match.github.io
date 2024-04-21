import dashboard from '../../../assets/dashboard.svg'
import message from '../../../assets/message.svg'
import profile from '../../../assets/profile.svg'
import test from '../../../assets/test.svg'
import application from '../../../assets/application.svg'
import calendar from '../../../assets/calendar.svg'
import settings from '../../../assets/settings.svg'
import help from '../../../assets/help.svg'

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/Dashboard',
    icon: (
      <img src={dashboard} alt="Dashboard Icon" className="w-[28px] h-[28px]" />
    ),
  },
  {
    key: 'profile',
    label: 'Profile',
    path: '/user-profile',
    icon: (
      <img src={profile} alt="Dashboard Icon" className="w-[28px] h-[28px]" />
    ),
  },
  {
    key: 'skillsAssessment',
    label: 'Skill Assessment',
    path: '/skills-assessment',
    icon: <img src={test} alt="Dashboard Icon" className="w-[28px] h-[28px]" />,
  },
  {
    key: 'allApplication',
    label: 'All Application',
    path: '/all-application',
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
    path: '/my-schedule',
    icon: (
      <img src={calendar} alt="Dashboard Icon" className="w-[28px] h-[28px]" />
    ),
  },
  {
    key: 'messages',
    label: 'Messages',
    path: '/messages',
    icon: (
      <img src={message} alt="Dashboard Icon" className="w-[28px] h-[28px]" />
    ),
  },
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: (
      <img src={settings} alt="Dashboard Icon" className="w-[28px] h-[28px]" />
    ),
  },
  {
    key: 'helpCenter',
    label: 'Help Center',
    path: '/help-center',
    icon: <img src={help} alt="Dashboard Icon" className="w-[28px] h-[28px]" />,
  },
]
