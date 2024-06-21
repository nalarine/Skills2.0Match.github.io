import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { HiLocationMarker } from 'react-icons/hi'
import { AiOutlineMail } from 'react-icons/ai'
import { FiPhoneCall } from 'react-icons/fi'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { CustomButton, TextInput, Loading } from '../components'
import { handleFileUpload } from '../utils'
import { apiRequest } from '../utils'
import { Login } from '../redux/userSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const UserForm = ({ open, setOpen, user, profileUrl }) => {
  const dispatch = useDispatch()
  const [profileImage, setProfileImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])
  const [skills, setSkills] = useState([])
  const [skillError, setSkillError] = useState('')
  const [skillInput, setSkillInput] = useState('')

  const handleCancel = () => setPreviewOpen(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const closeModal = () => setOpen(false)

  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([key, value]) => {
        setValue(key, value)
      })
      setSkills(user.skills ? user.skills.split(' ').slice(0, 10) : [])
    }
  }, [user, setValue])

  const onSubmit = async (data) => {
    if (skills.length < 5) {
      setSkillError('You must enter at least 5 skills')
      setIsSubmitting(false)
      return
    } else if (skills.length > 10) {
      setSkillError('You can enter a maximum of 10 skills')
      setIsSubmitting(false)
      return
    }
    setIsSubmitting(true)
    try {
      if (profileImage) {
        const response = await handleFileUpload(profileImage)
        profileUrl = response
      }

      const newData = {
        ...data,
        profileUrl,
        skills: skills.join(' '),
      }
      const res = await apiRequest({
        url: '/users/update-user',
        token: user.token,
        data: newData,
        method: 'PUT',
      })

      const getUser = async () => {
        const resUser = await apiRequest({
          url: '/users/get-user',
          token: user?.token,
          method: 'GET',
        })
        const updatedUserInfo = { token: user?.token, ...resUser?.user }
        dispatch(Login(updatedUserInfo))
      }

      if (res) {
        getUser()
        MySwal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully!',
        })
        setOpen(false)
      }
      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
      console.log(error)
    }
  }

  const handleProfileImageChange = async (info) => {
    const { file, fileList } = info
    setFileList(fileList)
    setProfileImage(file)
  }

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    )
  }

  const handleSkillInputChange = (event) => {
    setSkillInput(event.target.value)
  }

  const handleSkillKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const newSkill = skillInput.trim()
      if (newSkill && !skills.includes(newSkill)) {
        setSkills([...skills, newSkill])
        setSkillInput('')
        setSkillError('')
      }
    }
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  return (
    <>
      <Transition appear show={open ?? false} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-gray-900"
                  >
                    Edit Profile
                  </Dialog.Title>
                  <form
                    className="w-full mt-4 flex flex-col gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <TextInput
                        name="firstName"
                        label="First Name"
                        placeholder="James"
                        type="text"
                        register={register('firstName', {
                          required: 'First Name is required',
                        })}
                        error={
                          errors.firstName ? errors.firstName?.message : ''
                        }
                      />
                      <TextInput
                        name="lastName"
                        label="Last Name"
                        placeholder="Wagonner"
                        type="text"
                        register={register('lastName', {
                          required: 'Last Name is required',
                        })}
                        error={
                          errors.lastName ? errors.lastName?.message : ''
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <TextInput
                        name="contact"
                        label="Contact"
                        placeholder="Phone Number"
                        type="text"
                        register={register('contact', {
                          required: 'Contact is required!',
                        })}
                        error={errors.contact ? errors.contact?.message : ''}
                      />
                      <TextInput
                        name="location"
                        label="Location"
                        placeholder="Location"
                        type="text"
                        register={register('location', {
                          required: 'Location is required',
                        })}
                        error={
                          errors.location ? errors.location?.message : ''
                        }
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-600 text-sm mb-1">
                        Profile Picture
                      </label>
                      <Upload
                        action=""
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleProfileImageChange}
                        beforeUpload={() => false}
                        accept="image/jpeg, image/png"
                      >
                        {fileList.length >= 1 ? null : (
                          <div className="flex flex-col items-center justify-center">
                            <PlusOutlined />
                            <div className="mt-2">Upload</div>
                          </div>
                        )}
                      </Upload>
                    </div>

                    <div className="flex flex-col space-y-4">
          <label className="text-gray-600 text-sm">Skills</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 text-sm"
              placeholder="Type a skill and press Enter"
              onChange={handleSkillInputChange}
              onKeyDown={handleSkillKeyDown}
            />
            {skillError && (
              <Tooltip id="skill-error-tooltip" effect="solid" place="top">
                <span className="absolute top-full text-red-500 text-xs mt-1">{skillError}</span>
              </Tooltip>
            )}
          </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-green-200 rounded-full px-3 py-1 flex items-center gap-2"
          >
            <span className="text-sm">{skill}</span>
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="text-red-500 focus:outline-none hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>



                    <div className="flex flex-col">
                      <label className="text-gray-600 text-sm mb-1">
                        About
                      </label>
                      <textarea
                        className="rounded border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-base px-4 py-2 resize-none"
                        rows={4}
                        cols={6}
                        {...register('about', {
                          required:
                            'Write a little bit about yourself and your projects',
                        })}
                        aria-invalid={errors.about ? 'true' : 'false'}
                      ></textarea>
                      {errors.about && (
                        <span
                          role="alert"
                          className="text-xs text-red-500 mt-0.5"
                        >
                          {errors.about?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-center mt-6">
                  <div className="flex gap-4">
                    <CustomButton
                      type="submit"
                      containerStyles="inline-flex justify-center items-center rounded-md border border-transparent bg-green-600 hover:bg-green-700 focus:outline-none px-4 py-2 text-sm font-medium text-white shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                      title="Submit"
                    />
                    {isSubmitting ? (
                      <Loading />
                    ) : (
                      <CustomButton
                        type="button"
                        onClick={closeModal}
                        containerStyles="inline-flex justify-center items-center rounded-md border border-transparent bg-red-600 hover:bg-red-700 focus:outline-none px-4 py-2 text-sm font-medium text-white shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        title="Cancel"
                      />
                    )}
                  </div>
                </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Modal
        visible={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  )
}


const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const getUser = async () => {
    const res = await apiRequest({
      url: '/users/get-user',
      token: user?.token,
      method: 'GET',
    });
    const updatedUserInfo = { token: user?.token, ...res?.user };
    setUserInfo(updatedUserInfo);
    setIsEmailVerified(updatedUserInfo?.emailVerified);
    dispatch(Login(updatedUserInfo));
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user]);

  return (
    <div className="container mx-auto pt-10 pb-24 px-6 bg-gradient-to-r from-green-200 to-blue-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg space-y-6">
         {/* Profile Header */}
         <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <img
              src={userInfo?.profileUrl || userInfo?.NoProfile}
              alt={userInfo?.firstName}
              className="w-40 h-40 object-cover rounded-full border-4 border-green-600 shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center text-center md:text-left mt-12">
            <h1 className="text-3xl font-bold text-gray-800">
              {userInfo?.firstName + ' ' + userInfo?.lastName}
              {isEmailVerified && (
                <span className="ml-2 inline-block">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGElEQVR4nO2W3U9ScRzG2dwaL5mCYAio2NaW11w0t7TxYmb4iqCCJghsttTavOOmNVTESpQIEeUgpFM84tra7GWzf6GXtS66aqs711ZNGFfwbb+jkA6OHA7rzucePnu+5znPcxiMM1GQeMcqqYkYxyWbQ2PitQEJ439Jgo+Ia3CrrC4yrKrdMs1WR0yJ6k0jVG8MgXh9MCFaG3CKwgZVVcggk4R04uKJuK6kbscakm5bUlLcDLVbw1ATMUEaKlm/DeK1QRA9HwBR2ABVq3oQYv0pYaAviH5Lm1sXtdikUQtQhgb7QYj1wcVALwj8Whst6KXoyGVp1BKjA61c1gF/qSfG92kuF3beqMUm3TbH6UIFfi0IlnqgYlET53m7bJTOTjxTmuc9DuX7NFDh7Qbesy7gejqxvOktKEi5oD4N8Bf/QXmeTuA+bU/yXd1VpOBa3NxQFNSrAetLJ5heOIDn7jyCdkD5Qjtw59saSMHSiLmpGOjEWw+kIAXJVAp0+APgug+h5fNtUO5SN5I73jLN5oSGqUORfiUO4GrgTgZa5lJD6ZNWJ2kNHm+kNFSM6WFizwv12DBl6PXV8UOXR9ALc7eg9HFrgjWnzm411L1ZToMGwD7uEn/4Zf8bXFkx0YVC6aObwHHeGMtO9IZxPOuZYvoMOANfHqIFPT/bkhuMVgYVflaQlnoh/OlNBv7153eo9xvh/ms3ESKk34kDkIfu5YMmWFOK3ANCrEyO9Ap9Wtj8vJeB//izX6hTYDmaZ0hTLQwZmsjSW+nRQOjDqwy8AKfAdjQDc1pB/jqJwvqG02pQ4O6C1fe7BUPZ0ypgOpTkBYJGnNjTU7qXv9ABD99hcC14lzKUNaVIsqcaySuTOHegL3ha4RM16EbF0E4RqgTmpHyFkVe4rgSNON+vjeeEHnUvRadxpl1ObRbTQiNesdgdow2dVMTO2VUFfAgcExpxek6VQDilLVxXgkYc7WkB500y7fJAUR97aaERL3OrZWUutQqtDCr8E4003ezkTCpVbLtclje9xQitDGemZZQz0zxKWoNnYpzUXzW9KCUUY2u8AAAAAElFTkSuQmCC"
                    alt="Verified Icon"
                    className="w-6 h-6"
                  />
                </span>
              )}
            </h1>
            <p className="text-green-800 text-xl font-medium mt-1">Applicant</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
          <div className="flex flex-wrap items-center justify-center space-x-6">
            <div className="flex items-center mb-2 md:mb-0 bg-green-50 border border-dashed border-emerald-400 rounded-full p-2">
              <HiLocationMarker size={24} className="text-green-800 mr-2" />
              <p className="text-lg text-gray-700">{userInfo?.location ?? 'No Location'}</p>
            </div>
            <div className="flex items-center mb-2 md:mb-0 bg-green-50 border border-dashed border-emerald-400 rounded-full p-2">
              <AiOutlineMail size={24} className="text-green-800 mr-2" />
              <p className="text-lg text-gray-700">{userInfo?.email ?? 'No Email'}</p>
            </div>
            <div className="flex items-center mb-2 md:mb-0 bg-green-50 border border-dashed border-emerald-400 rounded-full p-2">
              <FiPhoneCall size={24} className="text-green-800 mr-2" />
              <p className="text-lg text-gray-700">{userInfo?.contact ?? 'No Contact'}</p>
            </div>
          </div>
        </div>


        {/* Skills & About */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <div className="flex-1 bg-green-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
            <div className="flex flex-wrap">
              {userInfo?.skills
                ? userInfo.skills.split(' ').map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {skill.trim()}
                    </span>
                  ))
                : 'No Skills Indicated'}
            </div>
          </div>

          <div className="flex-1 bg-green-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
            <div className="overflow-y-auto max-h-40">
              <p className="text-base leading-7 text-gray-700">
                {userInfo?.about ?? 'No About Found'}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          <button
            className="bg-green-600 text-white py-2 px-8 rounded-lg hover:bg-green-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setOpen(true)}
          >
            Edit Profile
          </button>

          {resumeUrl && (
            <a
              href={resumeUrl}
              download="resume.pdf"
              className="flex items-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 mt-4 md:mt-0"
            >
              <DownloadOutlined className="mr-2" />
              Download Resume
            </a>
          )}
        </div>
      </div>
      <UserForm
        open={open}
        setOpen={setOpen}
        user={user}
        profileUrl={userInfo?.profileUrl}
      />
    </div>
  );
};

export default UserProfile;