import React, { useState, useEffect } from 'react';
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone } from 'react-icons/hi';
import { ImFacebook } from 'react-icons/im';
import { BsTwitter } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import footerimg from '../../assets/header.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const ContactPage = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/api-v1/contacts', formData);
      console.log('Form submitted successfully:', response.data);
      alert('Form submitted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(rgba(33,33,33,0.522), rgba(33,33,33,0.522)) no-repeat, url('../../../src/assets/contact.png') center / cover", height: '100vh', zIndex: 2 }} />

      <section>
        <div className="secContainer container mx-auto p-10">
          {/* Your content goes here */}
        </div>
      </section>

      <div className="homeText text-center relative z-10">
        <h1 data-aos="fade-up" className="title text-white text-6xl font-semibold m-0 flex flex-col items-center mt-20 pl-42 p-8">
          Message Us
        </h1>
        <p data-aos="fade-up" data-aos-duration="2500" className="subTitle text-white opacity-9 text-xl font-weight-300 py-1 mb-5 max-w-70 mx-auto pl-42">
          We look forward to hearing from you and addressing your concern to us!
        </p>
      </div>

      <div className="contact-container md:grid md:grid-cols-2 md:grid-rows-1 md:gap-8 px-8 rounded-lg shadow-md text-black flex flex-col md:flex-row md:justify-between mt-[80%] md:mt-[40%] lg:mt-80 xl:mt-[25%] p-6 md:p-12 xl:p-16 min-h-scree">
        <div data-aos="fade-up" data-aos-duration="2000" className="message-form md:row-span-3 p-5 bg-green-300 rounded-xl shadow-sm mb-5">
          {/* Adjusted margin top for mobile devices */}
          <h2 className="text-3xl font-bold mb-5 text-neutral-800">Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-field mb-5">
              <input type="text" name="firstName" placeholder="First Name" className="w-full p-2.5 rounded-md border border-solid border-gray-400" onChange={handleChange} />
            </div>
            <div className="form-field mb-5">
              <input type="text" name="lastName" placeholder="Last Name" className="w-full p-2.5 rounded-md border border-solid border-gray-400" onChange={handleChange} />
            </div>
            <div className="form-field mb-5">
              <input type="email" name="email" placeholder="Email Address" className="w-full p-2.5 rounded-md border border-solid border-gray-400" onChange={handleChange} />
            </div>
            <div className="form-field mb-5">
              <input type="tel" name="mobileNumber" placeholder="Mobile/Telephone Number" className="w-full p-2.5 rounded-md border border-solid border-gray-400" onChange={handleChange} />
            </div>
            <div className="form-field mb-5">
              <textarea name="message" placeholder="Message" className="w-full p-2.5 rounded-md border border-solid border-gray-400 h-36" onChange={handleChange}></textarea>
            </div>
            <div className="form-field mb-5 w-20 text-center py-2 text-md rounded-lg bg-green-500 cursor-pointer hover:bg-green-900">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>

        <div className="contact-info-map md:mt-0">
          <div data-aos="fade-right" data-aos-duration="2500" className="contact-info p-5 bg-[#D0F0C0] rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-neutral-800 mb-5">Contact Us</h1>
            <div className="info-item flex my-4 mx-0 text-neutral-800 items-center">
              <HiOutlineMail className="icon mr-2.5 align-middle min-w-7 h-7 text-green-500 flex justify-center items-center rounded-full mr-3.5" />
              <p>info@tip.edu.ph</p>
            </div>
            <div className="info-item flex my-4 mx-0 text-neutral-800 items-center">
              <HiOutlineLocationMarker className="icon mr-0.5 align-middle min-w-7 h-7 text-green-500 flex justify-center items-center rounded-full mr-3.5" style={{ fontSize: 1 }} />
              <p className="items-center mr-3.5">938 Aurora Blvd, Cubao, Quezon City, Metro Manila, Philippines</p>
            </div>
            <div className="info-item flex my-4 mx-0 text-neutral-800 items-center">
              <HiOutlinePhone className="icon mr-2.5 align-middle min-w-7 h-7 text-green-500 flex justify-center items-center rounded-full mr-3.5" />
              <p>(123) 456-7890</p>
            </div>
          </div>
          <div data-aos="fade-right" data-aos-duration="3000" className="map p-2.5">
            <iframe className="w-full h-80 mt-5 rounded-md" title="Google Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.5310646710013!2d121.05914687400974!3d14.625768976462146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b796aecb8763%3A0xaa026ea7350f82e7!2sTechnological%20Institute%20of%20the%20Philippines%20-%20Quezon%20City!5e0!3m2!1sen!2sph!4v1693490583960!5m2!1sen!2sph" allowFullScreen />
          </div>
        </div>
      </div>
      
      <br>
      </br>

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

export default ContactPage;