import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaInfoCircle, FaList } from 'react-icons/fa';

const ViewApplicantCard = ({ userInfo, showModal, setShowModal }) => {
  const [showResumePreview, setShowResumePreview] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowResumePreview(false);
  };

  const handleViewResume = () => {
    setShowResumePreview(true);
  };

  // const handleDownloadResume = async () => {
  //   try {
  //     const response = await fetch(userInfo?.resume);
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = `${userInfo?.firstName}_${userInfo?.lastName}_Resume.pdf`;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error('Download error:', error);
  //   }
  // };

  return (
    <Modal
      isOpen={showModal}
      className="fixed inset-0 z-50 overflow-y-auto"
      overlayClassName="fixed inset-0 custom-overlay"
      onRequestClose={handleCloseModal}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="bg-white p-10 pl-[70px] rounded-lg shadow-md w-[70%] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-green-500">Applicant Details</h1>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-green-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {!showResumePreview ? (
          <>
          <div className="flex flex-col lg:flex-row lg:items-start p-6 bg-white shadow-md rounded-lg">
            <div className="flex flex-col items-center lg:items-start lg:w-1/3 mb-6 lg:mb-0 pr-0 lg:pr-10">
              <img
                className="w-52 h-52 rounded-full mb-4 object-cover"
                src={userInfo?.profileUrl}
                alt="Profile"
              />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold mb-2">
                  {userInfo?.firstName + ' ' + userInfo?.lastName}
                </p>
                <p className="text-lg font-bold mb-2 text-green-700">Applicant</p>
              </div>
            </div>
            <div className="border-t lg:border-t-0 lg:border-l pl-0 lg:pl-10 pt-6 lg:pt-0 flex-1">
              <div className="mb-6">
                <p className="text-lg font-medium mb-1 flex items-center">
                  <FaEnvelope className="mr-2" /> E-mail:
                </p>
                <p className="text-gray-700">{userInfo?.email}</p>
              </div>
              <div className="mb-6">
                <p className="text-lg font-medium mb-1 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> Location:
                </p>
                <p className="text-gray-700">{userInfo?.location}</p>
              </div>
              <div className="mb-6">
                <p className="text-lg font-medium mb-1 flex items-center">
                  <FaPhone className="mr-2" /> Contact:
                </p>
                <p className="text-gray-700">{userInfo?.contact}</p>
              </div>
              <div className="mb-6">
                <p className="text-lg font-medium mb-1 flex items-center">
                  <FaInfoCircle className="mr-2" /> About:
                </p>
                <p className="text-gray-700">{userInfo?.about}</p>
              </div>
              <div className="mb-6">
                <p className="text-lg font-medium mb-1 flex items-center">
                  <FaList className="mr-2" /> Skills:
                </p>
                <p className="text-gray-700">{userInfo?.skills}</p>
              </div>
              <div className="mb-6">
                {userInfo?.resume ? (
                  <button
                    onClick={handleViewResume}
                    className="text-lg font-medium text-white bg-green-600 py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                  >
                    View Resume
                  </button>
                ) : (
                  <p className="text-red-500 font-bold">No Resume Attached</p>
                )}
              </div>
            </div>
          </div>
        </>                                      
          ) : (
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold mb-4">Resume Preview</h1>
              <iframe
                src={userInfo?.resume}
                className="w-full h-[80vh] border"
                title="Resume Preview"
              />
              <div className="flex mt-4 space-x-4">
                <button
                  onClick={() => setShowResumePreview(false)}
                  className="text-lg font-medium text-green-900 bg-green-200 p-2 rounded-md hover:bg-green-700 hover:text-green-200"
                >
                  Back to Details
                </button>
                {/* <a
                href={userInfo?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-green-900 bg-green-200 p-2 rounded-md hover:bg-green-700 hover:text-green-200"
              >
                Download Resume
              </a> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewApplicantCard;
