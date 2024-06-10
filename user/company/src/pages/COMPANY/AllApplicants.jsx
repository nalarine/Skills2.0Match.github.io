import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ViewApplicantCard from '../../components/ViewApplicantCard'
import { apiRequest } from '../../utils'
import moment from 'moment'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HiringStageCell = ({ applicantId, value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(applicantId, e.target.value)}
    className="bg-white border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
    disabled={value === 'Hired' || value === 'Declined'}
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
  const [filter, setFilter] = useState({
    hiringStage: '',
    fullName: '',
    jobRole: '',
    appliedDateStart: '',
    appliedDateEnd: '',
  })

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
    let filtered = applicants

    // Filter by hiring stage
    if (filter.hiringStage) {
      filtered = filtered.filter((applicant) =>
        applicant.hiringStage.includes(filter.hiringStage),
      )
    }

    // Filter by full name
    if (filter.fullName) {
      filtered = filtered.filter((applicant) =>
        applicant.fullName
          .toLowerCase()
          .includes(filter.fullName.toLowerCase()),
      )
    }

    // Filter by job role
    if (filter.jobRole) {
      filtered = filtered.filter((applicant) =>
        applicant.jobRole.toLowerCase().includes(filter.jobRole.toLowerCase()),
      )
    }

    // Filter by applied date range
    if (filter.appliedDateStart && filter.appliedDateEnd) {
      const startDate = moment(filter.appliedDateStart)
      const endDate = moment(filter.appliedDateEnd)
      filtered = filtered.filter((applicant) => {
        const appliedDate = moment(applicant.appliedDate)
        return appliedDate.isBetween(startDate, endDate, undefined, '[]')
      })
    }

    setFilteredApplicants(filtered)
  }, [applicants, filter])

  const handleStatusChange = async (applicantId, newStatus) => {
    if (newStatus === 'Hired' || newStatus === 'Declined') {
      toast(`Applicant ${newStatus}!`, { type: 'info' })
    }
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
    const detailedUser = {
      ...applicant.user,
      resume: applicant.resume,
    }
    setUserInfo(detailedUser)
    setShowModal(true)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }))
  }

  return (
    <>
      <div className="flex flex-col p-6 gap-4">
        <h1 className="text-3xl font-bold">
          Total Applicants: {applicants.length}
        </h1>
        <div className="flex flex-wrap gap-4 mt-4 items-center">
          <div className="flex items-center">
            <label className="block mr-2">
              Hiring Stage:
              <select
                name="hiringStage"
                value={filter.hiringStage}
                onChange={handleFilterChange}
                className="bg-white border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Hired">Hired</option>
                <option value="Declined">Declined</option>
                <option value="Shortlisted">Shortlisted</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block">
              Full Name:
              <input
                type="text"
                name="fullName"
                value={filter.fullName}
                onChange={handleFilterChange}
                className="bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Job Role:
              <input
                type="text"
                name="jobRole"
                value={filter.jobRole}
                onChange={handleFilterChange}
                className="bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
            </label>
          </div>
          <div className="flex flex-col">
            <label className="flex block items-center">
              Applied Date Range:
              <div className="flex">
                <input
                  type="date"
                  value={filter.appliedDateStart}
                  onChange={(e) =>
                    handleFilterChange({
                      target: {
                        name: 'appliedDateStart',
                        value: e.target.value,
                      },
                    })
                  }
                  className="bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 mr-2"
                />
                <input
                  type="date"
                  value={filter.appliedDateEnd}
                  onChange={(e) =>
                    handleFilterChange({
                      target: { name: 'appliedDateEnd', value: e.target.value },
                    })
                  }
                  className="bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </label>
          </div>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
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
              {filteredApplicants.map((filteredApplicant) => (
                <tr
                  key={filteredApplicant.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-4 py-2">{filteredApplicant.fullName}</td>
                  <td className="px-4 py-2">
                    <HiringStageCell
                      applicantId={filteredApplicant.id}
                      value={filteredApplicant.hiringStage}
                      onChange={handleStatusChange}
                    />
                  </td>
                  <td className="px-4 py-2">
                    {new Date(
                      filteredApplicant.appliedDate,
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{filteredApplicant.jobRole}</td>
                  <td className="px-4 py-2">
                    <ActionCell
                      applicant={filteredApplicant}
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
      <ToastContainer />
    </>
  )
}
