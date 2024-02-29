import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Typography } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import {
  COMPANY_DASHBOARD_SIDEBAR_LINKS,
  COMPANY_DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../lib/consts/companynavigation";

const linkClasses =
  "flex items-center gap-2 font-regular px-3 py-2 hover:bg-light-yellow hover:no-underline rounded-sm text-base";

const CompanySidebar = () => {
  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation(); // getting current route

  return (
    <div className="bg-[#C1E1C1] w-72 p-3 flex flex-col">
      <div className="flex items-center gap-2 px-1 py-3">
        <img
          src="../../src/assets/logo.svg"
          alt="LOGO"
          className="h-[60px] w-[60px]"
        />
        <span className="font-bold">Skills2.0Match</span>
      </div>
      <div className="flex-2 py-5 flex flex-col gap-1.5">
        {COMPANY_DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} pathname={pathname} />
        ))}
      </div>
      <div className="flex-1 py-5 flex flex-col gap-1.5 pt-2 border-t border-blue">
        {COMPANY_DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} pathname={pathname} />
        ))}
      </div>
      <div className="flex flex-col gap-6 items-center py-5">
        <div className="flex items-center gap-4">
          <Avatar src={user.profile_pic} alt="avatar" />
          <div>
            <Typography variant="h6">{user?.name}</Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {user?.email}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

function SidebarLink({ item, pathname }) {
  return (
    <Link
      to={item.path}
      className={classNames(
        linkClasses,
        pathname === item.path && "bg-green-500" // Add bg-green-500 class conditionally
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default CompanySidebar;
