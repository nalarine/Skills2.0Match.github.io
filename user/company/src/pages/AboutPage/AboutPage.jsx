import React, { useState, useEffect } from 'react'
import { Image, Button } from '@nextui-org/react'

import { ImFacebook } from 'react-icons/im'
import { BsTwitter } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'

import logohead from '../../assets/header.png'
import logo from '../../assets/logo2.png'
import mission from '../../assets/target.svg'
import vision from '../../assets/vision.svg'
import footerimg from '../../assets/header.png'

import Aos from 'aos'
import 'aos/dist/aos.css'

const AboutPage = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  const [scrolled, setScrolled] = useState(false)

  const handleScroll = () => {
    const offset = window.scrollY
    setScrolled(offset > 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* NAVBAR START ------------------------------------------- */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            "linear-gradient(rgba(33,33,33,0.522), rgba(33,33,33,0.522)) no-repeat, url('../../../src/assets/about.png') center / cover",
          height: '100vh',
          zIndex: 2,
        }}
      />

      <section>
        <div className="secContainer container mx-auto p-8">
          {/* Your content goes here */}
        </div>
      </section>

      {/* NAVBAR END -------------------------------------------- */}

      {/* HOME START -------------------------------------------- */}

      <div className="homeText text-center relative z-10">
        <h1
          data-aos="fade-up"
          className="title text-white text-6xl font-semibold m-0 flex flex-col items-center mt-20 pl-42 p-8"
        >
          Get to Know Us
        </h1>

        <p
          data-aos="fade-up"
          data-aos-duration="2500"
          className="subTitle text-white opacity-9 text-xl font-weight-300 py-1 mb-5 max-w-70 mx-auto pl-42"
        >
          Discover what drives us, what fuels our passion, and the driving force{' '}
          <br />
          behind everything we stand for.
        </p>
      </div>

      {/* ABOUT US START --------------------------------------- */}

      <section className="flex justify-center items-center pt-64 pl-14 text-left">
        <div
          data-aos="fade-right"
          data-aos-duration="2000"
          className="flex-1 w-1/2 mx-4"
        >
          <h1 className="mb-5 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl mt-20">
            Welcome to
            <br />
            <span className="pt-3 text-transparent bg-clip-text bg-gradient-to-r to-green-500 from-yellow-500 block">
              Skills 2.0 Match
            </span>
          </h1>
          <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start">
            At Skills 2.0 Match, we believe in the boundless potential of every
            individual, and we're committed to transforming aspirations into
            achievements. We're more than just a job portal – we're a catalyst
            for change, a bridge to opportunities, and a community that empowers
            Out-of-School Youth (OSY) to navigate their journey towards a
            brighter future.
            {isExpanded && (
              <>
                <br />
                <br />
                Our story is one of innovation, collaboration, and a shared
                vision to create a world where educational backgrounds don't
                define destiny. With the unwavering support of{' '}
                <strong class="font-semibold text-gray-900 dark:text-black">
                  Technological Institute of the Philippines and the partnership
                  of the United States Agency for International Development
                  (USAID)
                </strong>
                , we've embarked on a mission to revolutionize the way OSY
                candidates access meaningful employment.
                <br />
                <br />
                Our platform isn't just about finding jobs; it's about unlocking
                potential, nurturing talents, and making dreams achievable.
                Through cutting-edge technology, personalized guidance, and a
                commitment to social responsibility, we're here to rewrite the
                narrative of youth unemployment. Join us as we shape careers,
                empower lives, and build a stronger future together.
              </>
            )}
          </p>
          <div className="flex justify-center pr-16">
            <Button
              color="success"
              variant="ghost"
              onClick={toggleReadMore}
              className="text-black"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </Button>
          </div>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="2500"
          className="flex-1 w-1/2 mx-4"
        >
          <div className="relative flex justify-center items-center h-96">
            <Image
              isBlurred
              width={350} // Increase the width of the image
              height={350} // Increase the height of the image
              src={logo}
              alt=""
              className="m-5" // Ensure the image fills the container
            />
          </div>
        </div>
      </section>

      <div className="section w-full">
        <div className="cont1 w-full block mx-auto py-4 px-0">
          <div className="title w-full text-center mb-12">
            <h1
              data-aos="fade-up"
              data-aos-duration="3000"
              className="text-5xl text-green-500 font-bold mb-24 mt-12"
            >
              GUIDING PRINCIPLES
            </h1>
          </div>
        </div>

        <div className="wrapper">
          <div
            data-aos="fade-down"
            data-aos-duration="3500"
            className="team flex justify-center w-auto text-center flex-wrap"
          >
            <div class="relative">
              <div class="absolute inset-0 flex items-center justify-center bg-slate-200 text-green-900 opacity-70 text-[13rem] z-0 font-bold pl-60">
                <span class="block transform -translate-y-1/2 ">MISSION</span>
              </div>
              <div class="flex items-center py-12">
                <div class="w-1/2">
                  <img
                    src={mission}
                    alt="Dashboard Icon"
                    className="w-[220px] h-[220px] ml-8 relative z-10"
                  />
                </div>
                <div class="w-1/2 z-10 ">
                  {/* <h1 class=" pt-3 text-transparent bg-clip-text bg-gradient-to-r to-green-500 from-yellow-500 block text-3xl font-bold">
                    Mission Statement
                  </h1> */}
                  <p class="text-black-700 -ml-[385px] mr-[50px] pt-12">
                    Empowering Out-of-School Youth (OSY) by connecting them with
                    meaningful employment opportunities, Skills 2.0 Match is
                    dedicated to fostering a platform where skills meet
                    opportunity. We are committed to addressing the unique
                    challenges faced by OSY candidates and providing them with a
                    pathway to economic independence and personal growth.
                    Through innovative technology, personalized support, and
                    strategic partnerships, we aim to build a community that
                    unlocks potential, nurtures careers, and contributes to a
                    brighter future for all.
                  </p>
                </div>
              </div>
            </div>

            <div class="relative mt-40">
              <div class="absolute inset-0 flex items-center justify-center bg-slate-200 text-green-900 opacity-70 text-[13rem] z-0 font-bold pr-64 mb-12">
                <span class="block transform -translate-y-1/2">VISION</span>
              </div>
              <div class="flex items-center py-12">
                <div class="w-1/2 z-10 ">
                  {/* <h1 class=" pt-3 text-transparent bg-clip-text bg-gradient-to-r to-green-500 from-yellow-500 block text-3xl font-bold">
                    Mission Statement
                  </h1> */}
                  <p class="text-black-700 -mr-[350px] ml-[100px] pt-12">
                    Our vision at Skills 2.0 Match is to create a world where
                    every Out-of-School Youth has equal access to opportunities
                    that align with their talents and aspirations. We envision a
                    society where the talents of OSY candidates are recognized
                    and valued, contributing to a thriving workforce and
                    sustainable growth. By pioneering a platform that bridges
                    the gap between skills and job vacancies, we aspire to
                    empower a generation of OSY individuals, transforming their
                    lives and shaping a more inclusive and prosperous future.
                  </p>
                </div>
                <div class="w-1/2">
                  <img
                    src={vision}
                    alt="Dashboard Icon"
                    className="w-[250px] h-[250px] ml-[400px] relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT US END --------------------------------------------- */}

      {/* FOOTER START --------------------------------------------- */}

      <div className="footer bg-gray-200 pl-2 h-72 pt-20">
        <div className="secContainer container flex justify-between items-center pl-20 text-sm">
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
            data-aos-duration="4000"
            className="footerLinks flex flex-col  items-center"
          >
            <span className="linkTitle pb-1 font-semibold">Quick Links</span>
            <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
              <a
                href="/user-auth"
                className="text-gray-500 hover:text-green-800"
              >
                Home
              </a>
            </li>
            <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
              <a
                href="/AboutPage"
                className="text-gray-500 hover:text-green-800"
              >
                About
              </a>
            </li>
            <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
              <a
                href="/ContactPage"
                className="text-gray-500 hover:text-green-800"
              >
                Contact
              </a>
            </li>
            <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
              <a
                href="/privacy-policy"
                className="text-gray-500 hover:text-green-800"
              >
                Privacy Policy
              </a>
            </li>
            <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
              <a
                href="/terms-of-service"
                className="text-gray-500 hover:text-green-800"
              >
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
    </>
  )
}

export default AboutPage
