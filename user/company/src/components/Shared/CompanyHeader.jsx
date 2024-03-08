import React from 'react';
import { useSelector } from "react-redux";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useSelector((state) => state.user); // Ensure correct property access from state
  // Ensure that profileUrl is fetched from user object
  const profileUrl = user?.profileUrl || ''; // Initialize profileUrl to empty string if not available

  return (
    <div className="p-3">
      <div className="items-center h-28 px-5 py-5 flex flex-row pt-2 border-b border-blue gap">
        <div className="flex-1 flex flex-row gap-3">
          <div>
            {/* Use profileUrl fetched from user object */}
            <img src={profileUrl} height={"72px"} width={"72px"} alt="Profile" />
          </div>
          <div className="flex-1 flex flex-col py-2">
            <span className="font-normal text-gray">Company</span>
            <span className="font-bold text-lg">{user?.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3">
          <IoIosNotificationsOutline fontSize={36} />
        </div>
        <Link to="/find-jobs">
          <button className="bg-green-700 border border-dark-yellow text-white font-bold py-2 px-4 rounded">
            Seek Applicants
          </button>
        </Link>
      </div>
    </div>
  );
};
