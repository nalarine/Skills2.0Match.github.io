import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import bgopen from '../assets/bgopen.png'
import SignUp from '../components/SignUp'

const Auth = () => {
  const { user } = useSelector((state) => state.user)
  const [open, setOpen] = useState(false) // Set initial state to false
  const location = useLocation()

  let from = location?.state?.from?.pathname || '/'

  const handleGetStarted = () => {
    setOpen(true) // Open SignUp component when Get Started button is clicked
  }

  if (user.token) {
    return window.location.replace(from)
  }
  return (
    <div className="absolute inset-0 w-full h-full object-scale-down z-2">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat lg:bg-left xl:bg-right"
        style={{ backgroundImage: `url(${bgopen})` }}
      >
        <div className="absolute inset-0 sm:inset-9 flex justify-start items-center text-white pl-3 mt-8 sm:mt-32">
          <div data-aos="fade-up" className="text-black">
            <h1 className="text-3xl sm:text-6xl font-semibold m-0 animated-text text-left pl-3">
              Seamless <span style={{ color: '#14532D' }}>SKILLS</span>, <br />
              Best <span style={{ color: '#14532D' }}>MATCHES</span>.
            </h1>
            <br />
            <p className="text-lg sm:text-xl opacity-90 font-weight-300 py-1 max-w-xs sm:max-w-lg pl-3 text-left">
              Great platform for Out-of-School Youth searching for new career
              heights and passionate about startups.
            </p>
            <br />
            <div className="btn-container pr-4 sm:pr-[12%] pb-8 sm:pb-24">
              <button
                className="btn py-2 px-4 bg-green-800 text-white rounded-full animate-bounce transition-transform duration-300 transform hover:scale-110"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
              {open && <SignUp open={open} setOpen={setOpen} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
