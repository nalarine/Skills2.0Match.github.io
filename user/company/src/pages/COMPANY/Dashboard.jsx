import { DUMMY_DATA_INFO } from '../../components/lib/consts/dummy/dummy'
import React from 'react'
import { IoCalendar } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import CompanyStatsGrid from '../../components/CompanyStatsGrid'
import JobStatistics from '../../components/JobStatistics'
import ApplicantsSummary from '../../components/ApplicantsSummary'
import hello from '../../assets/hello.png'

export default function Dashboard() {
  const { user } = useSelector((state) => state.user)

  return (
    <>
      <div className="p-3">
        {DUMMY_DATA_INFO.map((item) => (
          <div className="h-28 flex flex-col">
            <div className="items-center flex flex-row">
            <div className="md:flex-1 md:flex md:flex-col md:gap-3">
              <div className="flex items-center pl-[20%]"> {/* Added div with flex to align items */}
                <img src={hello} alt="image" className="w-18 h-18 mr-2" /> {/* Added image tag */}
                <span className="font-black text-4xl">
                  Hello, {user?.name}
                </span>
              </div>
              <span className="text-base pr-[10%]">
                Here is your job listing statistic report
              </span>
          </div>
              {/* <div className="w-48 p-3 bg-green-700 rounded-md">
                <span className="justify-center items-center text-white font-bold flex flex-row gap-2.5">
                  {item.date}
                  <IoCalendar className="text-white" />
                </span>
              </div> */}
            </div>
          </div>
        ))}
        <CompanyStatsGrid />
        <div className="flex flex-row gap-4 w-full py-3">
          <JobStatistics />
          <ApplicantsSummary />
        </div>
        <div className="flex flex-row gap-4 w-full py-3"></div>
      </div>
    </>
  )
}
