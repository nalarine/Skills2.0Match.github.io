import React, { useContext, createContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from '../lib/consts/navigation';

import { Logout } from '../../redux/userSlice';
import { AiOutlineLogout } from 'react-icons/ai';

const linkClasses =
  'flex items-center gap-2 font-regular px-3 py-2 hover:bg-light-yellow hover:no-underline rounded-sm text-base';

const SidebarContext = createContext();

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation(); // getting current route
  const profileUrl = user?.profileUrl || '';
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout());
  };
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-[#C1E1C1] border-r shadow-sm">
      <div className="p-4 pb-2 flex justify-between items-center">
      {expanded && (
        <div className="flex items-center gap-2">
          <img
            src="../../src/assets/logo.svg"
            className="w-10 h-10"
            alt="Logo"
          />
          <h1 className="ml-2 font-bold">Skills 2.0 Match</h1>
        </div>
      )}
      <button
        onClick={() => setExpanded((curr) => !curr)}
        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
      >
        {expanded ? <ChevronFirst /> : <ChevronLast />}
      </button>
    </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {/* Render the sidebar links */}
            {DASHBOARD_SIDEBAR_LINKS.map((item) => (
              <SidebarLink key={item.key} item={item} pathname={pathname} />
            ))}
          </ul>
        </SidebarContext.Provider>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {/* Render the sidebar links */}
            {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
              <SidebarLink key={item.key} item={item} pathname={pathname} />
            ))}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src={profileUrl}
            alt="Profile"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user?.firstName || 'No First Name'}</h4>
              <span className="text-xs text-gray-600">{user?.email}</span>
            </div>
            {expanded && (
              <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <AiOutlineLogout size={20} />
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
        pathname === item.path && 'bg-green-500', // Add bg-green-500 class conditionally
      )}
    >
      {!expanded && <span className="text-xl">{item.icon}</span>}
      {expanded && (
        <>
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </>
      )}
    </Link>
  );
}

export default Sidebar;
