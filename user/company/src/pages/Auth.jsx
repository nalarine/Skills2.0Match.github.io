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
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={bgopen}
        alt="bgopen"
      />

      <div className="absolute inset-9 flex justify-start items-center text-white pl-3 mt-32">
        <div data-aos="fade-up" className="text-black">
        <h1 className="text-6xl font-semibold m-0 animated-text text-left pl-3">
    Seamless <span style={{ color: '#14532D' }}>SKILLS</span>, <br />
    Best <span style={{ color: '#14532D' }}>MATCHES</span>.
</h1>
          <br />
          <p className="text-xl opacity-9 font-weight-300 py-1 max-w-100 pl-3 text-left">
            Great platform for Out-of-School Youth searching for
            <br />
            new career heights and passionate about startups.
          </p>
          <br />
          <div className="inset-50 btn-container pr-[12%] pb-24">
            <button
              className="btn py-2 px-4 bg-green-800 text-white rounded-full animate-bounce transition-transform duration-300 transform hover:scale-110"
              onClick={handleGetStarted} // Call handleGetStarted function on button click
            >
              Get Started
            </button>
            {open && <SignUp open={open} setOpen={setOpen} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
