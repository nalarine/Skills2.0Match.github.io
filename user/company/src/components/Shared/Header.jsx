import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { apiRequest } from '../../utils'
import NotificationsPopover from './usernotifications-popover'
import AccountPopover from './useraccount-popover'

const Header = () => {
  const { user } = useSelector((state) => state.user)
  const [newJobDetails, setNewJobDetails] = useState([])

  const profileUrl = user?.profileUrl || ''

  useEffect(() => {
    const interval = setInterval(() => {
      fetchJobDetails()
    }, 10000)

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(interval)
  }, [])

  const fetchJobDetails = async () => {
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
      setNewJobDetails(tableData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-3 relative">
      <div className="items-center h-24 px-5 py-3 flex flex-row pt-2 border-b border-blue gap relative bg-zinc-100">
        <div className="flex-1 flex flex-row gap-3">
          <div className="flex flex-col py-2">
            <span className="font-bold text-xl">{user?.firstName}</span>
            <span className="font-normal text-gray">Applicant</span>
          </div>
        </div>
        <div className="flex items-center gap-3  relative">
          <NotificationsPopover newJobDetails={newJobDetails} />
        </div>
        <div className="flex items-center gap-3 p-3 relative">
          <AccountPopover />
        </div>
        <Link to="/find-jobs">
          <button
            className="bg-green-700 hover:bg-green-500 border border-dark-yellow text-white font-bold py-2 px-4 rounded transition-transform"
            style={{
              borderRadius: '20px / 50%',
              transitionProperty: 'border-radius',
            }}
          >
            Apply Now
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Header
