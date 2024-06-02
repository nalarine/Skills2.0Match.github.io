import React from 'react'
import { IoCalendar } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import DashboardStatsGrid from '../../components/DashboardStatsGrid'
import JobStatistics from '../../components/JobStatistics'
import ApplicantsSummary from '../../components/ApplicantsSummary'
import hello from '../../assets/hello.png'

export default function Dashboard() {
  const { user } = useSelector((state) => state.user)
  const today = new Date().toLocaleDateString()

  return (
    <>
      <div className="p-3">
        <div className="h-28 flex flex-col">
          <div className="items-center flex flex-row">
            <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center pl-[20%]">
                {' '}
                {/* Added div with flex to align items */}
                <img src={hello} alt="image" className="w-18 h-18 mr-2" />{' '}
                {/* Added image tag */}
                <span className="font-black text-4xl">
                  Hello, {user?.name}
                </span>
              </div>
              <span className="text-base">
                Here is your job listing statistic report for today: {today}
              </span>
            </div>
            <div className="w-48 p-3 bg-green-700 rounded-md">
              <span className="justify-center items-center text-white font-bold flex flex-row gap-2.5">
                {today}
                <IoCalendar className="text-white" />
              </span>
            </div>
          </div>
        </div>
        <DashboardStatsGrid />
        <div className="flex flex-row gap-4 w-full py-3">
          <JobStatistics />
          <ApplicantsSummary />
        </div>
        <div className="flex flex-row gap-4 w-full py-3"></div>
      </div>
    </>
  )
}
