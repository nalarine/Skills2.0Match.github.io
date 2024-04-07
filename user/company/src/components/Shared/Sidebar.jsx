import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Typography } from '@material-tailwind/react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from '../lib/consts/navigation'
import { Logout } from '../../redux/userSlice'
import { AiOutlineLogout } from 'react-icons/ai'

const linkClasses =
  'flex items-center gap-2 font-regular px-3 py-2 hover:bg-light-yellow hover:no-underline rounded-sm text-base'

const Sidebar = () => {
  const { user } = useSelector((state) => state.user)
  const { pathname } = useLocation() // getting current route
  const profileUrl = user?.profileUrl || ''
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(Logout())
  }

  return (
    <div className="bg-[#C1E1C1] w-72 p-3 flex flex-col">
      <div className="flex items-center gap-2 px-1 py-1">
        <img
          src="../../src/assets/logo.svg"
          alt="LOGO"
          className="h-[60px] w-[60px]"
        />
        <span className="font-bold">Skills2.0Match</span>
      </div>
      <div className="flex-2 py-3 flex flex-col gap-1.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} pathname={pathname} />
        ))}
      </div>
      <div className="flex-1 py-5 flex flex-col gap-1.5 pt-2 border-t border-blue">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} pathname={pathname} />
        ))}
      </div>
      <div className="flex flex-col gap-6 items-center">
        <div className="flex items-center gap-4">
          <Avatar src={profileUrl} alt="avatar" />
          <div>
          <Typography variant="h6">{user?.firstName || 'No First Name'}</Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {user?.email}
            </Typography>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="group flex items-center rounded-md text-sm text-gray-900 hover:bg-green-500 hover:text-white p-2"
        >
          <AiOutlineLogout
            className="text-gray-600 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          Log Out
        </button>
      </div>
    </div>
  )
}

function SidebarLink({ item, pathname }) {
  return (
    <Link
      to={item.path}
      className={classNames(
        linkClasses,
        pathname === item.path && 'bg-green-500', // Add bg-green-500 class conditionally
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  )
}

export default Sidebar