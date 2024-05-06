import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ViewApplicantCard from '../../components/ViewApplicantCard'
import { apiRequest } from '../../utils'
import moment from 'moment' // Import moment

const HiringStageCell = ({ applicantId, value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(applicantId, e.target.value)}
    className="bg-white border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
  >
    {['Pending', 'Hired', 'Declined', 'Shortlisted'].map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
)

const ActionCell = ({ applicant, onSeeProfile }) => (
  <button
    className="bg-green-500 py-1 px-2 rounded-md text-white hover:bg-green-600 focus:outline-none"
    onClick={() => onSeeProfile(applicant)}
  >
    See Profile
  </button>
)

export default function AllApplicants({ dateRange }) {
  const { user } = useSelector((state) => state.user)
  const [applicants, setApplicants] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [filteredApplicants, setFilteredApplicants] = useState([])

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await apiRequest({
          url: `/companies/get-company/${user._id}`,
          method: 'GET',
        })
        setApplicants(res.data.applicants)
      } catch (error) {
        console.error('Error loading company data:', error)
      }
    }
    fetchApplicants()
  }, [user._id])

  useEffect(() => {
    if (dateRange && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      const filtered = applicants.filter((applicant) => {
        const appliedDate = moment(applicant.appliedDate)
        return appliedDate.isBetween(
          dateRange[0],
          dateRange[1],
          undefined,
          '[]',
        )
      })
      setFilteredApplicants(filtered)
    } else {
      setFilteredApplicants(applicants)
    }
  }, [applicants, dateRange])

  useEffect(() => {
    const getCompany = async () => {
      try {
        const res = await apiRequest({
          url: `/companies/get-company/${user._id}`,
          method: 'GET',
        })
        setApplicants(res.data.applicants)
      } catch (error) {
        console.error('Error loading company data:', error)
      }
    }
    getCompany()
  }, [user._id])

  const handleStatusChange = async (applicantId, newStatus) => {
    try {
      await apiRequest({
        url: `/companies/update-company-applicant/${user._id}`,
        data: { id: applicantId, hiringStage: newStatus },
        method: 'PUT',
      })
      const updatedApplicants = applicants.map((applicant) =>
        applicant.id === applicantId
          ? { ...applicant, hiringStage: newStatus }
          : applicant,
      )
      setApplicants(updatedApplicants)
    } catch (error) {
      console.error('Error updating hiring stage:', error)
    }
  }

  const handleSeeProfile = (applicant) => {
    // The detailedUser object should ideally contain all user-related data necessary for the modal
    const detailedUser = {
      ...applicant.user, // assuming applicant has a nested user object as in the first snippet
      resume: applicant.resume, // Ensure resume data is included
    }
    setUserInfo(detailedUser)
    setShowModal(true)
  }

  return (
    <>
      <div className="flex flex-col p-6 gap-4">
        <h1 className="text-3xl font-bold">
          Total Applicants: {applicants.length}
        </h1>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6 text-base text-green-900">
                  Full Name
                </th>
                <th scope="col" className="py-3 px-6 text-base text-green-900">
                  Hiring Stage
                </th>
                <th scope="col" className="py-3 px-6 text-base text-green-900">
                  Applied Date
                </th>
                <th scope="col" className="py-3 px-6 text-base text-green-900">
                  Job Role
                </th>
                <th scope="col" className="py-3 px-6 text-base text-green-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((filteredApplicants) => (
                <tr
                  key={filteredApplicants.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-4 py-2">{filteredApplicants.fullName}</td>
                  <td className="px-4 py-2">
                    <HiringStageCell
                      applicantId={filteredApplicants.id}
                      value={filteredApplicants.hiringStage}
                      onChange={handleStatusChange}
                    />
                  </td>
                  <td className="px-4 py-2">
                    {filteredApplicants.appliedDate}
                  </td>
                  <td className="px-4 py-2">{filteredApplicants.jobRole}</td>
                  <td className="px-4 py-2">
                    <ActionCell
                      applicant={filteredApplicants}
                      onSeeProfile={handleSeeProfile}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showModal && (
          <ViewApplicantCard
            userInfo={userInfo}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </>
  )
}
