import React from 'react';
import Modal from "react-modal";

const ViewApplicantCard = ({ userInfo, showModal, setShowModal }) => {
  return (
    <Modal
      isOpen={showModal}
      className="fixed inset-0 z-50 overflow-y-auto"
      overlayClassName="fixed inset-0 custom-overlay"
    >
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-10 rounded-lg shadow-md w-1/4 relative items-center" onClick={e => e.stopPropagation()}>
          <h1 className="text-3xl font-bold mb-10">Details</h1>
          <p className="block text-lg font-medium">Profile Picture: </p>
          <img className="rounded-full w-40 h-40" src="https://source.unsplash.com/featured/?face" alt="Sample Face" />
          <p className="block text-lg font-medium">Name: </p>
          {/* <p className="mb-4">{userInfo.firstName + " " + userInfo.lastName}</p> */}
          <p className="mb-4">{userInfo?.companyName}</p>

          <p className="block text-lg font-medium">E-mail: </p>
          {/* <p className="mb-4">{userInfo.email}</p> */}
          <p className="mb-4">{userInfo?.appliedDate}</p>

          <p className="block text-lg font-medium">Location: </p>
          {/* <p className="mb-4">{userInfo.location}</p> */}
          <p className="mb-4">{userInfo?.hiringStage}</p>

          <p className="block text-lg font-medium">Job Title: </p>
          {/* <p className="mb-4">{userInfo.jobTitle}</p> */}
          <p className="mb-4">{userInfo?.jobRole}</p>

          <p className="block text-lg font-medium">View Resume</p>
          <input type="file" class="block mb-12 w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        hover:file:bg-violet-100"
          />
        </div>
      </div>
    </Modal>
  )
}

export default ViewApplicantCard;