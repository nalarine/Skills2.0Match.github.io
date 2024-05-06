import React, { useEffect } from 'react'
import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai'
import { CiLocationOn } from 'react-icons/ci'
import CustomButton from './CustomButton'
// import { popularSearch } from "../utils/data";
import AOS from 'aos'
import 'aos/dist/aos.css'

const SearchInput = ({ placeholder, icon, value, setValue, styles }) => {
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className={`flex items-center ${styles}`}>
      {icon}
      <input
        value={value}
        onChange={(e) => handleChange(e)}
        type="text"
        className="w-full p-2 outline-none bg-transparent text-base"
        placeholder={placeholder}
      />
      <AiOutlineCloseCircle
        className="text-gray-600 text-xl cursor-pointer"
        onClick={() => setValue('')}
      />
    </div>
  )
}

const Header = ({
  title,
  type,
  handleClick,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
}) => {
  useEffect(() => {
    AOS.init({ duration: 2000 })
  }, [])

  return (
    <div
      className="relative w-100 h-100"
      style={{
        background: "url('../../src/assets/find-jobs-header.png') center",
        backgroundSize: 'contain',
      }}
    >
      <div
        className={`container mx-auto px-5 ${type ? 'h-[500px]' : 'h-[500px]'} flex top-16 relative`}
      >
        <div
          className="w-full z-10"
          data-aos="fade-right"
          data-aos-duration="2500"
        >
          <div className="mb-8">
            <p className="mt-20 text-green-500 font-bold text-4xl">{title}</p>
          </div>

          <div
            className="w-full flex items-center justify-around bg-white px-2 md:px-5 py-2.5 md:py-6 shadow-2xl rounded-full"
            data-aos="zoom-in"
            data-aos-duration="2500"
          >
            <SearchInput
              placeholder="Job Title or Keywords"
              icon={<AiOutlineSearch className="text-black-600 text-xl" />}
              value={searchQuery}
              setValue={setSearchQuery}
            />
            <SearchInput
              placeholder="Add Country or City"
              icon={<CiLocationOn className="text-black-600 text-xl" />}
              value={location}
              setValue={setLocation}
              styles={'hidden md:flex'}
            />

            <div>
              <CustomButton
                onClick={handleClick}
                title="Search"
                containerStyles={
                  'text-white py-2 md:py3 px-3 md:px-10 focus:outline-none bg-green-600 rounded-full md:rounded-md text-sm md:text-base'
                }
              />
            </div>
          </div>

          {/* {type && (
            <div className='w-full lg:1/2 mx-9 flex flex-wrap gap-4 md:gap-6 py-10 md:py-14'>
              {popularSearch.map((search, index) => (
                <span
                  key={index}
                  className='bg-[#16A34A] text-[#ffffff] py-1 px-3 rounded-full text-sm md:text-base' data-aos="flip-left"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  {search}
                </span>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Header
