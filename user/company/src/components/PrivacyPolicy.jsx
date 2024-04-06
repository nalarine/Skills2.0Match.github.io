import React, { useState, useEffect } from 'react';
import { ImFacebook } from 'react-icons/im';
import { BsTwitter } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import Aos from 'aos';
import 'aos/dist/aos.css';
import footerimg from '../assets/header.png';

const PrivacyPolicy = () => {
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
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            "linear-gradient(rgba(33,33,33,0.522), rgba(33,33,33,0.522)) no-repeat, url('../../src/assets/header2.png') center / cover",
          height: '50vh',
          zIndex: 2,
        }}
      >
        <div className="flex justify-center items-center h-full">
          <h1
            data-aos="fade-up"
            className="title text-white text-6xl font-semibold animate-bounce" // Example animation class
          >
            PRIVACY POLICY
          </h1>
        </div>
      </div>

      <section className="pt-80 bg-gray-50">
  <div className="container mx-auto p-8 text-left">
    <div className="privacy-statement rounded-lg bg-white shadow-md mb-8">
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">PRIVACY STATEMENT</h2>
        <div>
          <p className="mb-4 text-gray-700">
            We assure our users that their shared information and data will never be sold or rented. We care about your privacy and spam is something that we detest. By agreeing with the Privacy Statement, you permit Skills2.0Match to use your personal information as stated in this Privacy Statement when you use this website.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-white shadow-md mb-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-gray-200 pb-2">PERSONAL INFORMATION</h3>
        <div>
          <p className="mb-4 text-gray-700">
            We may collect and use the gained personal information for the following purposes:
            <ul className="list-disc pl-4 text-gray-700">
              <li>Improve our support services</li>
              <li>Improve user functionality and experience</li>
            </ul>
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-white shadow-md mb-8">
      <div className="p-8">
        <h4 className="text-lg font-semibold mb-2 text-gray-800 border-b-2 border-gray-200 pb-2">Company</h4>
        <div>
          <p className="mb-4 text-gray-700">
            The company must provide their personally identifiable information such as the company name, location, company logo, and description about their company.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-white shadow-md mb-8">
      <div className="p-8">
        <h4 className="text-lg font-semibold mb-2 text-gray-800 border-b-2 border-gray-200 pb-2">Applicant</h4>
        <div>
          <p className="mb-4 text-gray-700">
            The applicant must provide with their name, last name, location, email, about, location, and profile picture. They can also enter their skills and show the jobs recommended for them.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-white shadow-md mb-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-gray-200 pb-2">EMAIL</h3>
        <div>
          <p className="mb-4 text-gray-700">
            Skills2.0Match does not sell or rent users' email addresses to anyone. We ensure that only verified users will be able to enter the website and companies that have been only approved by the admin will be able to post a job.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-white shadow-md mb-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-gray-200 pb-2">CONTACT INFORMATION</h3>
        <div>
          <p className="mb-4 text-gray-700">
            If you have any concerns or questions about our Privacy Statement or any queries, you may contact us through the following:
          </p>
          <ul className="list-disc pl-4 mb-4 text-gray-700">
            <li>E-mail: your@email.com</li>
            <li>Phone Number: +123456789</li>
            <li>Address: Your Address</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

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
    </>
  );
};

export default PrivacyPolicy;
