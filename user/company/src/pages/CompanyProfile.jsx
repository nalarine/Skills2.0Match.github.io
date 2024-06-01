import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { HiLocationMarker } from 'react-icons/hi'
import { AiOutlineMail } from 'react-icons/ai'
import { FiPhoneCall, FiEdit, FiUpload } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import { companies, jobs } from '../utils/data'
import { CustomButton, JobCard, Loading, TextInput } from '../components'
import { handleFileUpload } from '../utils'
import { apiRequest } from '../utils'
import { Login } from '../redux/userSlice'

const CompnayForm = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { ...user },
  })

  const [fileList, setFileList] = useState([])
  const [previewImage, setPreviewImage] = useState('')
  const dispatch = useDispatch()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewTitle, setPreviewTitle] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [uploadCv, setUploadCv] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState({ status: false, message: '' })

  const handleCancel = () => setPreviewOpen(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    setErrMsg(null)

    const uri = profileImage && (await handleFileUpload(profileImage))

    const newData = uri ? { ...data, profileUrl: uri } : data

    try {
      const res = await apiRequest({
        url: '/companies/update-company',
        token: user?.token,
        data: newData,
        method: 'PUT',
      })
      setIsLoading(false)

      if (res.status === 'failed') {
        setErrMsg({ status: 'success', message: res.message })
        const newData = { token: res?.token, ...res?.user }
        dispatch(Login(data))
        localStorage.setItem('userInfo', JSON.stringify(data))

        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const closeModal = () => setOpen(false)

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

  return (
    <>
      <Transition appear show={open ?? false} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Edit Company Profile
                  </Dialog.Title>

                  <form
                    className="w-full mt-2 flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <TextInput
                      name="name"
                      label="Company Name"
                      type="text"
                      register={register('name', {
                        required: 'Compnay Name is required',
                      })}
                      error={errors.name ? errors.name?.message : ''}
                    />

                    <TextInput
                      name="location"
                      label="Location/Address"
                      placeholder="eg. Manila"
                      type="text"
                      register={register('location', {
                        required: 'Address is required',
                      })}
                      error={errors.location ? errors.location?.message : ''}
                    />

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
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-600 text-sm mb-1">
                        About Company
                      </label>
                      <textarea
                        className="ounded border border-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-base px-4 py-2 resize-none"
                        rows={4}
                        cols={6}
                        {...register('about', {
                          required: 'Write a little bit about your company.',
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

                    <div className="mt-4">
                      {isLoading ? (
                        <Loading />
                      ) : (
                        <CustomButton
                          type="submit"
                          containerStyles="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#86CA16] hover:text-white focus:outline-none "
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

const CompanyProfile = () => {
  const params = useParams()
  const { user } = useSelector((state) => state.user)
  const [info, setInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [openForm, setOpenForm] = useState(false)

  const fetchCompany = async () => {
    setIsLoading(true)
    let id = null

    if (params.id && params.id !== undefined) {
      id = params?.id
    } else {
      id = user?._id
    }

    try {
      const res = await apiRequest({
        url: '/companies/get-company/' + id,
        method: 'GET',
      })

      setInfo(res?.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCompany()
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container mx-auto p-5">
      <div className="">
        <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
          <h2 className="text-gray-600 text-xl font-semibold">
            Welcome, {info?.name}
          </h2>

          {user?.user?.accountType === undefined && info?._id === user?._id && (
            <div className="flex items-center justifu-center py-5 md:py-0 gap-4">
              <CustomButton
                onClick={() => setOpenForm(true)}
                title="Edit Profile"
                iconRight={<FiEdit />}
                containerStyles={`py-1.5 px-3 md:px-5 focus:outline-none bg-green-600  hover:bg-green-700 text-white rounded text-sm md:text-base border border-green-600`}
              />

              <Link to="/upload-job">
                <CustomButton
                  title="Upload Job"
                  iconRight={<FiUpload />}
                  containerStyles={`text-green-600 py-1.5 px-3 md:px-5 focus:outline-none  rounded text-sm md:text-base border border-green-600`}
                />
              </Link>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row justify-start md:justify-between mt-4 md:mt-8 text-sm">
          <p className="flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full">
            <HiLocationMarker /> {info?.location ?? 'No Location'}
          </p>
          <p className="flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full">
            <AiOutlineMail /> {info?.email ?? 'No Email'}
          </p>
          <p className="flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full">
            <FiPhoneCall /> {info?.contact ?? 'No Contact'}
          </p>

          <div className="flex flex-col items-center mt-10 md:mt-0">
            <span className="text-xl">{info?.jobPosts?.length}</span>
            <p className="text-green-600 ">Job Post</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-20 flex flex-col gap-2">
        <p>Jobs Posted</p>

        <div className="flex flex-wrap gap-3">
          {info?.jobPosts?.map((job, index) => {
            const data = {
              name: info?.name,
              email: info?.email,
              logo: info?.profileUrl,
              ...job,
            }
            return <JobCard job={data} key={index} />
          })}
        </div>
      </div>

      <CompnayForm open={openForm} setOpen={setOpenForm} />
    </div>
  )
}

export default CompanyProfile
