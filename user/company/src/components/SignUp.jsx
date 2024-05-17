import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TextInput from './TextInput';
import CustomButton from './CustomButton';
import { apiRequest } from '../utils';
import { Login } from '../redux/userSlice';
import Logo from '../assets/header.png';
import GoogleIcon from '../assets/google-icon.svg';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Checkbox } from '@nextui-org/react'; 
import StrongPasswordInput from './StrongPasswordInput';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReCAPTCHA from 'react-google-recaptcha';
import 'daisyui/dist/full.css';
import '../App.css';

const SignUp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState('seeker');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errMsg, setErrMsg] = useState(''); // Define errMsg state
  const [successMessage, setSuccessMessage] = useState('');
   const [reCaptchaVerified, setReCaptchaVerified] = useState(false); 

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const closeModal = () => setOpen(false);

  // const handleClick = () => {
  //   signInWithPopup(auth, provider)
  //     .then((data) => {
  //       setValue(data.user.email);
  //       localStorage.setItem('email', data.user.email);
  //       navigate(accountType === 'seeker' ? '/Dashboard' : '/CompanyDash');
  //     })
  //     .catch((error) => {
  //       console.error('Google Sign-in Error:', error);
  //     });
  // };

  // useEffect(() => {
  //   setValue(localStorage.getItem('email'));
  // }, []);

  const onSubmit = async (data) => {
    if (!reCaptchaVerified) {
      alert('Please verify that you are not a robot.');
      return;
    }
    let URL = null;
    if (isRegister) {
      URL = accountType === 'seeker' ? 'auth/register' : 'companies/register';
    } else {
      URL = accountType === 'seeker' ? 'auth/login' : 'companies/login';
    }
  
    try {
      setLoading(true);
      setLoadingText(isRegister ? 'Creating Account...' : 'Logging in...');
  
      const res = await apiRequest({
        url: URL,
        data: data,
        method: 'POST',
      });
  
      console.log(res);
      if (res?.status === 'failed') {
        if (res?.message === 'Email address already exists') {
          setIsEmailExisting(true);
        } else {
          setErrMsg('Incorrect email or password.');
        }
        setLoading(false);
      } else {
        setErrMsg('');
        if (isRegister) {
          // Registration successful, show success message
          setSuccessMessage('Registration successful! Please verify your email before logging in.');
        } else {
          // Login successful
          const userData = { token: res?.token, ...res?.user };
          dispatch(Login(userData));
          localStorage.setItem('userInfo', JSON.stringify(userData));
          setOpen(false);
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        if (
          error.response.data &&
          error.response.data.errors &&
          error.response.data.errors.password
        ) {
          setErrMsg(error.response.data.errors.password.message);
        } else {
          setErrMsg('Validation error occurred.');
        }
      } else {
        if (error.response?.data?.message !== 'Email address already exists') {
          setErrMsg('An error occurred.');
        }
      }
    }
  };
  
  const handleReCaptchaChange = (isChecked) => {
    setReCaptchaVerified(isChecked);
  };

  const handleCheckboxChange = (event) => {
    setAgreedToTerms(event.target.checked);
  };

  return (
    <>
      <Transition appear show={open || false}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-aut0"
          onClose={closeModal}
        >
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

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 content-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-center text-xl font-semibold leading-6 text-gray-900"
                  >
                    <img
                      src={Logo}
                      alt="Logo"
                      className="h-30 w-40 mr-2 justify-items-center"
                    />
                    {isRegister ? '' : ''}
                  </Dialog.Title>

                  <div className="w-full flex items-center justify-center py-4 ">
                    <button
                      className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                        accountType === 'seeker'
                          ? 'bg-[#C1E1C1] text-[#14532d] font-semibold'
                          : 'bg-white border border-[#14532d]'
                      }`}
                      onClick={() => setAccountType('seeker')}
                    >
                      User Account
                    </button>
                    <button
                      className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                        accountType !== 'seeker'
                          ? 'bg-[#C1E1C1] text-[#14532d] font-semibold'
                          : 'bg-white border border-[#14532d]'
                      }`}
                      onClick={() => setAccountType('company')}
                    >
                      Company Account
                    </button>
                  </div>

                  <form
                    className="w-full flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <TextInput
                      name="email"
                      label="Email Address"
                      placeholder="user@gmail.com"
                      type="email"
                      register={register('email', {
                        required: 'Email Address is required!',
                      })}
                      error={errors.email ? errors.email.message : ''}
                    />
                    {isRegister && accountType === 'seeker' && (
                      <>
                        <TextInput
                          name="birthdate"
                          label="Date of Birth"
                          placeholder="YYYY-MM-DD"
                          type="date"
                          register={register('birthdate', {
                            required: 'Date of Birth is required!',
                            validate: (value) => {
                              const birthdate = new Date(value);
                              const today = new Date();
                              const minDate = new Date(
                                today.getFullYear() - 24,
                                today.getMonth(),
                                today.getDate()
                              );
                              const maxDate = new Date(
                                today.getFullYear() - 18,
                                today.getMonth(),
                                today.getDate()
                              );

                              if (
                                birthdate < minDate ||
                                birthdate > maxDate
                              ) {
                                return 'You must be between 18 to 24 years old to register.';
                              }
                              return true;
                            },
                          })}
                          error={
                            errors.birthdate ? errors.birthdate.message : ''
                          }
                        />
                      </>
                    )}

                    {isRegister && (
                      <div className="w-full flex gap-1 md:gap-2">
                        <div
                          className={`${
                            accountType === 'seeker' ? 'w-1/2' : 'w-full'
                          }`}
                        >
                          <TextInput
                            name={
                              accountType === 'seeker' ? 'firstName' : 'name'
                            }
                            label={
                              accountType === 'seeker'
                                ? 'First Name'
                                : 'Company Name'
                            }
                            placeholder={
                              accountType === 'seeker'
                                ? 'eg. Juan'
                                : 'Company name'
                            }
                            type="text"
                            register={register(
                              accountType === 'seeker' ? 'firstName' : 'name',
                              {
                                required:
                                  accountType === 'seeker'
                                    ? 'First Name is required'
                                    : 'Company Name is required',
                              }
                            )}
                            error={
                              accountType === 'seeker'
                                ? errors.firstName
                                  ? errors.firstName.message
                                  : ''
                                : errors.name
                                ? errors.name.message
                                : ''
                            }
                          />
                        </div>

                        {accountType === 'seeker' && isRegister && (
                          <div className="w-1/2">
                            <TextInput
                              name="lastName"
                              label="Last Name"
                              placeholder="Dela Cruz"
                              type="text"
                              register={register('lastName', {
                                required: 'Last Name is required',
                              })}
                              error={
                                errors.lastName ? errors.lastName.message : ''
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="w-full flex gap-1 md:gap-2">
                      <div className={`${isRegister ? 'w-1/2' : 'w-full'}`}>
                        <StrongPasswordInput
                          isRegister={isRegister}
                          register={register}
                          errors={errors}
                        />
                      </div>

                      {isRegister && (
                        <div className="w-1/2">
                          <TextInput
                            label="Confirm Password"
                            placeholder="Password"
                            type="password"
                            register={register('cPassword', {
                              validate: (value) => {
                                const { password } = getValues();

                                if (password !== value) {
                                  return 'Passwords do not match';
                                }
                              },
                            })}
                            error={
                              errors.cPassword &&
                              errors.cPassword.type === 'validate'
                                ? errors.cPassword.message
                                : ''
                            }
                          />
                        </div>
                      )}
                    </div>

                    {isRegister && (
                      <div className="flex items-center mt-4">
                        <Checkbox
                          defaultChecked={agreedToTerms}
                          onChange={handleCheckboxChange}
                          color="success"
                        >
                          By creating an account, you are agreeing to the{' '}
                          <a
                            href="/privacy-policy"
                            className="text-green-500 hover:underline"
                          >
                            Privacy Policy
                          </a>{' '}
                          and{' '}
                          <a
                            href="/terms-of-service"
                            className="text-green-500 hover:underline"
                          >
                            Terms of Service
                          </a>
                          {!agreedToTerms && (
                              <p className="text-red-500 text-sm ml-1">You must agree to the terms and conditions.</p>
                            )}
                        </Checkbox>
                      </div>
                    )}
                  <div className="mt-4" style={{ display: 'grid', placeItems: 'center' }}>
                    <ReCAPTCHA
                      sitekey="6LcPatApAAAAAA5kW1dbdydr7GTW46qOR-QpODh9"
                      onChange={handleReCaptchaChange}
                    />
                  </div>
                    {!isRegister && (
                      <div className="flex items-center">
                        <>
                          <Checkbox
                            defaultChecked={false}
                            onChange={(event) => console.log(event.target.checked)}
                            color="success"
                          >
                            Remember me
                          </Checkbox>

                          <Link to="/forgot-password" className="ml-auto text-sm text-green-600 hover:text-green-500">
                            Forgot your password?
                          </Link>
                        </>
                      </div>
                    )}

                      <div className="mt-2 flex items-center justify-center">
                        {loading ? (
                          <div className="flex flex-col items-center">
                            <div className="loading loading-infinity loading-md text-green-700" />
                            <p className="mt-2">{loadingText}</p>
                          </div>
                        ) : (
                          <CustomButton
                            type="submit"
                            containerStyles="rounded-md bg-[#14532d] px-8 py-2 text-sm font-medium text-white outline-none hover:bg-[#C1E1C1] hover:text-[#14532d]"
                            title={isRegister ? 'Create Account' : 'Login Account'}
                          />
                        )}
                      </div>
                    {/* <div className="flex items-center justify-center mt-2">
                      <hr className="w-24 border-gray-500" />
                      <p className="text-base text-gray-700 mx-3">
                        Sign up with Social
                      </p>
                      <hr className="w-24 border-gray-500" />
                    </div>
                    <div className="flex items-center justify-center mt-2">
                      <button
                        className="relative flex items-center bg-white text-[#14532D] font-bold rounded-full h-8 w-auto text-sm px-3 py-5 border border-[#14532D] border-opacity-100 hover:bg-[#14532D] hover:text-[#FFFFFF] focus:outline-none"
                        onClick={handleClick}
                      >
                        <img
                          src={GoogleIcon}
                          alt="Google Icon"
                          className="w-6 h-6 mr-2"
                        />
                        Continue with Google
                      </button>
                    </div> */}
                  </form>

                  <div className="mt-4">
                    <p className="text-sm text-gray-700">
                      {isRegister
                        ? 'Already have an account?'
                        : 'Do not have an account?'}

                      <span
                        className="text-sm font-bold text-[#14532d] ml-2 hover:text-lime-700 hover:font-semibold cursor-pointer"
                        onClick={() => setIsRegister((prev) => !prev)}
                      >
                        {isRegister ? 'Login' : 'Create Account'}
                      </span>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {errMsg && (
        <Transition appear show={errMsg !== ''}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-aut0"
            onClose={() => {
              setOpen(false);
              setErrMsg('');
            }}
          >
            {/* Error modal content */}
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

            <div className="fixed inset-0 overflow-y-auto ">
              <div className="flex min-h-full items-center justify-center p-4 content-center ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-center text-xl font-semibold leading-6 text-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 4v6M10 14h.01"
                        />
                      </svg>
                      Email Address already exists
                    </Dialog.Title>

                    <div className="mt-4">
                      <p className="text-sm text-gray-700">
                        The provided email address already exists. Please use a
                        different email address or try logging in.
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-center">
                      <CustomButton
                        onClick={() => {
                          setOpen(false);
                          setErrMsg('');
                        }}
                        containerStyles={`rounded-md bg-[#14532d] px-8 py-2 text-sm font-medium text-white outline-none hover:bg-[#C1E1C1] hover:text-[#14532d]`}
                        title="OK"
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
      {successMessage && (
  <Transition appear show={successMessage !== ''}>
    <Dialog
      as="div"
      className="fixed inset-0 z-50 overflow-y-auto"
      onClose={() => setSuccessMessage('')}
    >
      <div className="flex items-end justify-end min-h-full p-2">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="max-w-sm p-4 mr-4 pr-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm text-green-600">
                    <p>{successMessage}</p>
                  </div>
                </div>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setSuccessMessage('')}
              >
                <svg
                  className="w-4 h-4 fill-current hover:opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.364 14.364a1 1 0 11-1.414 1.414L10 11.414l-2.95 2.95a1 1 0 11-1.414-1.414L8.586 10 5.636 7.05a1 1 0 111.414-1.414L10 8.586l2.95-2.95a1 1 0 111.414 1.414L11.414 10l2.95 2.95z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
)}

      </>
  );
};

export default SignUp;