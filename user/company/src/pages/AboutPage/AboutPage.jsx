import React, { useState, useEffect } from 'react';
import './AboutPage.css'

import {ImFacebook} from 'react-icons/im'
import {BsTwitter} from 'react-icons/bs'
import {AiFillInstagram} from 'react-icons/ai'

import logohead from '../../assets/header.png'; 
import logo from '../../assets/logo2.png'
import target from '../../assets/target.png'
import vision from '../../assets/vision.png'
import footerimg from '../../assets/header.png'

import Aos from 'aos'
import 'aos/dist/aos.css'

const AboutPage = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    {/* NAVBAR START ------------------------------------------- */}
      <div
        className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'linear-gradient(rgba(33,33,33,0.522), rgba(33,33,33,0.522)) no-repeat, url(\'../../../src/assets/about.png\') center / cover',
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
       <h1 data-aos="fade-up" className="title text-white text-6xl font-semibold m-0 flex flex-col items-center mt-20 pl-42 p-8">
          Get to Know Us
      </h1>

        <p data-aos="fade-up" data-aos-duration="2500" className="subTitle text-white opacity-9 text-xl font-weight-300 py-1 mb-5 max-w-70 mx-auto pl-42">
          Discover what drives us, what fuels our passion, and the driving force <br />behind everything we stand for.
        </p>
      </div>

        
      {/* ABOUT US START --------------------------------------- */}

        <section className="flex justify-center items-center pt-64 pl-5">
          <div data-aos="fade-right" data-aos-duration="2000" className="flex-1 w-1/2 mx-4">
            <h2 className="text-4xl mb-4 text-green-800 font-bold">Welcome to Skills 2.0 Match</h2>
            <p className="text-base mb-4">
              At Skills 2.0 Match, we believe in the boundless potential of every individual, and we're committed to transforming aspirations into achievements. We're more than just a job portal – we're a catalyst for change, a bridge to opportunities, and a community that empowers Out-of-School Youth (OSY) to navigate their journey towards a brighter future.
              {isExpanded && (
                <>
                  <br />
                  <br />
                  Our story is one of innovation, collaboration, and a shared vision to create a world where educational backgrounds don't define destiny. With the unwavering support of Technological Institute of the Philippines and the partnership of the United States Agency for International Development (USAID), we've embarked on a mission to revolutionize the way OSY candidates access meaningful employment.
                  <br />
                  <br />
                  Our platform isn't just about finding jobs; it's about unlocking potential, nurturing talents, and making dreams achievable. Through cutting-edge technology, personalized guidance, and a commitment to social responsibility, we're here to rewrite the narrative of youth unemployment. Join us as we shape careers, empower lives, and build a stronger future together.
                </>
              )}
            </p>
            <button onClick={toggleReadMore} className="bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
            {isExpanded ? 'Read less' : 'Read more'}
            </button>
          </div>
          <div data-aos="fade-left" data-aos-duration="2500" className="flex-1 w-1/2 mx-4">
            <img src={logo} alt="" className="w-3/4 mx-auto" />
          </div>
        </section>

        <div className="section w-full">
          <div className="cont1 w-full block mx-auto py-4 px-0">
            <div className="title w-full text-center mb-12">
              <h1 data-aos="fade-up" data-aos-duration="3000" className="text-5xl text-green-500 font-bold">
                GUIDING PRINCIPLES
              </h1>
            </div>
          </div>

          <div className="wrapper">
            <div data-aos="fade-down" data-aos-duration="3500" className="team flex justify-center w-auto text-center flex-wrap">
              <div className="team_mem bg-green-200 m-5 mb-16 p-8 max-w-md">
                <div className="team_img relative w-24 h-24 mx-auto mb-4 bg-green-200 rounded-full overflow-hidden">
                  <img src={target} alt="" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-green-700 text-3xl mt-6 pb-4 font-bold">Mission Statement</h3>
                <p className="role text-gray-600 text-base">
                  Empowering Out-of-School Youth (OSY) by connecting them with meaningful employment opportunities, Skills 2.0 Match is dedicated to fostering a platform where skills meet opportunity. We are committed to addressing the unique challenges faced by OSY candidates and providing them with a pathway to economic independence and personal growth. Through innovative technology, personalized support, and strategic partnerships, we aim to build a community that unlocks potential, nurtures careers, and contributes to a brighter future for all.
                </p>
              </div>

              <div className="team_mem bg-green-200 m-5 mb-16 p-8 max-w-md">
                <div className="team_img relative w-24 h-24 mx-auto mb-4 bg-green-200 rounded-full overflow-hidden">
                  <img src={vision} alt="" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-green-700 text-3xl mt-6 pb-4 font-bold">Vision Statement</h3>
                <p className="role text-gray-600 text-base">
                  Our vision at Skills 2.0 Match is to create a world where every Out-of-School Youth has equal access to opportunities that align with their talents and aspirations. We envision a society where the talents of OSY candidates are recognized and valued, contributing to a thriving workforce and sustainable growth. By pioneering a platform that bridges the gap between skills and job vacancies, we aspire to empower a generation of OSY individuals, transforming their lives and shaping a more inclusive and prosperous future.
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* ABOUT US END --------------------------------------------- */}

      {/* FOOTER START --------------------------------------------- */}

      <div className="footer bg-gray-200 pl-2 h-72 pt-20">
  <div className="secContainer container flex justify-between items-center pl-20 text-sm">
    <div data-aos="fade-up" data-aos-duration="2000" className="logoDiv pl-8">
      <div data-aos="fade-up" data-aos-duration="2000" className="footerLogo pb-2">
        <a href="#" className="logo">
          <img src={footerimg} className="cursor-pointer items-center justify-center w-44" />
        </a>
      </div>
      <div className="socials flex gap-2 ml-9">
        <ImFacebook className="icon text-3xl bg-green-800 text-white rounded-full p-2 hover:bg-green-600"/>
        <BsTwitter className="icon text-3xl bg-green-800 text-white rounded-full p-2 hover:bg-green-600"/>
        <AiFillInstagram className="icon text-3xl bg-green-800 text-white rounded-full p-2 hover:bg-green-600"/>
      </div>
    </div>

    <div data-aos="fade-up" data-aos-duration="3000" className="footerLinks flex flex-col items-center">
      <span className="linkTitle pb-1 font-semibold">
        Quick Links
      </span>
      <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
        <a href="#" className="text-gray-500 hover:text-green-800">Home</a>
      </li>
      <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
        <a href="#" className="text-gray-500 hover:text-green-800">About</a>
      </li>
      <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
        <a href="#" className="text-gray-500 hover:text-green-800">Contact</a>
      </li>
      <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
        <a href="#" className="text-gray-500 hover:text-green-800">Privacy Policy</a>
      </li>
      <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
        <a href="#" className="text-gray-500 hover:text-green-800">Terms & Conditions</a>
      </li>
    </div>

    <div data-aos="fade-up" data-aos-duration="4000" className="footerLinks flex flex-col  items-center">
      <span className="linkTitle pb-1 font-semibold">
        Quick Links
      </span>
      <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
        <a href="#" className="text-gray-500 hover:text-green-800">Home</a>
      </li>
      <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
        <a href="#" className="text-gray-500 hover:text-green-800">About</a>
      </li>
      <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
        <a href="#" className="text-gray-500 hover:text-green-800">Contact</a>
      </li>
      <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
        <a href="#" className="text-gray-500 hover:text-green-800">Privacy Policy</a>
      </li>
      <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
        <a href="#" className="text-gray-500 hover:text-green-800">Terms & Conditions</a>
      </li>
    </div>

    <div data-aos="fade-up" data-aos-duration="5000" className="footerLinks flex flex-col items-center">
      <span className="linkTitle pb-1 font-semibold">
        Contact Us
      </span>
      <span className="phone text-gray-500"> (02) 8911 0964 </span>
      <span className="email text-gray-500"> info@tip.edu.ph </span>
      <span className="address text-gray-500"> 938 Aurora Blvd, Cubao, Quezon City, Metro Manila, PH </span>
    </div>
  </div>
</div>

      {/* FOOTER END --------------------------------------------- */}
    </>
    
    

  );
}

export default AboutPage