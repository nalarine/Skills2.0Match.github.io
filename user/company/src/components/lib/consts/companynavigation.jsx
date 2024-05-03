import React from 'react';

// Import necessary icons and assets
import { AiFillHome, AiOutlineMessage } from 'react-icons/ai';
import { BiBuildings, BiSolidReport } from 'react-icons/bi';
import { IoCalendar, IoSettingsSharp } from 'react-icons/io5';
import { PiQuestionDuotone } from 'react-icons/pi';
import { TbNotes } from 'react-icons/tb';

import dashboard from '../../../assets/dashboard.svg';
import message from '../../../assets/message.svg';
import profile from '../../../assets/profile.svg';
import application from '../../../assets/application.svg';
import calendar from '../../../assets/calendar.svg';
import report from '../../../assets/report.svg';
import settings from '../../../assets/settings.svg';
import help from '../../../assets/help.svg';

// Define the sidebar links
export const COMPANY_DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/CompanyDash',
    icon: <img src={dashboard} alt="Dashboard Icon" className="w-[28px] h-[28px]" />,
  },
  {
    key: 'profile',
    label: 'Profile',
    path: '/company-profile',
    icon: <img src={profile} alt="Profile Icon" className="w-[28px] h-[28px]" />,
  },
  {
    key: 'allApplicants',
    label: 'All Applicants',
    path: '/all-applicants',
    icon: <img src={application} alt="All Applicants Icon" className="w-[28px] h-[28px]" />,
  },
  {
    key: 'mySchedule',
    label: 'My Schedule',
    path: '/schedule',
    icon: <img src={calendar} alt="Schedule Icon" className="w-[28px] h-[28px]" />,
  },
  {
    key: 'reports',
    label: 'Generate Reports',
    path: '/generate-reports',
    icon: <img src={report} alt="Reports Icon" className="w-[28px] h-[28px]" />,
  },
  {
    key: 'messages',
    label: 'Messages',
    path: '/cmessages',
    icon: <img src={message} alt="Messages Icon" className="w-[28px] h-[28px]" />,
  },
];

// Define the bottom sidebar links
export const COMPANY_DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'settings',
    label: 'Settings',
    path: '/CSettings',
    icon: <img src={settings} alt="Settings Icon" className="w-[28px] h-[28px]" />,
  },
  {
    key: 'helpCenter',
    label: 'Help Center',
    path: '/CHelpCenter',
    icon: <img src={help} alt="Help Center Icon" className="w-[28px] h-[28px]" />,
  },
];

// Define the dropdown menu for Generate Reports
export const REPORT_DROPDOWN_ITEMS = [
  { label: 'Report 1', path: '/report-1' },
  { label: 'Report 2', path: '/report-2' },
  { label: 'Report 3', path: '/report-3' },
];
