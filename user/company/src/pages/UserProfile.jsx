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

const UserForm = ({ open, setOpen, user, profileUrl }) => {
  const dispatch = useDispatch()
  const [profileImage, setProfileImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])
  const [skills, setSkills] = useState([]) // Add state for skills
  const [skillError, setSkillError] = useState('') // Add state for skill error
  const [skillInput, setSkillInput] = useState('') // State for the skill input

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
      // Initialize skills state from user data
      setSkills(user.skills ? user.skills.split(' ').slice(0, 10) : [])
    }
  }, [user, setValue])

  // useEffect(() => {
  //   const updateSkills = async () => {
  //     const resultAssessment = localStorage.getItem('resultAssessment')
  //     if (resultAssessment) {
  //       try {
  //         const upSkill = `${resultAssessment}\n${user.skills}`

  //         const newData = {
  //           ...user,
  //           profileUrl,
  //           skills: upSkill,
  //         }

  //         const res = await apiRequest({
  //           url: '/users/update-user',
  //           token: user.token,
  //           data: newData,
  //           method: 'PUT',
  //         })

  //         console.log(res)
  //         console.log(newData)

  //         const getUser = async () => {
  //           const resUser = await apiRequest({
  //             url: '/users/get-user',
  //             token: user?.token,
  //             method: 'GET',
  //           })
  //           const updatedUserInfo = { token: user?.token, ...resUser?.user }
  //           console.log(updatedUserInfo)
  //           dispatch(Login(updatedUserInfo))
  //         }

  //         if (res) {
  //           getUser()
  //           setOpen(false)
  //         }
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //   }

  //   updateSkills()
  //   localStorage.removeItem('resultAssessment')
  // }, [])

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
        // const profileImageData = new FormData()
        // profileImageData.append('file', profileImage)
        // const response = await handleFileUpload(profileImageData)
        // profileUrl = response.data.url
        const response = await handleFileUpload(profileImage)
        profileUrl = response
      }

      // Construct data with updated profileUrl and resumeUrl
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

      console.log(res)
      console.log(newData)
      const getUser = async () => {
        const resUser = await apiRequest({
          url: '/users/get-user',
          token: user?.token,
          method: 'GET',
        })
        const updatedUserInfo = { token: user?.token, ...resUser?.user }
        console.log(updatedUserInfo)
        dispatch(Login(updatedUserInfo)) // Update user state in Redux
      }

      if (res) {
        // If the request is successful, update user state in Redux store
        // dispatch(Login(res.user)) // Update user state in Redux
        getUser()
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

    // if (file.status === 'done' && file.originFileObj) {
    //   const imageFile = file.originFileObj;
    //   const imageUrl = URL.createObjectURL(imageFile);
    //   console.log('Image URL:', imageUrl);

    //   setProfileImage(imageFile);
    //   handlePreview(imageFile);
    // }

    setProfileImage(file)
  }

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)

  const handleResumeChange = async (info) => {
    const { status, response } = info.file
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-screen max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Edit Profile
                  </Dialog.Title>
                  <form
                    className="w-full mt-2 flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="w-full flex gap-2">
                      <div className="w-1/2">
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
                      </div>
                      <div className="w-1/2">
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
                    </div>

                    <div className="w-full flex gap-2">
                      <div className="w-1/2">
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
                      </div>

                      <div className="w-1/2">
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
                    </div>
                    {/* Profile Picture */}
                    <div className="w-full flex gap-2 text-sm">
                      <div className="w-1/2">
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
                          accept="image/jpeg, image/png" // Restrict files to JPEG and PNG formats
                        >
                          {fileList.length >= 1 ? null : (
                            <button
                              style={{
                                border: 0,
                                background: 'none',
                              }}
                              type="button"
                            >
                              <PlusOutlined />
                              <div
                                style={{
                                  marginTop: 8,
                                }}
                              >
                                Upload
                              </div>
                            </button>
                          )}
                        </Upload>
                      </div>

                      {/* Resume */}
                      {/* <div className="flex w-1/2">
                        <label className="text-gray-600 text-sm mb-1">
                          Resume
                        </label>
                        <Upload
                          name="file"
                          multiple={false}
                          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                          onChange={handleResumeChange}
                        >
                          <button
                            style={{
                              border: 0,
                            }}
                            type="button"
                            className="outline-dashed outline-1 outline-offset-2 outline-gray-200 hover:outline-green-500 bg-gray-100 px-8 mt-8 w-full"
                          >
                            <InboxOutlined className="text-green-600 text-2xl pt-2" />
                            <div
                              style={{
                                marginTop: 8,
                              }}
                            >
                              Upload
                            </div>
                          </button>
                        </Upload>
                      </div> */}
                    </div>

                    <div className="flex flex-col">
                    <label className="text-gray-600 text-sm mb-1">
                        Skills
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Type a skill and press Enter"
                        value={skillInput}
                        onChange={handleSkillInputChange}
                        onKeyDown={handleSkillKeyDown}
                      />
                      {skillError && (
                        <p className="text-red-500 text-xs mt-1">{skillError}</p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2"
                          >
                            <span className="text-sm">{skill}</span>
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="text-red-500"
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
                        className="rounded border border-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-base px-4 py-2 resize-none"
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

                    {/* Submit button */}
                    <div className="mt-4">
                      {isSubmitting ? (
                        <Loading />
                      ) : (
                        <CustomButton
                          type="submit"
                          containerStyles="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                          title={'Submit'}
                        />
                      )}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* Preview Modal */}
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
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const [open, setOpen] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [resumeUrl, setResumeUrl] = useState(null) // Define resumeUrl state
  const [isEmailVerified, setIsEmailVerified] = useState(false)

  const getUser = async () => {
    const res = await apiRequest({
      url: '/users/get-user',
      token: user?.token,
      method: 'GET',
    })
    const updatedUserInfo = { token: user?.token, ...res?.user }
    setUserInfo(updatedUserInfo)
    setIsEmailVerified(updatedUserInfo?.emailVerified) // Set email verification status
    dispatch(Login(updatedUserInfo))
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      setUserInfo(user)
    }
  }, [user])

  return (
    <div className="container mx-auto flex items-center justify-center pt-10 pb-24 bg-green-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="bg-slate-100 p-6 pb-2 rounded-lg flex flex-col items-center overflow-hidden">
          <div>
            <img
              src={userInfo?.profileUrl || userInfo?.NoProfile}
              alt={userInfo?.firstName}
              className="w-full h-48 object-contain rounded-lg mb-4"
            />
            <h1 className="text-2xl font-semibold text-slate-600 flex items-center">
              {userInfo?.firstName + ' ' + userInfo?.lastName}
              {isEmailVerified && ( // Render verified icon if email is verified
                <span className="ml-2">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGElEQVR4nO2W3U9ScRzG2dwaL5mCYAio2NaW11w0t7TxYmb4iqCCJghsttTavOOmNVTESpQIEeUgpFM84tra7GWzf6GXtS66aqs711ZNGFfwbb+jkA6OHA7rzucePnu+5znPcxiMM1GQeMcqqYkYxyWbQ2PitQEJ439Jgo+Ia3CrrC4yrKrdMs1WR0yJ6k0jVG8MgXh9MCFaG3CKwgZVVcggk4R04uKJuK6kbscakm5bUlLcDLVbw1ATMUEaKlm/DeK1QRA9HwBR2ABVq3oQYv0pYaAviH5Lm1sXtdikUQtQhgb7QYj1wcVALwj8Whst6KXoyGVp1BKjA61c1gF/qSfG92kuF3beqMUm3TbH6UIFfi0IlnqgYlET53m7bJTOTjxTmuc9DuX7NFDh7Qbesy7gejqxvOktKEi5oD4N8Bf/QXmeTuA+bU/yXd1VpOBa3NxQFNSrAetLJ5heOIDn7jyCdkD5Qjtw59saSMHSiLmpGOjEWw+kIAXJVAp0+APgug+h5fNtUO5SN5I73jLN5oSGqUORfiUO4GrgTgZa5lJD6ZNWJ2kNHm+kNFSM6WFizwv12DBl6PXV8UOXR9ALc7eg9HFrgjWnzm411L1ZToMGwD7uEn/4Zf8bXFkx0YVC6aObwHHeGMtO9IZxPOuZYvoMOANfHqIFPT/bkhuMVgYVflaQlnoh/OlNBv7153eo9xvh/ms3ESKk34kDkIfu5YMmWFOK3ANCrEyO9Ap9Wtj8vJeB//izX6hTYDmaZ0hTLQwZmsjSW+nRQOjDqwy8AKfAdjQDc1pB/jqJwvqG02pQ4O6C1fe7BUPZ0ypgOpTkBYJGnNjTU7qXv9ABD99hcC14lzKUNaVIsqcaySuTOHegL3ha4RM16EbF0E4RqgTmpHyFkVe4rgSNON+vjeeEHnUvRadxpl1ObRbTQiNesdgdow2dVMTO2VUFfAgcExpxek6VQDilLVxXgkYc7WkB500y7fJAUR97aaERL3OrZWUutQqtDCr8E4003ezkTCpVbLtclje9xQitDGemZZQz0zxKWoNnYpzUXzW9KCUUY2u8AAAAAElFTkSuQmCC"
                    alt="Verified Icon"
                  />
                </span>
              )}
            </h1>
            <h5 className="text-green-900 text-lg font-bold mb-4 mt-4">
              Applicant
            </h5>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4">
          {/* Upper Right */}
          <div className="bg-slate-50 p-6 rounded-lg h-auto overflow-hidden max-w-md">
            <div className="flex gap-1 items-center justify-start px-3 py-1 text-sm text-slate-600">
              <HiLocationMarker size={24} className="text-green-800" />
              <p className="pl-2 text-lg">
                {userInfo?.location ?? 'No Location'}
              </p>
            </div>
            <div className="flex gap-1 items-center justify-start px-3 py-1 text-sm text-slate-600">
              <AiOutlineMail size={24} className="text-green-800" />
              <p className="pl-2 text-lg">{userInfo?.email ?? 'No Email'}</p>
            </div>
            <div className="flex gap-1 items-center justify-start px-3 py-1 pb-4 text-sm text-slate-600">
              <FiPhoneCall size={24} className="text-green-800" />
              <p className="pl-2 text-lg">
                {userInfo?.contact ?? 'No Contact'}
              </p>
            </div>

            <p className="text-green-600 font-bold text-lg text-left">SKILLS</p>
            <div className="flex flex-wrap">
              <p className="text-base text-left leading-7 px-3 py-2 text-sm text-slate-600 flex flex-wrap">
              {userInfo?.skills
              ? userInfo.skills.split(' ').map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {skill.trim()}
                  </span>
                ))
              : 'No Skills Indicated'}
              </p>
            </div>

            <p className="text-green-600 font-bold text-lg text-left">ABOUT</p>
            <div className="overflow-y-auto max-h-40">
              <p className="text-base text-left leading-7 px-3 py-2 text-sm text-slate-600">
                {userInfo?.about ?? 'No About Found'}
              </p>
            </div>
          </div>

          {/* Lower Right */}
          <button
            className="bg-green-600 text-white py-2 px-44 rounded hover:bg-[#86EFAC] hover:text-[#15803D] focus:outline-none self-start mt-4"
            onClick={() => setOpen(true)}
          >
            Edit Profile
          </button>

          {/* {resumeUrl && (
            <div className="flex items-center justify-center">
              <a
                href={resumeUrl}
                download="resume.pdf"
                className="flex items-center bg-green-600 text-white py-2 px-4 rounded hover:bg-[#86EFAC] hover:text-[#15803D] focus:outline-none self-start mt-4"
              >
                <DownloadOutlined className="mr-2" />
                Download Resume
              </a>
            </div>
          )} */}
        </div>
      </div>
      <UserForm
        open={open}
        setOpen={setOpen}
        user={user}
        profileUrl={userInfo?.profileUrl}
      />
    </div>
  )
}

export default UserProfile