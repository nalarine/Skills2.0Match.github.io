import { AiFillHome, AiOutlineMessage } from 'react-icons/ai'
import { BiBuildings } from 'react-icons/bi'
import { IoCalendar, IoSettingsSharp } from 'react-icons/io5'
import { PiQuestionDuotone } from 'react-icons/pi'
import { TbNotes } from 'react-icons/tb'
import { BiSolidReport } from "react-icons/bi";
export const COMPANY_DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/CompanyDash',
    icon: <AiFillHome className="text-[#14532d]" />,
  },
  {
    key: 'messages',
    label: 'Messages',
    path: '/cmessages',
    icon: <AiOutlineMessage className="text-[#14532d]" />,
  },
  {
    key: 'profile',
    label: 'Profile',
    path: '/company-profile',
    icon: <BiBuildings className="text-[#14532d]" />,
  },
  {
    key: 'allApplicants',
    label: 'All Applicants',
    path: '/all-applicants',
    icon: <TbNotes className="text-[#14532d]" />,
  },
  {
    key: 'mySchedule',
    label: 'My Schedule',
    path: '/schedule',
    icon: <IoCalendar className="text-[#14532d]" />,
  },
  {
    key: 'reports',
    label: 'Generate Reports',
    path: '/generate-reports',
    icon: <BiSolidReport className="text-[#14532d]" />,
  },
]

export const COMPANY_DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'settings',
    label: 'Settings',
    path: '',
    icon: <IoSettingsSharp className="text-[#14532d]" />,
  },
  {
    key: 'helpCenter',
    label: 'Help Center',
    path: '',
    icon: <PiQuestionDuotone className="text-[#14532d]" />,
  },
]
