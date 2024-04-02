import React from 'react'
import Modal from 'react-modal'

const ViewApplicantCard = ({ userInfo, showModal, setShowModal }) => {

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Modal
      isOpen={showModal}
      className="fixed inset-0 z-50 overflow-y-auto"
      overlayClassName="fixed inset-0 custom-overlay"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="bg-white p-10 pl-[70px] rounded-lg shadow-md w-[70%] flex flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-center pr-10">
            <img
              className="w-52 h-40"
              src={userInfo?.profileUrl}
              alt="Profile URL"
            />
            <div className="mb-4">
              <p className="block text-2xl font-bold mt-4">{userInfo?.firstName + ' ' + userInfo?.lastName}</p>
            </div>
          </div>
          <div className="border-l pl-10">

          <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-green-500">Applicant Details</h1>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-green-700 focus:outline-none ml-[320px]"
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
            
            <div className="flex mb-4">
              <div className="mr-8">
                <p className="block text-lg font-medium">E-mail: </p>
                <p>{userInfo?.email}</p>
              </div>
              <div>
                <p className="block text-lg font-medium">Location: </p>
                <p>{userInfo?.location}</p>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="mr-8">
                <p className="block text-lg font-medium">Contact: </p>
                <p>{userInfo?.contact}</p>
              </div>
              <div>
                {userInfo?.resume ? (
                  <a
                    href={userInfo?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg ml-32 mt-2 font-medium text-green-900 bg-green-200 p-2 rounded-md hover:bg-green-700 hover:text-green-200"
                  >
                    View Resume
                  </a>
                ) : (
                  <p className="ml-28 text-red-500 font-bold">No Resume Attached</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="block text-lg font-medium">About: </p>
              <p>{userInfo?.about}</p>
            </div>
            <div className="mb-4">
              <p className="block text-lg font-medium">Skills: </p>
              <p>{userInfo?.skills}</p>
            </div>
            {/* {userInfo?.resume ? (
              <a
                href={userInfo?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-medium text-blue-600 hover:underline hover:text-blue-800"
              >
                View Resume
              </a>
            ) : (
              <p className="mb-4">No Resume</p>
            )} */}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ViewApplicantCard