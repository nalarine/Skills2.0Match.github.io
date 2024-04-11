import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
<<<<<<< Updated upstream
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import NotificationsPopover from '../../pages/admin2/layouts/dashboard/common/notifications-popover'

const Header = ({ newJobDetails }) => {
  const { user } = useSelector((state) => state.user);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const profileUrl = user?.profileUrl || ''; // Initialize profileUrl to empty string if not available

  // useEffect(() => {
  //   // Calculate the number of unread notifications
  //   const newUnreadNotifications = newJobDetails.filter(job => job.isUnread).length;
  //   setUnreadNotifications(newUnreadNotifications);
  // }, [newJobDetails]);
=======
import { Link } from 'react-router-dom';
// import NotificationsPopover from '../../pages/admin2/layouts/dashboard/common/notifications-popover';
// import AccountPopover from '../../pages/admin2/layouts/dashboard/common/account-popover';

const CompanyHeader = ({ newJobDetails }) => {
  const { user } = useSelector((state) => state.user);
  const [isClicked, setIsClicked] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const handleButtonClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
    // Add any other functionality you want to perform on button click
  };

  // useEffect(() => {
  //   if (newJobDetails) {
  //     // Calculate the number of unread notifications
  //     const newUnreadNotifications = newJobDetails.filter(job => job.isUnread).length;
  //     setUnreadNotifications(newUnreadNotifications);
  //   }
  // }, [newJobDetails]);
  
>>>>>>> Stashed changes

  // // Function to toggle visibility of notifications popup
  // const toggleNotifications = () => {
  //   setShowNotifications(!showNotifications);
<<<<<<< Updated upstream
  //   if (showNotifications) {
  //     setUnreadNotifications(0); // Reset unread notifications count when closing
  //   }
  // };
=======
  //   if (newJobDetails && !showNotifications) {
  //     const newUnreadNotifications = newJobDetails.filter(job => job.isUnread).length;
  //     setUnreadNotifications(newUnreadNotifications);
  //   } else {
  //     setUnreadNotifications(0); // Reset unread notifications count when closing
  //   }
  // };
  
>>>>>>> Stashed changes

  // // Function to close notifications popup
  // const closeNotifications = () => {
  //   setShowNotifications(false);
  //   setUnreadNotifications(0); // Reset unread notifications count when closing
  // };

  return (
    <div className="p-3 relative">
      <div className="items-center h-24 px-5 py-3 flex flex-row pt-2 border-b border-blue gap relative bg-zinc-100">
        <div className="flex-1 flex flex-row gap-3">
<<<<<<< Updated upstream
          <div>
            <img src={profileUrl} height={'65px'} width={'65px'} alt="Profile" />
          </div>
          <div className="flex-1 flex flex-col py-2">
=======
          <div className="flex-2 flex flex-col py-2">
            <span className="font-bold text-xl">{user?.name}</span>
>>>>>>> Stashed changes
            <span className="font-normal text-gray">Company</span>
          </div>
        </div>
<<<<<<< Updated upstream
        {/* <div className="flex items-center gap-3 p-3 relative" onClick={toggleNotifications}>
               <NotificationsPopover newJobDetails={newJobDetails} showNotifications={showNotifications} />
=======
        {/* <div className="flex items-center gap-1 p-1 relative" onClick={toggleNotifications}>
          <NotificationsPopover newJobDetails={newJobDetails} showNotifications={showNotifications} />
        </div> */}
        {/* <div className="flex items-center gap-3 p-3 relative">
          <AccountPopover />
>>>>>>> Stashed changes
        </div> */}
        <Link to="/find-jobs">
          <button
            className={`bg-green-700 hover:bg-green-500 border border-dark-yellow text-white font-bold py-2 px-4 rounded transition-transform ${isClicked ? 'scale-95' : ''}`}
            style={{ borderRadius: '20px / 50%', transitionProperty: 'border-radius' }}
            onClick={handleButtonClick}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => setIsClicked(false)}
            onMouseLeave={() => setIsClicked(false)}
          >
            Seek Applicants
          </button>
        </Link>
      </div>
    </div>
  );
};

<<<<<<< Updated upstream
export default Header;
=======
export default CompanyHeader;
>>>>>>> Stashed changes
