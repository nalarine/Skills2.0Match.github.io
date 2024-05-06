import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiRequest } from '../../utils'
import ViewApplicantCard from '../../components/ViewApplicantCard'

export default function AllApplication() {
  const { user } = useSelector((state) => state.user)
  const [tableData, setTableData] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getUser = async () => {
    try {
      const res = await apiRequest({
        url: '/jobs/job-applications/' + user._id,
        method: 'GET',
        token: user?.token,
      })
      let tableData = []
      for (let data of res.data) {
        for (let applicant of data.applicants) {
          tableData.push({
            companyName: data.companyName,
            ...applicant,
          })
        }
      }
      setTableData(tableData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
    // fetch("src/components/lib/consts/dummy/dummy_table.json") // Verify the path to your JSON file
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(
    //         `Network response was not ok: ${response.statusText}`
    //       );
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setTableData(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error loading data:", error);
    //   });
  }, [])

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-2xl font-bold text-center mb-4">
        Total Jobs Applied: {tableData.length}
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6 text-base text-green-900">
                  Company Name
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6 text-base">{item.companyName}</td>
                  <td className="py-4 px-6 text-base">{item.hiringStage}</td>
                  <td className="py-4 px-6 text-base">{item.appliedDate}</td>
                  <td className="py-4 px-6 text-base">{item.jobRole}</td>
                  <td className="py-4 px-6 text-base">
                    <button
                      href={`/job-detil/${item.id}`}
                      className="font-medium text-blue-600 text-green-700 bg-green-100 hover:bg-green-700 hover:text-white px-4 pt-2 pb-2 border rounded-md"
                    >
                      View Job
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ViewApplicantCard
        userInfo={userInfo}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  )
}
