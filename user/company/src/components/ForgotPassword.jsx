import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import ForgotPic from '../assets/forgot-password.png';
import { apiRequest } from '../utils';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox } from "@nextui-org/react";

const ChangePasswordForm = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    if (!acceptedTerms) {
        setErrorMessage('Please accept the terms of service');
        return;
      }
  

    try {
      const response = await apiRequest({
        url: '/auth/reset-password/:token',
        method: 'POST',
        data: { email, newPassword }
      });
      if (response.success) {
        setSuccessMessage(response.message);
        setShowModal(true);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Internal Server Error');
    }
  };
  const closeModal = () => {
    setShowModal(false);
    // Additional cleanup or redirection logic after closing modal if needed
  };
  return (
    <section className="bg-gradient-to-r from-green-500 to-orange-900 h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-start px-4 md:px-12 py-8 mx-auto md:h-full lg:py-0">
        <div className="w-full md:w-auto p-10 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <a href="#" className="flex items-center mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            <img className="w-10 h-10 mr-2" src={Logo} alt="logo"/>
            Skills 2.0 Match    
          </a>
          <h2 className="mb-1 text-xl font-bold text-left leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create new password
          </h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 text-left">Your new password must be different from previously used passwords.</p>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5 text-left" onSubmit={handleSubmit}>
            {/* Display error message if there is one */}
            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
            {/* Display success message if password is reset successfully */}
            {successMessage && <div className="text-green-600">{successMessage}</div>}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="flex items-start">
              <Checkbox
                id="accept-terms"
                color="success"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
               <span className="text-sm text-gray-600 dark:text-gray-400 text-left">
                  I accept to Skills 2.0 Match's {' '}
                  <a
                    href="/privacy-policy"
                    className="font-medium text-green-600 hover:underline dark:text-green-500"
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    href="/terms-of-service"
                    className="font-medium text-green-600 hover:underline dark:text-green-500"
                  >
                    Terms of Service
                  </a>
                </span>
            </div>
            <div className="mt-2">
            <button type="submit" className="w-48 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset password</button>
              <a href="/user-auth" className="text-green-600 hover:underline ml-4">Back to login</a>
            </div>
          </form>
        </div>
        <div className="hidden md:flex md:w-3/5 justify-end items-end">
          <div className="flex justify-end w-full">
            <img src={ForgotPic} alt="template" className="w-full h-full object-cover" style={{ marginRight: '50px', marginTop: '50px', width: '80%' }} />
          </div>
        </div>
      </div>
      <Modal backdrop={showModal ? 'blur' : 'opaque'} isOpen={showModal} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>Password Reset Successful</ModalHeader>
          <ModalBody>
            <p>Your password has been successfully reset.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={closeModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default ChangePasswordForm;
