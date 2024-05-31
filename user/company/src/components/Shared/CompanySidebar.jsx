import React, { useContext, createContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import {
  COMPANY_DASHBOARD_SIDEBAR_LINKS,
  COMPANY_DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from '../lib/consts/companynavigation'

import { Logout } from '../../redux/userSlice';
import { FiLogOut } from 'react-icons/fi';

const linkClasses =
  'relative flex items-center py-2 px-3 my-1 rounded-md cursor-pointer transition-colors group hover:bg-green-700'

const SidebarContext = createContext();

const CompanySidebar = () => {
  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation(); // getting current route
  const profileUrl = user?.profileUrl || '';
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout());
  };
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen" style={{ zIndex: 1000 }}>
      <nav className="h-full flex flex-col bg-[#C1E1C1] border-r shadow-sm transition-all duration-300">
      <div className="p-4 pb-4 flex justify-between items-center">
      {expanded && (
        <div className="flex items-center gap-2">
          <img
            src="../../src/assets/logo.svg"
            className="w-12 h-12"
            alt="Logo"
          />
          <h1 className="ml-2 font-bold">Skills 2.0 Match</h1>
        </div>
      )}
      <button
        onClick={() => setExpanded((curr) => !curr)}
        className="p-1.5 rounded-lg hover:bg-[#14532d] hover:text-[#ffffff]"
      >
        {expanded ? <ChevronFirst /> : <ChevronLast />}
      </button>
    </div>
        <SidebarContext.Provider value={{ expanded }}>
        <ul className="flex-1 px-3 flex flex-col gap-1.5 pt-2 border-t border-green-500">
            {/* Render the sidebar links */}
            {COMPANY_DASHBOARD_SIDEBAR_LINKS.map((item) => (
              <SidebarLink key={item.key} item={item} pathname={pathname} />
            ))}
          </ul>
        </SidebarContext.Provider>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 flex flex-col gap-1.5 pt-2 border-t border-green-500">
            {/* Render the sidebar links */}
            {COMPANY_DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
              <SidebarLink key={item.key} item={item} pathname={pathname} />
            ))}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 ml-2">
          <img
            src={profileUrl}
            alt="Profile"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
            flex justify-between items-center
            overflow-hidden transition-all duration-500 ease-out  ${expanded ? "w-52 ml-3" : "w-0"}
            `}
          >
            <div className="leading-4 ml-4">
              <h4 className="font-semibold">{user?.name || 'No First Name'}</h4>
              <span className="text-xs text-gray-600">{user?.email}</span>
            </div>
            {expanded && (
              <button onClick={handleLogout}    
              className="p-1.5 rounded-lg hover:bg-[#14532d] hover:text-[#ffffff]">
                 <FiLogOut size={20} />
              </button>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}

function SidebarLink({ item, pathname }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link
      to={item.path}
      className={classNames(
        linkClasses,
        expanded && 'hover:bg-green-500 hover:text-white', // Add hover effect only when expanded
      )}
    >
      <div className="flex items-center">
        {item.icon}
        <span
          className={`overflow-hidden truncate ${
            expanded ? 'ml-3 text-sm' : 'ml-1 text-xs' // Adjust font size based on expanded state
          }`} // Adjust marginLeft when expanded
          style={{ width: expanded ? 'auto' : '0' }}
        >
          {item.label}
        </span>
      </div>

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-green-500 text-black-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all duration-500
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          overflow-hidden truncate  // Add overflow-hidden and truncate classes
        `}
        >
          {item.label}
        </div>
      )}
    </Link>
  )
}

export default CompanySidebar;
