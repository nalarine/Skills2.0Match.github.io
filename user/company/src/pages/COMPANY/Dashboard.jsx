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
        <div className="flex flex-col md:flex-row gap-4 w-full py-3">
        <section className="">
  <div className="flex flex-wrap mx-auto md:flex-nowrap p-12">

    <a href="">
      <div className="flex w-full">
        <div className="relative flex flex-col items-start m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
          <img className="object-cover object-center w-full rounded-t-xl lg:h-48 md:h-36" src="../../assets/images/announce.png" alt="blog"/>
          <div className="px-6 py-8">
            <h4 className="mt-4 text-2xl font-semibold text-neutral-600">
              <span classNae="">Entry</span>
            </h4>
            <p className="mt-4 text-base font-normal text-gray-500 leading-relax">Install Tailwind CSS without any Javascript Framewrok locally with purgeCSS, enable the dark mode option, prefferences or class is upt to you.</p>
          </div>
        </div>
      </div>
    </a>

    <a href="">
      <div className="flex w-full">
        <div className="relative flex flex-col items-start m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
          <img className="object-cover object-center w-full rounded-t-xl lg:h-48 md:h-36" src="/assets/images/placeholders/neon-4.jpg" alt="blog"/>
          <div className="px-6 py-8">
            <h4 className="mt-4 text-2xl font-semibold text-neutral-600">
              <span className="">Entry</span>
            </h4>
            <p className="mt-4 text-base font-normal text-gray-500 leading-relax">Install Tailwind CSS without any Javascript Framewrok locally with purgeCSS, enable the dark mode option, prefferences or class is upt to you.</p>
          </div>
        </div>
      </div>
    </a>

    <a href="">
      <div className="flex w-full">
        <div className="relative flex flex-col items-start m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
          <img className="object-cover object-center w-full rounded-t-xl lg:h-48 md:h-36" src="../../assets/contact-card.png" alt="blog"/>
          <div className="px-6 py-8">
            <h4 className="mt-4 text-2xl font-semibold text-neutral-600">
              <span className="">Entry</span>
            </h4>
            <p className="mt-4 text-base font-normal text-gray-500 leading-relax">Install Tailwind CSS without any Javascript Framewrok locally with purgeCSS, enable the dark mode option, prefferences or class is upt to you.</p>
          </div>
        </div>
      </div>
    </a>

  </div>
</section>
          <ApplicantsSummary />
        </div>
        <div className="flex flex-row gap-4 w-full py-3"></div>
      </div>
    </>
  )
}
