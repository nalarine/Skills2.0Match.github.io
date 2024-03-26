import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { CustomButton, TextInput, Loading } from "../components";
import { handleFileUpload } from "../utils";
import { apiRequest } from "../utils";
import { Login } from "../redux/userSlice";


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UserForm = ({ open, setOpen, setResumeUrl }) => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [uploadCv, setUploadCv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleResumeChange = async (info) => {
    const { status, response } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      setResumeUrl(response.url); // Update the resumeUrl state in UserProfile component
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Upload profile picture
      const uri = profileImage && (await handleFileUpload(profileImage));
  
      // Upload resume
      const resumeUrl = uploadCv && (await handleFileUpload(uploadCv));
  
      // Construct newData with updated profileUrl and resumeUrl
      const newData = uri ? { ...data, profileUrl: uri, resumeUrl } : data;
  
      // Send PUT request to update user data
      const res = await apiRequest({
        url: "/users/update-user",
        token: user?.token,
        data: newData,
        method: "PUT",
      });
  
      if (res) {
        // If the request is successful, update user state in Redux store
        const updatedUserInfo = { token: res?.token, ...res?.user };
        dispatch(Login(updatedUserInfo)); // Update user state in Redux
        setOpen(false);
        // Update the resumeUrl state in UserProfile component if available
        setResumeUrl(resumeUrl);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };
  
  

  const closeModal = () => setOpen(false);

  // const uploadButton = (
  //   <button
  //     style={{
  //       border: 0,
  //       background: "none",
  //     }}
  //     type="button"
  //   >
  //     <PlusOutlined />
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       Upload
  //     </div>
  //   </button>
  // );

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
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
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
                    <div className='w-full flex gap-2'>
                      <div className='w-1/2'>
                        <TextInput
                          name='firstName'
                          label='First Name'
                          placeholder='James'
                          type='text'
                          register={register("firstName", {
                            required: "First Name is required",
                          })}
                          error={
                            errors.firstName ? errors.firstName?.message : ""
                          }
                        />
                      </div>
                      <div className='w-1/2'>
                        <TextInput
                          name='lastName'
                          label='Last Name'
                          placeholder='Wagonner'
                          type='text'
                          register={register("lastName", {
                            required: "Last Name is required",
                          })}
                          error={
                            errors.lastName ? errors.lastName?.message : ""
                          }
                        />
                      </div>
                    </div>

                    <div className='w-full flex gap-2'>
                      <div className='w-1/2'>
                        <TextInput
                          name='contact'
                          label='Contact'
                          placeholder='Phone Number'
                          type='text'
                          register={register("contact", {
                            required: "Coontact is required!",
                          })}
                          error={errors.contact ? errors.contact?.message : ""}
                        />
                      </div>

                      <div className='w-1/2'>
                        <TextInput
                          name='location'
                          label='Location'
                          placeholder='Location'
                          type='text'
                          register={register("location", {
                            required: "Location is required",
                          })}
                          error={
                            errors.location ? errors.location?.message : ""
                          }
                        />
                      </div>
                    </div>

                    <TextInput
                      name='jobTitle'
                      label='Job Title'
                      placeholder='Software Engineer'
                      type='text'
                      register={register("jobTitle", {
                        required: "Job Title is required",
                      })}
                      error={errors.jobTitle ? errors.jobTitle?.message : ""}
                    />
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
                          onChange={handleChange}
                          beforeUpload={() => false}
                        >
                          {fileList.length >= 1 ? null : (
                            <button
                              style={{
                                border: 0,
                                background: "none",
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
                      <div className="flex w-1/2">
                        <label className="text-gray-600 text-sm mb-1">Resume</label>
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
                      </div>
                    </div>

                    <div className='flex flex-col'>
                      <label className='text-gray-600 text-sm mb-1'>
                        About
                      </label>
                      <textarea
                        className='rounded border border-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-base px-4 py-2 resize-none'
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required:
                            "Write a little bit about yourself and your projects",
                        })}
                        aria-invalid={errors.about ? "true" : "false"}
                      ></textarea>
                      {errors.about && (
                        <span
                          role='alert'
                          className='text-xs text-red-500 mt-0.5'
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
                          title={"Submit"}
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
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  

  const userInfo = user;

  return (
    <div className='container mx-auto flex items-center justify-center pt-10 pb-24 bg-green-200'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Left Side */}
        <div className='bg-slate-100 p-6 pb-2 rounded-lg flex flex-col items-center overflow-hidden'>
          <div>
            <img
              src={userInfo?.profileUrl || userInfo?.NoProfile}
              alt={userInfo?.firstName}
              className='w-full h-48 object-contain rounded-lg mb-4'
            />
            <h1 className='text-2xl font-semibold text-slate-600'>
              {userInfo?.firstName + " " + userInfo?.lastName}
            </h1>
            <h5 className='text-green-900 text-lg font-bold mb-4 mt-4'>
              {userInfo?.jobTitle || "Add Job Title"}
            </h5>
          </div>
        </div>

        {/* Right Side */}
        <div className='flex flex-col gap-4'>
          {/* Upper Right */}
          <div className='bg-slate-50 p-6 rounded-lg h-auto overflow-hidden max-w-md'>
            <div className='flex gap-1 items-center justify-start px-3 py-1 text-sm text-slate-600'>
              <HiLocationMarker size={24} className="text-green-800" />
              <p className="pl-2 text-lg">{userInfo?.location ?? "No Location"}</p>
            </div>
            <div className='flex gap-1 items-center justify-start px-3 py-1 text-sm text-slate-600'>
              <AiOutlineMail size={24} className="text-green-800" />
              <p className="pl-2 text-lg">{userInfo?.email ?? "No Email"}</p>
            </div>
            <div className='flex gap-1 items-center justify-start px-3 py-1 pb-4 text-sm text-slate-600'>
              <FiPhoneCall size={24} className="text-green-800" />
              <p className="pl-2 text-lg">{userInfo?.contact ?? "No Contact"}</p>
            </div>
            {/* Wrap the "About" section with overflow-auto class and set max-height */}
            <p className='text-green-600 font-bold text-lg text-left'>ABOUT</p>
            <div className='overflow-y-auto max-h-40'>
              <p className='text-base text-left leading-7 px-3 py-4 text-sm text-slate-600'>
                {userInfo?.about ?? "No About Found"}
              </p>
            </div>
          </div>

          {/* Lower Right */}
          <button
            className='bg-green-600 text-white py-2 px-44 rounded hover:bg-[#86EFAC] hover:text-[#15803D] focus:outline-none self-start mt-4'
            onClick={() => setOpen(true)}
          >
            Edit Profile
          </button>

          {resumeUrl && (
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
          )}

        </div>
      </div>
      <UserForm open={open} setOpen={setOpen} setResumeUrl={setResumeUrl} />
    </div>
  );
};

export default UserProfile;