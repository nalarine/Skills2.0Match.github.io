import React, { useState, useEffect } from 'react';
import { ImFacebook } from 'react-icons/im';
import { BsTwitter } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import Aos from 'aos';
import 'aos/dist/aos.css';
import footerimg from '../assets/header.png';

const TermsOfService = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
      className="absolute top-0 left-0 h-full mt-24"
      style={{
        background:
          "linear-gradient(rgba(33,33,33,0.522), rgba(33,33,33,0.522)) no-repeat, url('../../src/assets/terms.png') center / cover",
        height: '50vh',
        zIndex: 2,
        left: '1.5%', // Adjust the left positioning as needed
        width: '97%',
        borderRadius: '15px', // Adjust the border radius as needed
      }}
    >
        <div className="flex justify-center items-center h-full">
          <h1
            data-aos="fade-up"
            className="title text-white text-6xl font-semibold" // Example animation class
          >
            TERMS AND CONDITIONS
          </h1>
        </div>
      </div>

      <section className="pt-80 bg-gray-50">
  <div className="container mx-auto p-8 text-left mt-[40%] md:mt-[40%] lg:mt-80 xl:mt-[5%] p-6 md:p-12 xl:p-16">
    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <div>
          <p className="mb-4 text-gray-700">
          The stated Terms and Conditions will govern your use of Skills2.0Match as an applicant and a company and any related services offered by the website. By accessing or using Skills2.0Match, you acknowledge that these Terms will take effect once you started.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">USE OF SERVICE</h3>
        <div>
          <p className="mb-4 text-gray-700">
          Skills2.0Match is an automated skills matching system specifically designed to help Out-of-School Youth to have wider access to various job opportunites based on the skills they have.  By using out services, you agree to use the platform only based on its intended purpose.
            To be able to use the services for the applicant, you must be atleast 18 to 24 yeaars old.  If you are accessing the platform to share job opportunities on behalf of your company or organization, you claim and permit to bindi such etity and terms.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h4 className="text-lg font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">JOB MATCHING AND RECOMMENDATION</h4>
        <div>
          <p className="mb-4 text-gray-700">
          The Skills2.0Match utilizes Regex Algorithm to mach OSY's users with job opportunities based on the skills, qualification, and preferences entered.  As we strive to produce precise, accurate, and relevant jobs, we do not guarantee employment or job placement.
        We encourage our applicants to analyze and review job listings that matched their profile and apply on jobs that align and suites their preference and interests.  Skills2.0Match is not responsible for the results of any job application or employment that walkthrough or facilitated by the platform.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h4 className="text-lg font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">INTELLECTUAL PROPERTY</h4>
        <div>
          <p className="mb-4 text-gray-700">
          The service provided by the Skills2.0Match is and will continue to be a sole property of the said website and its licensors and developers, along with its features, functionality, and content.  The laws of copyright and trademark in the Philippines will provide protection against individuas who plan to copy or distribute services without prior written approval.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">TERMINATION</h3>
        <div>
          <p className="mb-4 text-gray-700">
          We may terminate or suspend your accout and access immediately, wihtout prior notice if breach of terms has been proven.  Upon termination, your access to any service and to your account will be immediately ceased. 
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">CHANGES</h3>
        <div>
          <p className="mb-4 text-gray-700">
          We reserve and maintain the authority to amend or update these Terms at any instance, in our sole discretion.  Before doing any modification, we will send a notice at least 30 days prior to any new terms that will take effect if the adjustment is substantial.  Our sole judgment will be considered to identify and deciding what changes are qualified material.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<div className="footer bg-gray-200 pl-2 py-6 md:py-10 lg:py-12">
      <div className="secContainer container flex flex-col md:flex-row justify-between items-center md:items-start px-4 md:px-20 text-sm">
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className="logoDiv flex flex-col items-center md:items-start"
        >
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="footerLogo pb-2"
          >
            <a href="#" className="logo">
              <img
                src={footerimg}
                className="cursor-pointer w-36 md:w-44"
                alt="Footer Logo"
              />
            </a>
          </div>
          <div className="socials flex gap-2 ml-4">
            <ImFacebook className="icon text-3xl bg-green-800 text-white rounded-full p-2 hover:bg-green-600" />
            <BsTwitter className="icon text-3xl bg-green-800 text-white rounded-full p-2 hover:bg-green-600" />
            <AiFillInstagram className="icon text-3xl bg-green-800 text-white rounded-full p-2 hover:bg-green-600" />
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="4000"
          className="footerLinks flex flex-col items-center md:items-start"
        >
          <span className="linkTitle pb-1 font-semibold mt-6">Quick Links</span>
          <ul className="text-center md:text-left">
            <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
              <a href="/user-auth" className="text-gray-500 hover:text-green-800">
                Home
              </a>
            </li>
            <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
              <a href="/AboutPage" className="text-gray-500 hover:text-green-800">
                About
              </a>
            </li>
            <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
              <a href="/ContactPage" className="text-gray-500 hover:text-green-800">
                Contact
              </a>
            </li>
            <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
              <a href="/privacy-policy" className="text-gray-500 hover:text-green-800">
                Privacy Policy
              </a>
            </li>
            <li className="hover:transform hover:translate-x-2 list-none transition ease-in-out">
              <a href="/terms-of-service" className="text-gray-500 hover:text-green-800">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="5000"
          className="footerLinks flex flex-col items-center md:items-start"
        >
          <span className="linkTitle pb-1 font-semibold mt-6">Contact Us</span>
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
  );
};

export default TermsOfService;
