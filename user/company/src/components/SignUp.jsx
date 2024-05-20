import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
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
import ReCAPTCHA from 'react-google-recaptcha';
import 'daisyui/dist/full.css';
import '../App.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState('seeker');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [reCaptchaVerified, setReCaptchaVerified] = useState(false);
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const { user } = useSelector((state) => state.user);

  let from = location?.state?.from?.pathname || '/';

  if (user.token) {
    return window.location.replace(from);
  }

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
  
      if (res?.status === 'failed') {
        if (isRegister) {
          if (res?.message === 'Email address already exists') {
            setErrMsg('Email Address already exists');
          } else {
            setErrMsg('Registration failed. Please try again.');
          }
        } else {
          if (res?.message === 'Invalid email or password') {
            setErrMsg('Invalid email or password.');
          } else {
            setErrMsg('Login failed. Please check your credentials and try again.');
          }
        }
        setLoading(false);
      } else {
        setErrMsg('');
        if (isRegister) {
          setSuccessMessage('Registration successful! Please verify your email before logging in.');
        } else {
          const userData = { token: res?.token, ...res?.user };
          dispatch(Login(userData));
          localStorage.setItem('userInfo', JSON.stringify(userData));
          setForgotPasswordModalOpen(false);
        }
      }
    } catch (error) {
      console.error('API Request Error:', error);
      setErrMsg('Please check you credentials and try again.');
      setLoading(false);
    }
  };
  
  
  
  const handleReCaptchaChange = (isChecked) => {
    setReCaptchaVerified(isChecked);
  };

  const handleCheckboxChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  const handleForgotPasswordClick = () => {
    setForgotPasswordModalOpen(true);
  };

  const handleForgotPasswordModalClose = () => {
    setForgotPasswordModalOpen(false);
  };

  const handleResetPassword = async () => {
    try {
      const res = await apiRequest({
        url: '/auth/reset-password-using-email',
        method: 'POST',
        data: { email: forgotPasswordEmail },
      });
  
      if (res.success) {
        setSuccessMessage('Password reset email sent successfully');
        setErrMsg(''); // Reset error message
      } else {
        setErrMsg('');
      }
    } catch (error) {
      setErrMsg('');
      console.error('Error sending password reset email:', error);
    } finally {
      setForgotPasswordModalOpen(false);
    }
  };


  return (
    <div className="pt-[7%] flex min-h-screen items-center justify-center p-4 content-center bg-gradient-to-b from-[#c1e1c1] to-[#143c1d] bg-blur-sm">
      <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl shadow-xl">
        <div className="flex items-center justify-center text-xl font-semibold leading-6 text-gray-900">
          <img src={Logo} alt="Logo" className="h-30 w-40 mr-2 justify-items-center" />
          {isRegister ? '' : ''}
        </div>

        <div className="w-full flex items-center justify-center py-4">
          <button
            className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
              accountType === 'seeker'
                ? 'bg-[#C1E1C1] text-[#14532d] font-semibold'
                : 'bg-white  border border-[#14532d]'
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

        {errMsg && <div className="text-red-600">{errMsg}</div>}

        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
            name="email"
            label="Email Address"
            placeholder="user@gmail.com"
            type="email"
            register={register('email', {
              required: 'Email Address is required!',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address.',
              },
            })}
            error={errors.email ? errors.email.message : ''}
            required
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
                required 
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
                  required 
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
                    required 
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
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="*******"
                  type="password"
                  register={register('confirmPassword', {
                    required: 'Please confirm password!',
                    validate: (value) => {
                      const { password } = getValues();
                      if (password !== value) {
                        return 'Password do not match!';
                      }
                      return true;
                    },
                  })}
                  error={
                    errors.confirmPassword
                      ? errors.confirmPassword.message
                      : ''
                  }
                  required 
                />
              </div>
            )}
          </div>

          {isRegister && (
            <div className="flex items-center mb-4">
              <Checkbox
                isSelected={agreedToTerms}
                color="success"
                onChange={handleCheckboxChange}
                required
              >
                <div className="text-sm ml-2">
                  I have read and agree to the{' '}
                  <Link
                    to="/terms-of-service"
                    className="font-bold text-[#33a68f]"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/privacy-policy"
                    className="font-bold text-[#33a68f]"
                  >
                    Privacy Policy
                  </Link>
                </div>
                {!agreedToTerms && (
                      <p className="text-red-500 text-sm mt-2 ml-6">You must agree to the terms and conditions!</p>
                    )}
              </Checkbox>
            </div>
          )}

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6LcPatApAAAAAA5kW1dbdydr7GTW46qOR-QpODh9"
              onChange={() => handleReCaptchaChange(true)}
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

                      <p className="ml-[18%] text-sm text-gray-700">
                          <span
                            className="text-sm font-bold text-[#14532d] ml-2 hover:text-lime-700 hover:font-semibold cursor-pointer"
                            onClick={handleForgotPasswordClick} 
                          >
                            Forgot your password?
                          </span>
                        </p>
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
                          containerStyles={`rounded-md px-8 py-2 text-sm font-medium text-white outline-none ${
                            isRegister ? (agreedToTerms ? 'bg-[#14532d] hover:bg-[#C1E1C1] hover:text-[#14532d]' : 'bg-gray-300 cursor-not-allowed') : 'bg-[#14532d] hover:bg-[#C1E1C1] hover:text-[#14532d]'
                          }`}
                          title={isRegister ? 'Create Account' : 'Login Account'}
                          disabled={isRegister && !agreedToTerms}
                        />
                      )}
                    </div>

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
          {successMessage && (
            <Transition
              show={successMessage !== ''}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <p className="text-green-500 text-center">{successMessage}</p>
            </Transition>
          )}

        </form>
      </div>
      <Transition appear show={forgotPasswordModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleForgotPasswordModalClose}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center pr-[2%]">
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Forgot Password
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Enter your email address below and we will send you instructions to reset your password.
                    </p>
                  </div>

                 <div className="mt-4">
                    <TextInput
                      name="forgotPasswordEmail"
                      label="Email Address"
                      placeholder="user@gmail.com"
                      type="email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)} // Update the email state
                      error={errors.forgotPasswordEmail ? errors.forgotPasswordEmail.message : ''}
                      required
                    />
                  </div>

                  <div className="mt-4 flex justify-center">
                  <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#14532d] px-4 py-2 text-sm font-medium text-white hover:bg-[#C1E1C1] hover:text-[#14532d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14532d] focus-visible:ring-offset-2"
                      onClick={handleResetPassword}
                    >
                      Reset Password
                    </button>
                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-300 hover:text-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={handleForgotPasswordModalClose}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};


export default SignUp;
