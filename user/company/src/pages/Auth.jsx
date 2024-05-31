import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import bgopen from '../assets/bgopen.png';

const Auth = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate hook to navigate programmatically

  let from = location?.state?.from?.pathname || '/';

  const handleGetStarted = () => {
    if (!user.token) {
      navigate('/sign-up'); // Navigate to /sign-up if user is not logged in
    }
  };

  if (user.token) {
    return window.location.replace(from);
  }
  return (
    <div className="absolute inset-0 w-full h-full object-scale-down z-2">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-cover bg-no-repeat lg:bg-center xl:bg-right"
        style={{ backgroundImage: `url(${bgopen})` }}
      >
        <div className="absolute inset-0 sm:inset-9 flex justify-center items-center text-white pl-3 mt-[20%] sm:mb-[20%]">
          <div data-aos="fade-up" className="text-black">
            <h1 className="text-3xl sm:text-[50px] font-bold m-0 animated-text text-center pl-3">
            Job Matches for <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-500 from-emerald-600">Out-of-School Youth</span> 
            </h1>
            <br />
            <p className="ml-[24%] font-semibold text-lg sm:text-xl opacity-90 italic font-weight-600 py-1 max-w-xs sm:max-w-lg pl-3 text-center">
            "Your Perfect Job: Matched to Your Skills"
            </p>
            <br />
            <div className="btn-container pr-4 sm:pr-[12%] pb-8 sm:pb-24">
              <button
                className="ml-[17%] mt-[2%] btn py-2 px-8 text-lg bg-green-600 text-white rounded-full animate-bounce transition-transform duration-300 transform hover:scale-110"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
