import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiRequest } from '../../utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ViewApplicantCard from '../../components/ViewApplicantCard'

export default function AllApplication() {
  const { user } = useSelector((state) => state.user)
  const [tableData, setTableData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [withdrawConfirmation, setWithdrawConfirmation] = useState(null) // State for withdrawal confirmation modal
  const [filter, setFilter] = useState({
    hiringStage: '',
    fromDate: '',
    toDate: '',
    search: '',
  })

  const getUser = async () => {
    setIsLoading(true)
    try {
      const res = await apiRequest({
        url: `/jobs/job-applications/${user?._id}`,
        method: 'GET',
        token: user?.token,
      })
      let tableData = []
      for (let data of res.data) {
        for (let applicant of data.applicants) {
          tableData.push({
            id: `${data._id}-${applicant._id}`,
            companyName: data.companyName,
            ...applicant,
          })
        }
      }
      setTableData(tableData)
      setFilteredData(tableData) // Set filtered data initially same as table data
    } catch (error) {
      console.error(error)
      setError('Failed to load data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filter, tableData])

  const applyFilters = () => {
    let filtered = tableData.filter((item) => {
      let hiringStageMatch = true
      let dateMatch = true
      let searchMatch = true

      if (filter.hiringStage && item.hiringStage !== filter.hiringStage) {
        hiringStageMatch = false
      }

      if (
        filter.fromDate &&
        filter.toDate &&
        (new Date(item.appliedDate) < new Date(filter.fromDate) ||
          new Date(item.appliedDate) > new Date(filter.toDate))
      ) {
        dateMatch = false
      }

      if (
        filter.search &&
        !item.companyName.toLowerCase().includes(filter.search.toLowerCase())
      ) {
        searchMatch = false
      }

      return hiringStageMatch && dateMatch && searchMatch
    })

    setFilteredData(filtered)
  }
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }))
  }

  const handleWithdraw = async (jobId) => {
    try {
      const [jobIdPart] = jobId.split('-')
      await apiRequest({
        url: `/jobs/${jobIdPart}/withdraw-application`,
        method: 'DELETE',
        token: user?.token,
        data: { userId: user?._id },
      })
      setTableData((prevData) => prevData.filter((item) => item.id !== jobId))
      setWithdrawConfirmation(null) // Close the withdrawal confirmation modal after successful withdrawal
      toast.success('Job application withdrawn successfully')
    } catch (error) {
      console.error('Failed to withdraw application:', error)
    }
  }

  const renderCell = (params) => (
    <div className="flex space-x-2">
      <a
        href={'/job-detail/' + params.id.split('-')[1]}
        className="cursor-pointer font-medium text-blue-600 text-green-700 bg-green-100 hover:bg-green-700 hover:text-white px-3 py-2 border rounded-md"
      >
        <div className="flex">
          <div className="mr-1">View</div>
          <div>Job</div>
        </div>
      </a>
      <button
        onClick={() => setWithdrawConfirmation(params.id)} // Set jobId to show confirmation modal
        className="cursor-pointer font-medium text-red-600 bg-red-100 hover:bg-red-700 hover:text-white px-4 py-2 border rounded-md"
      >
        Withdraw
      </button>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-2xl font-bold text-center mb-4">
        Total Jobs Applied: {filteredData.length}
      </h1>
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <label className="flex items-center">
            <span className="mr-2">Hiring Stage:</span>
            <select
              name="hiringStage"
              value={filter.hiringStage}
              onChange={handleFilterChange}
              className="border rounded-md py-1 px-2"
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Hired">Hired</option>
              <option value="Declined">Declined</option>
              <option value="Shortlisted">Shortlisted</option>
            </select>
          </label>
          <label className="flex items-center">
            <span className="mr-2">From Date:</span>
            <input
              type="date"
              name="fromDate"
              value={filter.fromDate}
              onChange={handleFilterChange}
              className="border rounded-md py-1 px-2"
            />
          </label>
          <label className="flex items-center">
            <span className="mr-2">To Date:</span>
            <input
              type="date"
              name="toDate"
              value={filter.toDate}
              onChange={handleFilterChange}
              className="border rounded-md py-1 px-2"
            />
          </label>
        </div>
        <div>
          <input
            type="text"
            name="search"
            placeholder="Enter Company Name"
            value={filter.search}
            onChange={handleFilterChange}
            className="border rounded-md py-1 px-2"
          />
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-green-900 uppercase bg-green-100 dark:bg-green-700 dark:text-gray-400">
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
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6 text-base">{item.companyName}</td>
                  <td className="py-4 px-6 text-base">{item.hiringStage}</td>
                  <td className="py-4 px-6 text-base">
                    {new Date(item.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-base">{item.jobRole}</td>
                  <td className="py-4 px-6 text-base">{renderCell(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {withdrawConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <p>Are you sure you want to withdraw your application?</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleWithdraw(withdrawConfirmation)}
                className="mr-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Confirm Withdrawal
              </button>
              <button
                onClick={() => setWithdrawConfirmation(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer /> {/* Toast container */}
      <ViewApplicantCard />
    </div>
  )
}
