import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BiBriefcaseAlt2 } from 'react-icons/bi'
import { BsStars } from 'react-icons/bs'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { updateURL, apiRequest } from '../utils'
import Loading from '../components/Loading'
import Header from '../components/Header'
import { experience, jobTypes, jobCategories } from '../utils/data'
import { CustomButton, JobCard, ListBox } from '../components'
import { useSelector } from 'react-redux'

const FindJobs = () => {
  const { user } = useSelector((state) => state.user)
  const [sort, setSort] = useState('Newest')
  const [page, setPage] = useState(1)
  const [numPage, setNumPage] = useState(1)
  const [recordCount, setRecordCount] = useState(0)
  const [data, setData] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [jobLocation, setJobLocation] = useState('')
  const [filterJobTypes, setFilterJobTypes] = useState([])
  const [filterExp, setFilterExp] = useState('')
  const [expVal, setExpVal] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isJobTypesDropdownOpen, setIsJobTypesDropdownOpen] = useState(false)
  const [isExperienceDropdownOpen, setIsExperienceDropdownOpen] =
    useState(false)
  const [activeTab, setActiveTab] = useState('Best Matches')

  const toggleJobTypesDropdown = () => {
    setIsJobTypesDropdownOpen(!isJobTypesDropdownOpen)
  }

  const toggleExperienceDropdown = () => {
    setIsExperienceDropdownOpen(!isExperienceDropdownOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await apiRequest({
          url: `/jobs/saved-jobs/${user._id}`,
          method: 'GET',
        })
        setSavedJobs(res.data.savedJobs)
      } catch (error) {
        console.error('Error fetching saved jobs:', error)
      }
    }

    fetchSavedJobs()
  }, [user._id])

  const handleSaveJob = async (job) => {
    const jobIndex = savedJobs.findIndex((savedJob) => savedJob._id === job._id)

    try {
      if (jobIndex === -1) {
        const res = await apiRequest({
          url: '/jobs/save-job',
          method: 'POST',
          data: { id: job._id, userId: user._id },
        })

        console.log('Save job response:', res)

        if (res.success) {
          setSavedJobs((prevSavedJobs) => [...prevSavedJobs, job])
        }
      } else {
        const res = await apiRequest({
          url: '/jobs/remove-job',
          method: 'DELETE',
          data: { id: job._id, userId: user._id },
        })

        console.log('Remove job response:', res)

        if (res.success) {
          setSavedJobs((prevSavedJobs) =>
            prevSavedJobs.filter((savedJob) => savedJob._id !== job._id),
          )
        }
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchJobs = async () => {
    setIsFetching(true)

    const newURL = updateURL({
      pageNum: page,
      query: searchQuery,
      cmpLoc: jobLocation,
      sort: sort,
      navigate: navigate,
      location: location,
      jType: filterJobTypes,
      exp: filterExp,
    })

    try {
      const res = await apiRequest({
        url: '/jobs' + newURL + '&user_id=' + user._id,
        method: 'GET',
      })

      setNumPage(res?.numOfPage)
      setRecordCount(res?.totalJobs)
      setData(res?.data)

      setIsFetching(false)
    } catch (error) {
      setIsFetching(false)
      console.error(error)
    }
  }

  const filterJobs = (val) => {
    if (filterJobTypes?.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el !== val))
    } else {
      setFilterJobTypes([...filterJobTypes, val])
    }
  }

  const filterExperience = async (e) => {
    if (expVal?.includes(e)) {
      setExpVal(expVal?.filter((el) => el !== e))
    } else {
      setExpVal([...expVal, e])
    }
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    await fetchJobs()
  }

  const handleShowMore = async (e) => {
    e.preventDefault()
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    if (expVal.length > 0) {
      let newExpVal = []

      expVal?.map((el) => {
        const newEl = el?.split('-')
        newExpVal.push(Number(newEl[0]), Number(newEl[1]))
      })

      newExpVal?.sort((a, b) => a - b)

      setFilterExp(`${newExpVal[0]}-${newExpVal[newExpVal.length - 1]}`)
    }
  }, [expVal])

  useEffect(() => {
    fetchJobs()
  }, [sort, filterJobTypes, filterExp, page])

  return (
    <div>
      <Header
        title="Find Your Dream Job with Ease"
        className="text-blue-500"
        type="home"
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}
      />

      <div className="container mx-auto flex flex-col md:flex-row gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd]">
        <div className="md:w-1/6 bg-white shadow-sm">
          <p className="text-lg font-semibold text-green-500 text-center md:text-left">
            Filter Search
          </p>

          <div className="py-2 px-4">
            <div className="flex justify-between mb-3">
              <p
                className="flex items-center gap-2 font-semibold cursor-pointer"
                onClick={toggleJobTypesDropdown}
              >
                <BiBriefcaseAlt2 />
                Job Type
              </p>
              <button onClick={toggleJobTypesDropdown}>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>
            <div
              className={`overflow-hidden transition-max-height duration-300 ${
                isJobTypesDropdownOpen ? 'max-h-32' : 'max-h-0'
              }`}
            >
              <div className="flex flex-col gap-2">
                {jobTypes.map((jtype, index) => (
                  <div key={index} className="flex gap-2 text-sm md:text-base ">
                    <input
                      type="checkbox"
                      value={jtype}
                      className="w-4 h-4"
                      onChange={(e) => filterJobs(e.target.value)}
                    />
                    <span>{jtype}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="py-2 px-4 mt-4">
            <div className="flex justify-between mb-3">
              <p
                className="flex items-center gap-2 font-semibold cursor-pointer"
                onClick={toggleExperienceDropdown}
              >
                <BsStars />
                Experience
              </p>
              <button onClick={toggleExperienceDropdown}>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>
            <div
              className={`overflow-hidden transition-max-height duration-300 ${
                isExperienceDropdownOpen ? 'max-h-32' : 'max-h-0'
              }`}
            >
              <div className="flex flex-col gap-2">
                {experience.map((exp) => (
                  <div key={exp.title} className="flex gap-3">
                    <input
                      type="checkbox"
                      value={exp?.value}
                      className="w-4 h-4"
                      onChange={(e) => filterExperience(e.target.value)}
                    />
                    <span>{exp.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="py-2 px-4 mt-4">
            <div className="flex justify-between mb-3">
              <p
                className="flex items-center gap-2 font-semibold cursor-pointer"
                onClick={toggleDropdown}
              >
                <BiBriefcaseAlt2 />
                Job Category
              </p>
              <button onClick={toggleDropdown}>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>
            {isDropdownOpen && (
              <div className="flex flex-col gap-2">
                {jobCategories.map((category, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <p className="font-semibold self-start py-2">
                      {category.category}
                    </p>
                    {category.subcategories.map((subcategory, idx) => (
                      <div
                        key={idx}
                        className="flex gap-2 text-xs md:text-base"
                      >
                        <input
                          type="checkbox"
                          value={subcategory}
                          className="w-4 h-4 ml-4"
                          onChange={(e) => filterJobs(e.target.value)}
                        />
                        <span className="text-sm self-start">
                          {subcategory}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-5/6 px-5 md:px-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm md:text-base">
              Showing: <span className="font-semibold">{recordCount}</span> Jobs
              Available
            </p>

            <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center">
              <p className="text-sm md:text-base">Sort By:</p>
              <ListBox sort={sort} setSort={setSort} />
            </div>
          </div>

          <div className="text-md font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <a
                  href="#"
                  className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-green-600 dark:hover:text-gray-300 ${
                    activeTab === 'Best Matches'
                      ? 'text-green-600 border-green-600'
                      : 'border-transparent'
                  }`}
                  onClick={() => setActiveTab('Best Matches')}
                >
                  Best Matches
                </a>
              </li>

              <li className="me-2">
                <a
                  href="#"
                  className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-green-600 dark:hover:text-gray-300 ${
                    activeTab === 'Most Recent Searches'
                      ? 'text-green-600 border-green-600'
                      : 'border-transparent'
                  }`}
                  onClick={() => setActiveTab('Most Recent Searches')}
                >
                  Most Recent Searches
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-green-600 dark:hover:text-gray-300 ${
                    activeTab === 'Saved Jobs'
                      ? 'text-green-600 border-green-600'
                      : 'border-transparent'
                  }`}
                  onClick={() => setActiveTab('Saved Jobs')}
                >
                  {`Saved Jobs (${savedJobs.length})`}
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-6 w-full flex flex-wrap gap-4">
            {activeTab === 'Best Matches' &&
              data?.map((job, index) => {
                const newJob = {
                  name: job?.company?.name,
                  logo: job?.company?.profileUrl,
                  ...job,
                }
                return (
                  <JobCard
                    job={newJob}
                    key={index}
                    onSave={handleSaveJob}
                    isSaved={savedJobs.some(
                      (savedJob) => savedJob._id === job._id,
                    )}
                  />
                )
              })}
            {activeTab === 'Saved Jobs' &&
              savedJobs.map((job, index) => (
                <JobCard
                  job={job}
                  key={index}
                  onSave={handleSaveJob}
                  isSaved={true}
                />
              ))}
          </div>

          {isFetching && (
            <div className="py-10">
              <Loading />
            </div>
          )}
          {numPage > page && !isFetching && (
            <div className="w-full flex items-center justify-center pt-16">
              <CustomButton
                onClick={handleShowMore}
                title="Load More"
                containerStyles={`text-lime-600 py-1.5 px-5 focus:outline-none hover:bg-lime-700 hover:text-white rounded-full text-base border border-lime-600`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FindJobs
