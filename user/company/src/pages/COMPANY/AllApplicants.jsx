import React, { useEffect, useState } from 'react'
import { apiRequest } from '../../utils'
import { useSelector } from 'react-redux'
import ViewApplicantCard from '../../components/ViewApplicantCard'

export default function AllApplicants() {
  const { user } = useSelector((state) => state.user)
  const [tableData, setTableData] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getCompany = async () => {
      try {
        const res = await apiRequest({
          url: '/companies/get-company/' + user._id,
          method: 'GET',
        })
        setTableData(res.data.applicants)
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }
    getCompany()
  }, [user._id])

  const handleSeeProfile = (applicant) => {
    const detailedUser = {
      ...applicant.user,
      resume: applicant.resume, // Ensuring resume data is carried over correctly
    }
    setUserInfo(detailedUser)
    setShowModal(true)
  }

  return (
    <>
      <div className="flex flex-col p-3 gap-5">
        <div>
          <span className="text-3xl font-black">
            Total Applicants: {tableData.length}
          </span>
        </div>
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
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td className="py-4 px-6 text-base">{row.fullName}</td>
                  <td className="py-4 px-6 text-base">{row.hiringStage}</td>
                  <td className="py-4 px-6 text-base">{row.appliedDate}</td>
                  <td className="py-4 px-6 text-base">{row.jobRole}</td>
                  <td className="py-4 px-6 text-base">
                    <button
                      className="font-medium text-blue-600 text-white bg-green-700 hover:bg-green-500 hover:text-white px-4 pt-2 pb-2 border rounded-md"
                      onClick={() => handleSeeProfile(row)}
                    >
                      See Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <ViewApplicantCard
          userInfo={userInfo}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  )
}
