import React, { useState } from 'react';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { apiRequest } from '../../utils';

export default function Settings() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [email, setEmail] = useState(''); // Define email state
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [showNewPasswordAlert, setShowNewPasswordAlert] = useState(false);
  const [showConfirmPasswordAlert, setShowConfirmPasswordAlert] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showCurrentEmailAlert, setShowCurrentEmailAlert] = useState(false);
  const [showNewEmailAlert, setShowNewEmailAlert] = useState(false);
  const [showConfirmEmailAlert, setShowConfirmEmailAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  
  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const handleDeleteAccount = async () => {
    if (email === '' || password === '') {
      setShowEmailAlert(email === '');
      setShowPasswordAlert(password === '');
      return;
    }

    try {
      console.log('Deleting account...');
      const response = await apiRequest({
        url: '/companies/delete-account-company',
        method: 'DELETE',
        data: { email, password }
      });
      if (response.success) {
        showToast(response.message, 'blue');
        window.location.href = '/user-auth';
      } else {
        showToast(response.message, 'red');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      showToast('Failed to delete account.', 'red');
    }
  };

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    try {
      const response = await apiRequest({
        url: '/companies/change-password-company',
        method: 'PUT',
        data: { currentEmail, newPassword } // Change here to include currentEmail
      });
      if (response.success) {
        showToast(response.message, 'blue');
      } else {
        showToast(response.message, 'red');
      }
    } catch (error) {
      console.error(error);
      showToast('Internal Server Error', 'red');
    }
  };
  
  const handleEmailChange = async (e) => {
    e.preventDefault();
    if (currentEmail === '' || newEmail === '' || confirmNewEmail === '' || newEmail !== confirmNewEmail) {
      if (currentEmail === '') setShowCurrentEmailAlert(true);
      if (newEmail === '') setShowNewEmailAlert(true);
      if (confirmNewEmail === '') setShowConfirmEmailAlert(true);
      return;
    }
    try {
      console.log('Changing email...');
      const response = await apiRequest({
        url: '/companies/change-email-company',
        method: 'PUT',
        data: { currentEmail, newEmail }
      });
      setCurrentEmail('');
      setNewEmail('');
      setConfirmNewEmail('');
      showToast('Email changed successfully.', 'blue');
    } catch (error) {
      console.error('Error changing email:', error);
      showToast('Failed to change email.', 'red');
    }
  };
  
  return (
    <div>
      <div className="font-semibold text-4xl text-left ml-8 text-green-900">Settings</div>
      <div className="mt-2 ml-8 p-4 w-5/6">
        <div className="flex flex-col items-center border border-gray-500 rounded-md pb-4">
          <div className="bg-red-500 text-white px-4 py-2 rounded-t-md w-full flex justify-start">
            <div className="text-lg font-semibold">Delete Account</div>
          </div>
          <div className="mt-4 text-lg text-left ml-4">Account deletion is permanent. You will lose your completed profile and all your skill test results.</div>
          <hr className="border-gray-400 my-4 mx-2 w-full" />
          <div className="flex justify-end mr-4 w-full">
            <button onClick={openDeleteDialog} className="bg-red-500 text-white px-4 py-2 rounded-md w-52 hover:bg-red-400">Delete Account</button>
          </div>
        </div>
      </div>

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md w-[400px]">
            <h1 className="text-2xl font-semibold mb-4">Delete Account</h1>
            <p className="text-lg mb-4">Delete your account and all of your stored information. This cannot be undone.</p>
            <label htmlFor="email" className="block text-sm font-semibold mb-2 ml-1 text-left">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md p-2 w-full mb-2"
              required
            />
            {showEmailAlert && (
              <div className="flex items-center text-red-500 text-sm mb-6 ml-1 text-left">
                <ErrorOutlineRoundedIcon className="mr-1" />
                Email is required
              </div>
            )}
            <label htmlFor="password" className="block text-sm font-semibold mb-2 ml-1 text-left">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md p-2 w-full mb-2"
              required
            />
            {showPasswordAlert && (
              <div className="flex items-center text-red-500 text-sm mb-6 ml-1 text-left">
                <ErrorOutlineRoundedIcon className="mr-1" />
                Password is required
              </div>
            )}
            <div className="flex justify-end">
              <button onClick={handleDeleteAccount} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Delete Account</button>
              <button onClick={closeDeleteDialog} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Change Password */}
      <div className="ml-8 rounded-md p-4 w-5/6">
        <div className="flex flex-col items-center border border-gray-500 rounded-md pb-4">
          <div className="bg-green-500 text-white px-4 py-2 rounded-t-md w-full flex justify-start mb-4">
            <div className="text-lg font-semibold">Change Password</div>
          </div>
          <form onSubmit={handlePasswordChange} className="w-full">
            <div className="mb-4 flex items-center">
              <label htmlFor="email" className="block text-sm font-semibold mb-2 ml-8 text-left w-52">Email</label>
              <input
                type="email"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                placeholder="Enter your Email"
                className="border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md p-2 w-2/3"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <label htmlFor="newPassword" className="block text-sm font-semibold mb-2 ml-8 text-left w-52">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md p-2 w-2/3"
                required
              />
              {showNewPasswordAlert && (
                <div className="flex items-center text-red-500 text-sm ml-1 text-left">
                  <ErrorOutlineRoundedIcon className="mr-1" />
                  New password is required.
                </div>
              )}
            </div>
            <div className="mb-4 flex items-center">
              <label htmlFor="confirmNewPassword" className="block text-sm font-semibold mb-2 ml-8 text-left w-52">Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                className="border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md p-2 w-2/3"
                required
              />
              {showConfirmPasswordAlert && (
                <div className="flex items-center text-red-500 text-sm ml-1 text-left">
                  <ErrorOutlineRoundedIcon className="mr-1" />
                  Please confirm your new password.
                </div>
              )}
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md ml-[628px] justify-end flex hover:bg-green-400">Change Password</button>
          </form>
        </div>
      </div>

      {/* Change Email */}
      <div className="ml-8 rounded-md p-4 w-5/6">
        <div className="flex flex-col items-center border border-gray-500 rounded-md pb-4">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-t-md w-full flex justify-start mb-4">
            <div className="text-lg font-semibold">Change Email</div>
          </div>
          <form onSubmit={handleEmailChange} className="w-full">
            <div className="mb-4 flex items-center">
              <label htmlFor="currentEmail" className="block text-sm font-semibold mb-2 ml-8 text-left w-52">Current Email</label>
              <input
                type="email"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                placeholder="Enter your current email"
                className="border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md p-2 w-2/3"
                required
              />
              {showCurrentEmailAlert && (
                <div className="flex items-center text-red-500 text-sm ml-1 text-left">
                  <ErrorOutlineRoundedIcon className="mr-1" />
                  Current email is required.
                </div>
              )}
            </div>
            <div className="mb-4 flex items-center">
              <label htmlFor="newEmail" className="block text-sm font-semibold mb-2 ml-8 text-left w-52">New Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
                className="border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md p-2 w-2/3"
                required
              />
              {showNewEmailAlert && (
                <div className="flex items-center text-red-500 text-sm ml-1 text-left">
                  <ErrorOutlineRoundedIcon className="mr-1" />
                  New email is required.
                </div>
              )}
            </div>
            <div className="mb-4 flex items-center">
              <label htmlFor="confirmNewEmail" className="block text-sm font-semibold mb-2 ml-8 text-left w-52">Confirm New Email</label>
              <input
                type="email"
                value={confirmNewEmail}
                onChange={(e) => setConfirmNewEmail(e.target.value)}
                placeholder="Confirm new email"
                className="border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md p-2 w-2/3"
                required
              />
              {showConfirmEmailAlert && (
                <div className="flex items-center text-red-500 text-sm ml-1 text-left">
                  <ErrorOutlineRoundedIcon className="mr-1" />
                  Please confirm your new email.
                </div>
              )}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-[665px] justify-end flex hover:bg-blue-400">Change Email</button>
          </form>
        </div>
      </div>
      {toastMessage && (
  <div className="fixed bottom-4 right-4">
    <div className={`bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 dark:bg-teal-800/30 transition-all transform duration-300 ease-in-out`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </span>
        </div>
        <div className="ms-3">
          <h3 className="text-gray-800 font-semibold dark:text-white">
            Success
          </h3>
          <p className="text-sm text-gray-700 dark:text-neutral-400">
            {toastMessage}
          </p>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
