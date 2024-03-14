import React from "react";
import { useSelector } from "react-redux";
import { DUMMY_DATA_ABOUT } from "../lib/consts/dummy/dummy";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.user);

  const profileUrl = user?.profileUrl || ''; // Initialize profileUrl to empty string if not available

  return (
    <div className="p-3">
      <div className="items-center h-28 px-5 py-5 flex flex-row pt-2 border-b border-blue gap">
        <div className="flex-1 flex flex-row gap-3">
        {DUMMY_DATA_ABOUT.map((item, index) => (
            <React.Fragment key={index}>
              <div>
                <img src={profileUrl} height={"72px"} width={"72px"} />
              </div>
              <div className="flex-1 flex flex-col py-2">
                <span className="font-normal text-gray">Applicant</span>
                <span className="font-bold text-lg">{user?.firstName}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-3 p-3">
          <IoIosNotificationsOutline fontSize={36} />
        </div>
        <Link to="/find-jobs">
          <button className="bg-green-700 border border-dark-yellow text-white font-bold py-2 px-4 rounded">
            Apply now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
