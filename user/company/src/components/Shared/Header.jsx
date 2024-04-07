import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Header = ({ newJobDetails }) => {
  const { user } = useSelector((state) => state.user);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const profileUrl = user?.profileUrl || ''; // Initialize profileUrl to empty string if not available

  useEffect(() => {
    // Calculate the number of unread notifications
    const newUnreadNotifications = newJobDetails.filter(job => job.unread).length;
    setUnreadNotifications(newUnreadNotifications);
  }, [newJobDetails]);

  // Function to toggle visibility of notifications popup
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showNotifications) {
      setUnreadNotifications(0); // Reset unread notifications count when closing
    }
  };

  // Function to close notifications popup
  const closeNotifications = () => {
    setShowNotifications(false);
    setUnreadNotifications(0); // Reset unread notifications count when closing
  };

  // Function to generate notification message based on hiring stage
  const getNotificationMessage = (job) => {
    switch (job.hiringStage) {
      case 'Hired':
        return `Congratulations! You are Hired on the job ${job.jobRole} at ${job.companyName}`;
      case 'Shortlisted':
        return `You are Shortlisted for the job ${job.jobRole} at ${job.companyName}`;
      case 'Declined':
        return `Unfortunately, your application for the job ${job.jobRole} at ${job.companyName} has been Declined`;
      default:
        return '';
    }
  };

  return (
    <div className="p-3 relative">
      <div className="items-center h-28 px-5 py-5 flex flex-row pt-2 border-b border-blue gap relative">
        <div className="flex-1 flex flex-row gap-3">
          <div>
            <img src={profileUrl} height={'72px'} width={'72px'} alt="Profile" />
          </div>
          <div className="flex-1 flex flex-col py-2">
            <span className="font-normal text-gray">Applicant</span>
            <span className="font-bold text-lg">{user?.firstName}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 relative" onClick={toggleNotifications}>
          <IoIosNotificationsOutline fontSize={36} />
          {unreadNotifications > 0 && (
            <div className="bg-red-500 rounded-full h-5 w-5 flex justify-center items-center text-white text-xs absolute top-2 right-3">
              {unreadNotifications}
            </div>
          )}
          {!unreadNotifications && ( // Display 0 when there are no unread notifications
            <div className="bg-red-500 rounded-full h-5 w-5 flex justify-center items-center text-white text-xs absolute top-2 right-3">
              0
            </div>
          )}
        </div>
        <Link to="/find-jobs">
          <button className="bg-green-700 border border-dark-yellow text-white font-bold py-2 px-4 rounded">
            Apply now
          </button>
        </Link>
      </div>
      {showNotifications && (
        <div className="absolute top-20 left-[35%] bg-white p-3 shadow-lg rounded-md z-10">
          <button onClick={closeNotifications} className="absolute top-0 right-0 m-2 text-gray-600">
            Close
          </button>
          <h3 className="text-lg font-semibold mb-2 left-0">Notifications</h3>
          <ul>
            {newJobDetails.map((job, index) => (
              <li key={index} className="mb-2">
                {getNotificationMessage(job)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
