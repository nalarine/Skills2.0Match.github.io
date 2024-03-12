import React, { useState } from 'react';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

const Settings = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);

  const handleDeleteAccount = () => {
    if (password === '') {
      // Show alert if password is blank
      setShowPasswordAlert(true);
      return;
    }

    // Handle account deletion logic here
    // This function will be called when the delete button is clicked
    console.log('Deleting account...');
    // Reset password field after deletion
    setPassword('');
    // Close the delete dialog
    setIsDeleteDialogOpen(false);
  };

  const openDeleteDialog = () => {
    setShowPasswordAlert(false); // Hide password alert when opening dialog
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <div>
      <div className="font-semibold text-4xl text-left ml-8 text-green-900 underline underline-offset-8">Settings</div>
      <div className="mt-8 ml-8 border-[6px] border-green-300 rounded-md p-4 flex items-center w-5/6">
        <div className="mr-4 text-lg">Delete Account</div>
        <button onClick={openDeleteDialog} className="bg-red-500 text-white ml-auto px-4 py-2 rounded-md ">Delete</button>
      </div>

      {/* Delete Account Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md w-[400px]">
            <h1 className="text-2xl font-semibold mb-4">Delete Account</h1>
            <p className="text-lg mb-4">Delete your account and all of your stored information. This cannot be undone.</p>
            <label htmlFor="password" className="block text-sm font-semibold mb-2 ml-1 text-left">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md p-2 w-full mb-2"
              required
            />
            {/* Show password alert when password is blank */}
            {showPasswordAlert && (
              <div className="flex items-center text-red-500 text-sm mb-6 ml-1 text-left">
                <ErrorOutlineRoundedIcon className="mr-1" />
                Required Field
              </div>
            )}
            <div className="flex justify-end">
              <button onClick={handleDeleteAccount} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Delete Account</button>
              <button onClick={closeDeleteDialog} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;