import React, { useEffect } from 'react'
import { ImFacebook } from 'react-icons/im'
import { BsTwitter } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'

// //import images
import footerimg from '../assets/header.png'

import Aos from 'aos'
import 'aos/dist/aos.css'

const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  return (
    <div className="footer bg-gray-200 pl-2 h-72 pt-20">
      <div className="secContainer container w-full flex justify-between items-center text-sm">
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className="logoDiv pl-8"
        >
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="footerLogo pb-2"
          >
            <a href="#" className="logo">
              <img
                src={footerimg}
                className="cursor-pointer items-center justify-center w-44"
              />
            </a>
          </div>
          <div className="socials flex gap-2 ml-9">
            <ImFacebook className="icon text-3xl bg-green-800 text-white rounded-full p-2 hover:bg-green-600" />
            <BsTwitter className="icon text-3xl bg-green-800 text-white rounded-full p-2 hover:bg-green-600" />
            <AiFillInstagram className="icon text-3xl bg-green-800 text-white rounded-full p-2 hover:bg-green-600" />
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="3000"
          className="footerLinks flex flex-col items-center"
        >
          <span className="linkTitle pb-1 font-semibold">Quick Links</span>
          <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
            <a href="#" className="text-gray-500 hover:text-green-800">
              Home
            </a>
          </li>
          <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
            <a href="#" className="text-gray-500 hover:text-green-800">
              About
            </a>
          </li>
          <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
            <a href="#" className="text-gray-500 hover:text-green-800">
              Contact
            </a>
          </li>
          <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
            <a href="#" className="text-gray-500 hover:text-green-800">
              Privacy Policy
            </a>
          </li>
          <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
            <a href="#" className="text-gray-500 hover:text-green-800">
              Terms & Conditions
            </a>
          </li>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="4000"
          className="footerLinks flex flex-col  items-center"
        >
          <span className="linkTitle pb-1 font-semibold">Quick Links</span>
          <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
            <a href="#" className="text-gray-500 hover:text-green-800">
              Home
            </a>
          </li>
          <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
            <a href="#" className="text-gray-500 hover:text-green-800">
              About
            </a>
          </li>
          <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
            <a href="#" className="text-gray-500 hover:text-green-800">
              Contact
            </a>
          </li>
          <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
            <a href="#" className="text-gray-500 hover:text-green-800">
              Privacy Policy
            </a>
          </li>
          <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
            <a href="#" className="text-gray-500 hover:text-green-800">
              Terms & Conditions
            </a>
          </li>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="5000"
          className="footerLinks flex flex-col items-center"
        >
          <span className="linkTitle pb-1 font-semibold">Contact Us</span>
          <span className="phone text-gray-500"> (02) 8911 0964 </span>
          <span className="email text-gray-500"> info@tip.edu.ph </span>
          <span className="address text-gray-500">
            {' '}
            938 Aurora Blvd, Cubao, Quezon City, Metro Manila, PH{' '}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
