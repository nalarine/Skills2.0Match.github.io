import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { CustomButton, JobCard } from '../components'
import Loading from '../components/Loading'
import Modal from 'react-modal'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { apiRequest } from '../utils'
import { auth, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { BsArrowLeft } from 'react-icons/bs'
import location from '../../src/assets/location.png'
import { BsBalloonHeart } from 'react-icons/bs'
import { BsBalloonHeartFill } from 'react-icons/bs'
import { PiMoney } from 'react-icons/pi'
import { CgWorkAlt } from 'react-icons/cg'
import { BsPerson } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'

const JobDetail = () => {
  const { id } = useParams()
  const { user } = useSelector((state) => state.user)
  const userInfo = user

  const [isShowModal, setShowModal] = useState(false)
  const [job, setJob] = useState(null)
  const [similarJobs, setSimilarJobs] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [resume, setResume] = useState(null)
  const [isSaved, setIsSaved] = useState(false)

  const handleResume = (event) => {
    const file = event.target.files[0]
    setResume(file)
  }

  const getJobDetails = async () => {
    setIsFetching(true)
    try {
      const res = await apiRequest({
        url: `/jobs/get-job-detail/${id}`,
        method: 'GET',
      })
      if (res.data) {
        // Formatting startHiringDate and endHiringDate
        const formattedJob = {
          ...res.data,
          startHiringDate: new Date(
            res.data.startHiringDate,
          ).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          endHiringDate: new Date(res.data.endHiringDate).toLocaleDateString(
            'en-US',
            {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            },
          ),
        }
        setJob(formattedJob)
        setSimilarJobs(res.similarJobs)
      }
      setIsFetching(false)
    } catch (error) {
      console.log(error)
      setIsFetching(false)
    }
  }

  const handleDeletePost = async () => {
    if (window.confirm('Delete Job Post?')) {
      setIsFetching(true)
      try {
        const res = await apiRequest({
          url: `/jobs/delete-job/${job._id}`,
          token: user.token,
          method: 'DELETE',
        })
        if (res.success) {
          alert(res.message)
          window.location.replace('/')
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsFetching(false)
      }
    }
  }

  const handleSubmit = async () => {
    toggleModal()
    const attachmentRef = ref(storage, `resumeFiles/${user._id}/${resume.name}`)
    await uploadBytes(attachmentRef, resume)
    const url = await getDownloadURL(attachmentRef)
    try {
      const response = await apiRequest({
        url: `/jobs/apply-job/${id}`,
        token: user.token,
        method: 'PUT',
        data: {
          application: [user._id],
          attachmentURL: url,
        },
      })
      if (response.success) {
        toast.success('Job application successful.')
      } else {
        toast.error(`Job application failed. ${response.message}`)
      }
    } catch (error) {
      console.error('Error applying for job:', error)
      toast.error(`Error applying for job: ${error.message}`)
    }
  }

  const toggleModal = () => {
    setShowModal(!isShowModal)
  }

  useEffect(() => {
    if (id) {
      getJobDetails()
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }, [id])

  const handleSaveJob = () => {
    setIsSaved(!isSaved)
    if (!isSaved) {
      alert('Job saved successfully!')
      // Additional logic to save the job can be implemented here
    }
  }

  return (
    <div className="container mx-auto">
      {isFetching ? (
        <Loading />
      ) : job ? (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-2/3 px-5 py-10">
            <div className="mb-5">
              <Link
                to={
                  user?.accountType === 'seeker' ? '/Dashboard' : '/CompanyDash'
                }
                className="absolute top-0 left-0 mt-4 ml-4 flex items-center"
              >
                <button className="text-black text-sm bg-transparent px-3 py-1 rounded-md transition-colors duration-300 hover:text-white hover:bg-green-500 hover:border-transparent flex items-center">
                  <BsArrowLeft className="mr-2" />
                </button>
              </Link>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <div>
                    <p className="text-left text-slate-400">Position</p>
                    <p className="text-3xl font-bold text-green-700 text-left">
                      {job?.jobTitle}
                    </p>
                  </div>
                  <div className="ml-[50px] mt-4">
                    <p className="text-left text-slate-400">
                      <span className="text-green-700 font-bold">
                        Start Hiring Date:{' '}
                      </span>{' '}
                      {job?.startHiringDate}
                    </p>
                    <p className="text-left text-slate-400">
                      <span className="text-green-700 font-bold">
                        End Hiring Date:{' '}
                      </span>{' '}
                      {job?.endHiringDate}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={location}
                    alt="Location"
                    className="w-[25px] h-[25px] mr-2"
                  />{' '}
                  {/* Adjusted margin-right here */}
                  <p>{job?.location}</p>
                </div>
                <p className="text-slate-400">
                  Posted {moment(job?.createdAt).fromNow()}
                </p>
              </div>
              <hr className="my-4" />
              <div className="">
                <div className="text-left">
                  <p className="text-xl font-semibold mb-4">Job Description</p>
                  <p>{job?.detail[0]?.desc}</p>
                </div>
              </div>
              <hr className="my-4" />
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#bdf4c8] p-4 rounded-lg">
                  <div>
                    <span className="text-base flex items-center ml-[40px] mb-2">
                      <PiMoney className="mr-1 w-[24px] h-[24px]" />
                      Salary
                    </span>{' '}
                    {/* Icon placed directly before the text */}
                    <p className="text-lg font-semibold">
                      ₱ {job?.salary} / {job?.salaryPeriod}
                    </p>
                  </div>
                </div>
                <div className="bg-[#bae5f4] p-4 rounded-lg">
                  <span className="text-base flex items-center ml-[20px] mb-2">
                    <CgWorkAlt className="mr-1 w-[24px] h-[24px]" />
                    Job Type
                  </span>
                  <p className="text-lg font-semibold">{job?.jobType}</p>
                </div>
                <div className="bg-[#fed0ab] p-4 rounded-lg">
                  <span className="text-base flex items-center ml-[10px] mb-2">
                    <BsPerson className="mr-1 w-[24px] h-[24px]" />
                    Applicants
                  </span>
                  <p className="text-lg font-semibold">
                    {job?.application?.length}
                  </p>
                </div>
                <div className="bg-[#cecdff] p-4 rounded-lg">
                  <span className="text-base flex items-center ml-[10px] mb-2">
                    <ContentPasteIcon className="mr-1 w-[24px] h-[24px]" />
                    Vacancies
                  </span>
                  <p className="text-lg font-semibold">{job?.vacancies}</p>
                </div>
              </div>
              <hr className="my-4" />
              <div className="text-left">
                <p className="text-xl font-semibold mb-4">Requirements</p>
                <div
                  className="flex gap-2"
                  dangerouslySetInnerHTML={{
                    __html: job?.detail[0]?.requirements,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-px bg-gray-300 my-10 lg:my-0"></div>
          <div className="w-full lg:w-1/3 px-5 py-10">
            {user?._id === job?.company?._id ? (
              <>
                <a
                  href={`/upload-job/${job._id}`}
                  className="w-full flex items-center justify-center text-white bg-green-700 hover:bg-lime-500 py-3 px-5 mb-4 outline-none rounded-full text-base"
                >
                  <FiEdit className="mr-2" />
                  Edit Post
                </a>
                <CustomButton
                  title="Delete Post"
                  onClick={handleDeletePost}
                  iconLeft={<RiDeleteBin5Line />}
                  containerStyles="w-full flex items-center justify-center text-white bg-[#B91C1C] py-3 px-5 outline-none rounded-full text-base"
                />
              </>
            ) : (
              <>
                <CustomButton
                  title="Apply Now"
                  onClick={toggleModal}
                  containerStyles="w-full flex items-center justify-center text-white bg-green-700 hover:bg-lime-400 hover:text-green-900 hover:font-bold py-3 px-5 outline-none rounded-full text-lg"
                />
                <button
                  onClick={handleSaveJob}
                  className={`w-full flex items-center justify-center text-green-700 ${
                    isSaved
                      ? 'bg-lime-400 text-white'
                      : 'border border-green-700 hover:bg-green-700 hover:text-white'
                  } py-3 px-5 mt-4 outline-none rounded-full text-lg`}
                >
                  {isSaved ? (
                    <BsBalloonHeartFill className="mr-2 w-8 h-8" />
                  ) : (
                    <BsBalloonHeart className="mr-2 w-8 h-8" />
                  )}
                  <span>{isSaved ? 'Saved' : 'Save Job'}</span>
                </button>
              </>
            )}
            <div className="text-left">
              <div className="mb-6 mt-6 flex flex-col">
                <img
                  src={job?.company?.profileUrl}
                  alt={job?.company?.name}
                  className="w-28 h-28 rounded mb-2"
                />
                <p className="text-xl text-lime-600 font-semibold">
                  {job?.company?.name}
                </p>
                <span className="text-base">{job?.company?.location}</span>
                <span className="text-sm">{job?.company?.email}</span>
              </div>
              <div className="mt-10">
                <p className="text-xl font-semibold">About Company</p>
                <p>{job?.company?.about}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl">Job not found.</p>
      )}
      <div className="w-full p-5 mt-10">
        <p className="text-gray-500 font-semibold mb-8 text-left text-3xl">
          Similar Job Posts
        </p>
        <div className="w-full flex flex-wrap gap-4">
          {similarJobs?.slice(0, 6).map((job, index) => (
            <JobCard
              key={index}
              job={{
                name: job.company.name,
                logo: job.company.profileUrl,
                ...job,
              }}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
      <Modal
        isOpen={isShowModal}
        onRequestClose={toggleModal}
        className="fixed inset-0 z-50 overflow-y-auto"
        overlayClassName="fixed inset-0 custom-overlay"
      >
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white p-10 rounded-lg shadow-md w-[50%] relative items-center">
            <h1 className="text-3xl font-bold mb-4">Application Details</h1>
            <hr className="mb-4" />
            <div className="flex">
              <p className="text-lg font-bold mr-4 mt-2">Name: </p>
              <p className="mb-4 text-xl bg-slate-200 p-2 rounded-lg ml-1">
                {userInfo.firstName + ' ' + userInfo.lastName}
              </p>
            </div>

            <div className="flex">
              <p className="text-lg font-bold mr-4 mt-2">E-mail: </p>
              <p className="mb-4 text-xl bg-slate-200 p-2 rounded-lg">
                {userInfo.email}
              </p>
            </div>

            {/* <p className="block text-lg font-medium">Location: </p>
                    <p className="mb-4">{userInfo.location}</p> */}

            {/* <p className="block text-lg font-medium">Job Title: </p>
                    <p className="mb-4">{userInfo.jobTitle}</p> */}

            <p className="text-lg font-bold mr-4 mt-2 mb-2">Attach Resume</p>
            <input
              id="resumeUpload"
              type="file"
              class="block mb-4 w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              hover:file:bg-violet-100"
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
              onChange={handleResume}
            />
            <p class="mb-8 text-sm text-gray-600">
              Please ensure your resume is in DOC, DOCX, or PDF format.
            </p>
            <div className="flex justify-between">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-green-700 hover:bg-lime-600 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default JobDetail
