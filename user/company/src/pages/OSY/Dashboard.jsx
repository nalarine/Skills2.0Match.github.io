import React from 'react'
import { useSelector } from 'react-redux'
import { IoCalendar } from 'react-icons/io5'
import DashboardStatsGrid from '../../components/DashboardStatsGrid'
import JobAvailable from '../../components/JobAvailable'

import hello from '../../assets/hello.png'

const Dashboard = () => {
  const { user } = useSelector((state) => state.user)

  const handleCalendarClick = () => {
    // Add your functionality for when the calendar is clicked
    alert('Calendar button clicked!')
    // You can perform any actions you want here
  }

  return (
    <>
      <div className="p-3">
        <div className="md:flex md:flex-col md:h-28">
          <div className="md:flex md:flex-row md:items-center">
          <div className="md:flex-1 md:flex md:flex-col md:gap-3">
            <div className="flex items-center pl-[30%]"> {/* Added div with flex to align items */}
              <img src={hello} alt="image" className="w-18 h-18 mr-2" /> {/* Added image tag */}
              <span className="font-black text-4xl">
                Hello, {user?.firstName}
              </span>
            </div>
            <span className="text-base -pl-[50%] pr-[5%]">
              Here is your job listing statistic report
            </span>
          </div>
          </div>
        </div>
        {/* <DashboardStatsGrid /> */}
        <div className="flex flex-col md:flex-row md:gap-4 w-full py-3">
          <JobAvailable />
        </div>
      </div>
    </>
  )
}

export default Dashboard
