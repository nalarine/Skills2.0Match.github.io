import { useEffect, useState } from "react";
import { Linkedin } from "../assets";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useParams, Link } from "react-router-dom";
import { jobs } from "../utils/data";
import { CustomButton, JobCard } from "../components";
import { useSelector } from "react-redux";
import { apiRequest } from "../utils";
import Loading from "../components/Loading";
import { BsArrowLeft } from "react-icons/bs";
import Modal from "react-modal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const JobDetail = () => {
  const { id } = useParams();

  const { user } = useSelector((state) => state.user);

  const userInfo = user;

  const [isShowModal, setShowModal] = useState(false);

  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [selected, setSelected] = useState("0");
  const [isFetching, setIsFetching] = useState (false);
  const [resume, setResume] = useState(null);

  const handleResume = (event) => {
    const file = event.target.files[0];
    setResume(file);
  };

  const getJobDetails = async () => {

    setIsFetching(true);

    try {
      const res = await apiRequest({
        url: "/jobs/get-job-detail/" + id,
        method: "GET",
      });

      setJob(res?.data);
      setSimilarJobs(res?.similarJobs);
      setIsFetching(false);

    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };


  const handleDeletePost = async () => { 
    setIsFetching(true);
  try {
    if (window.confirm("Delete Job Post?")) {
      const res = await apiRequest({
       url: "/jobs/delete-job/" + job?._id,
       token: user?.token,
       method: "DELETE",
    });

      if (res?.success) {
        alert(res?.message);
        window.location.replace("/");
      }
    }
      setIsFetching(false);
    
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    // alert("success");
    // console.log(job)
    toggleModal();
    const attachmentRef = ref(storage, "resumeFiles/" + user._id + resume.name);
    const upload = await uploadBytes(attachmentRef, resume);
    const url = await getDownloadURL(attachmentRef);
    try {
      const response = await apiRequest({
        url: `/jobs/apply-job/${id}`,
        token: user?.token,
        method: "PUT",
        data: {
          application: [ user._id ],
          attachmentURL: url
        }
      });
      // Display toast notification for successful job application
      if (response.success)
        toast.success("Job application successful.");
      else
        toast.error(`Job application failed. ${ response.message }`);
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error("Error applying for job:", error);
    }
  }

  // function for modal
  const toggleModal = () => {
    setShowModal(!isShowModal);
  };

  const modalApplyNow= () => {
    toggleModal();
  };

  useEffect(() => {
    id && getJobDetails();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  return (
    <div className='container mx-auto'>
      <div className='w-full flex flex-col md:flex-row gap-10'>

        <Link to="/CompanyDash" className="absolute top-0 left-0 mt-4 ml-4 flex items-center">
          <button className="text-black text-sm bg-transparent border border-black px-3 py-1 rounded-md transition-colors duration-300 hover:text-white hover:bg-green-500 hover:border-transparent flex items-center">
            <BsArrowLeft className="mr-2" />
            Back
          </button>
        </Link>
        
        {/* LEFT SIDE */}
        {isFetching ? (
          <Loading />
        ) : (
        <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
          <div className='w-full flex items-center justify-between'>
            <div className='w-3/4 flex gap-2'>
              <img
                src={job?.company?.profileUrl}
                alt={job?.company?.name}
                className='w-20 h-20 md:w-20 md:h-20 rounded'
              />

              <div className='flex flex-col'>
                <p className='text-xl font-semibold text-gray-600'>
                  {job?.jobTitle}
                </p>

                <span className='text-base'>{job?.location}</span>

                <span className='text-base text-lime-600'>
                  {job?.company?.name}
                </span>

                <span className='text-gray-500 text-sm'>
                  {moment(job?.createdAt).fromNow()}
                </span>
              </div>
            </div>

            <div className=''>
              <AiOutlineSafetyCertificate className='text-3xl text-lime-500' />
            </div>
          </div>

          <div className='w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10'>
            <div className='bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>Salary</span>
              <p className='text-lg font-semibold text-gray-700'>
                ₱ {job?.salary} / {job?.salaryPeriod}
              </p>
            </div>

            <div className='bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>Job Type</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.jobType}
              </p>
            </div>

            <div className='bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>No. of Applicants</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.application?.length}
              </p>
            </div>

            <div className='bg-[#cecdff] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>No. of Vacancies</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.vacancies}
              </p>
            </div>
          </div>

          <div className='w-full flex gap-4 py-5'>
            <CustomButton
              onClick={() => setSelected("0")}
              title='Job Description'
              containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${
                selected === "0"
                  ? "bg-[#86CA16] text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            />

            <CustomButton
              onClick={() => setSelected("1")}
              title='Company'
              containerStyles={`w-full flex items-center justify-center  py-3 px-5 outline-none rounded-full text-sm ${
                selected === "1"
                  ? "bg-[#86CA16] text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            />
          </div>

          <div className='my-6'>
            {selected === "0" ? (
              <>
                <p className='text-xl font-semibold'>Job Description</p>

                <span className='text-base'>{job?.detail[0]?.desc}</span>

                {job?.detail[0]?.requirements && (
                  <>
                    <p className='text-xl font-semibold mt-8'>Requirement</p>
                    <span className='text-base' dangerouslySetInnerHTML={{ __html: job?.detail[0]?.requirements}}>
                      {/* {job?.detail[0]?.requirements} */}
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                <div className='mb-6 flex flex-col'>
                  <p className='text-xl text-lime-600 font-semibold'>
                    {job?.company?.name}
                  </p>
                  <span className='text-base'>{job?.company?.location}</span>
                  <span className='text-sm'>{job?.company?.email}</span>
                </div>

                <p className='text-xl font-semibold'>About Company</p>
                <span>{job?.company?.about}</span>
              </>
            )}
          </div>

          <div className='w-full'>
            {user?._id === job?.company?._id ? (
              <CustomButton
              title='Delete Post'
              onClick={handleDeletePost}
              containerStyles={`w-full flex items-center justify-center text-white bg-[#B91C1C] py-3 px-5 outline-none rounded-full text-base`}
            />
            ) : (
              <CustomButton
              title='Apply Now'
              onClick={modalApplyNow}
              containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
            />
             )}

            <Modal
              isOpen={isShowModal}
              onRequestClose={toggleModal}
              className="fixed inset-0 z-50 overflow-y-auto"
              overlayClassName="fixed inset-0 custom-overlay"
            >
              <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="bg-white p-10 rounded-lg shadow-md w-1/4 relative items-center">
                    <h1 className="text-3xl font-bold mb-10">Details</h1>
                    <p className="block text-lg font-medium">Name: </p>
                    <p className="mb-4">{userInfo.firstName + " " + userInfo.lastName}</p>

                    <p className="block text-lg font-medium">E-mail: </p>
                    <p className="mb-4">{userInfo.email}</p>

                    <p className="block text-lg font-medium">Location: </p>
                    <p className="mb-4">{userInfo.location}</p>

                    <p className="block text-lg font-medium">Job Title: </p>
                    <p className="mb-4">{userInfo.jobTitle}</p>

                    <p className="block text-lg font-medium">Attach Resume</p>
                    <input type="file" class="block mb-12 w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        hover:file:bg-violet-100"
                        onChange={handleResume}
                    />
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                        >
                            Submit
                        </button>
                    </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        )}

        {/* RIGHT SIDE */}
        <div className='w-full md:w-1/3 2xl:w-2/4 p-5 mt-20 md:mt-0'>
          <p className='text-gray-500 font-semibold'>Similar Job Post</p>

          <div className='w-full flex flex-wrap gap-4'>
            {similarJobs?.slice(0, 6).map((job, index) => {

              const data = {
                name: job?.company?.name,
                logo: job?.company?.profileUrl,
                ...job,
              };
              return <JobCard job={data} key={index} />;
            })}
          </div>
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default JobDetail;
