import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"; // Import Navigate
import { useDispatch } from "react-redux";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { apiRequest } from "../utils";
import { Login } from "../redux/userSlice";
import Logo from "../assets/header.png";
import GoogleIcon from "../assets/google-icon.svg";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "../App.css";

const SignUp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState("seeker");
  const [errMsg, setErrMsg] = useState(""); // State for error message
  const [value, setValue] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  let from = location.state?.from?.pathname || "/";

  const closeModal = () => setOpen(false);

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem("email", data.user.email);
        navigate(accountType === "seeker" ? "/Dashboard" : "/CompanyDash"); // Navigate to the appropriate route
      })
      .catch((error) => {
        console.error("Google Sign-in Error:", error);
      });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });

  const onSubmit = async (data) => {
    let URL = null;
    if (isRegister) {
      if (accountType === "seeker") {
        URL = "auth/register";
      } else URL = "companies/register";
    } else {
      if (accountType === "seeker") {
        URL = "auth/login";
      } else {
        URL = "companies/login";
      }
    }

    try {
      const res = await apiRequest({
        url: URL,
        data: data,
        method: "POST",
      });
    
      console.log(res);
      if (res?.status === "failed") {
        setErrMsg("Incorrect email or password.");
        alert("Incorrect email or password.");
      } else {
        setErrMsg("");
        const userData = { token: res?.token, ...res?.user };
        dispatch(Login(userData));
        localStorage.setItem("userInfo", JSON.stringify(userData));
        setOpen(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Mongoose validation error occurred
        if (error.response.data && error.response.data.errors && error.response.data.errors.password) {
          setErrMsg(error.response.data.errors.password.message);
          alert(error.response.data.errors.password.message);
        } else {
          setErrMsg("Validation error occurred.");
          alert("Validation error occurred.");
        }
      } else {
        // Other errors
        setErrMsg("An error occurred.");
        alert("An error occurred.");
      }
    } {
      console.log(error);
    }
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
                    {isRegister ? "" : ""}
                  </Dialog.Title>

                  <div className="w-full flex items-center justify-center py-4 ">
                    <button
                      className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                        accountType === "seeker"
                          ? "bg-[#C1E1C1] text-[#14532d] font-semibold"
                          : "bg-white border border-[#14532d]"
                      }`}
                      onClick={() => setAccountType("seeker")}
                    >
                      User Account
                    </button>
                    <button
                      className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                        accountType !== "seeker"
                          ? "bg-[#C1E1C1] text-[#14532d] font-semibold"
                          : "bg-white border border-[#14532d]"
                      }`}
                      onClick={() => setAccountType("company")}
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
                      placeholder="email@example.com"
                      type="email"
                      register={register("email", {
                        required: "Email Address is required!",
                      })}
                      error={errors.email ? errors.email.message : ""}
                    />

                    {isRegister && (
                      <div className="w-full flex gap-1 md:gap-2">
                        <div
                          className={`${
                            accountType === "seeker" ? "w-1/2" : "w-full"
                          }`}
                        >
                          <TextInput
                            name={
                              accountType === "seeker" ? "firstName" : "name"
                            }
                            label={
                              accountType === "seeker"
                                ? "First Name"
                                : "Company Name"
                            }
                            placeholder={
                              accountType === "seeker"
                                ? "eg. James"
                                : "Company name"
                            }
                            type="text"
                            register={register(
                              accountType === "seeker" ? "firstName" : "name",
                              {
                                required:
                                  accountType === "seeker"
                                    ? "First Name is required"
                                    : "Company Name is required",
                              }
                            )}
                            error={
                              accountType === "seeker"
                                ? errors.firstName
                                  ? errors.firstName?.message
                                  : ""
                                : errors.name
                                ? errors.name?.message
                                : ""
                            }
                          />
                        </div>

                        {accountType === "seeker" && isRegister && (
                          <div className="w-1/2">
                            <TextInput
                              name="lastName"
                              label="Last Name"
                              placeholder="Wagonner"
                              type="text"
                              register={register("lastName", {
                                required: "Last Name is required",
                              })}
                              error={
                                errors.lastName ? errors.lastName?.message : ""
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="w-full flex gap-1 md:gap-2">
                      <div className={`${isRegister ? "w-1/2" : "w-full"}`}>
                        <TextInput
                          name="password"
                          label="Password"
                          placeholder="Password"
                          type="password"
                          register={register("password", {
                            required: "Password is required!",
                          })}
                          error={
                            errors.password ? errors.password?.message : ""
                          }
                        />
                      </div>

                      {isRegister && (
                        <div className="w-1/2">
                          <TextInput
                            label="Confirm Password"
                            placeholder="Password"
                            type="password"
                            register={register("cPassword", {
                              validate: (value) => {
                                const { password } = getValues();

                                if (password !== value) {
                                  return "Passwords do not match";
                                }
                              },
                            })}
                            error={
                              errors.cPassword &&
                              errors.cPassword.type === "validate"
                                ? errors.cPassword?.message
                                : ""
                            }
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-center">
                      <CustomButton
                        type="submit"
                        containerStyles={`rounded-md bg-[#14532d] px-8 py-2 text-sm font-medium text-white outline-none hover:bg-[#C1E1C1]`}
                        title={isRegister ? "Create Account" : "Login Account"}
                      />
                    </div>

                    {/* Add sign up with social text and Google icon */}
                    <div className="flex items-center justify-center mt-2">
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
                    </div>
                  </form>

                  <div className="mt-4">
                    <p className="text-sm text-gray-700">
                      {isRegister
                        ? "Already have an account?"
                        : "Do not have an account?"}

                      <span
                        className="text-sm text-border-[#14532d] ml-2 hover:text-[#C1E1C1] hover:font-semibold cursor-pointer"
                        onClick={() => setIsRegister((prev) => !prev)}
                      >
                        {isRegister ? "Login" : "Create Account"}
                      </span>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignUp;