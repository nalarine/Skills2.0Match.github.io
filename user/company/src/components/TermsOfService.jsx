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
            TERMS OF USE OF AGREEMENT
          </h1>
        </div>
      </div>

      <section className="pt-80 bg-gray-50">
  <div className="container mx-auto p-8 text-left mt-[40%] md:mt-[40%] lg:mt-80 xl:mt-[5%] p-6 md:p-12 xl:p-16">
    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <div>
          <p className="mb-4 text-gray-700">
          By accessing and using our Site, you agree to comply with and be legally bound by the following Terms of Use. Please review the following terms carefully. If you do not agree to these terms, you should not use this site.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">1. Acceptance of Agreement</h3>
        <div>
          <p className="mb-4 text-gray-700">
          You agree to the terms and conditions outlined in the Terms of Use Agreement (“Agreement”). This Agreement constitutes the entire and only agreement between the System and you, and supersedes all prior or contemporaneous agreements, representations, warranties and understandings with respect to the Site, the content, products or services provided by or through the Site, and the subject matter of this Agreement. This Agreement may be amended at any time by us from time to time without prior notice to you.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h4 className="text-lg font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">2. Copyright</h4>
        <div>
          <p className="mb-4 text-gray-700">
          The contents, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary (including but not limited to intellectual property) rights.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h4 className="text-lg font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">4. Limited License or Permitted Use</h4>
        <div>
          <p className="mb-4 text-gray-700">
          You are granted a non-exclusive, non-transferable, revocable license (a) to access and use the Site strictly in accordance with this Agreement; (b) to use the Site solely for internal, personal, non-commercial purposes; and (c) to print out discrete information from the Site solely for internal, personal, non-commercial purposes and provided that you maintain all copyright and other policies contained therein. 
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">5. Registration</h3>
        <div>
          <p className="mb-4 text-gray-700">
          Certain sections of, or offerings from, the Site may require you to register. If registration is requested, you agree to provide us with accurate, complete registration information. Your registration must be done using accurate information. Each registration is for your personal use only. You are responsible to prevent unauthorized use of the Site using your registration information.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">6. Errors, Corrections and Changes</h3>
        <div>
          <p className="mb-4 text-gray-700">
          We do not represent or warrant that the Site will be error-free, free of viruses or other harmful components, or that defects will be corrected. We do not represent or warrant that the information available on or through the Site will be correct, accurate, timely or otherwise reliable. We may make changes to the features, functionality or content of the Site at any time without any notification in advance. We reserve the right in our sole discretion to edit or delete any documents, information or other content appearing on the Site.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">7. Third Party Content</h3>
        <div>
          <p className="mb-4 text-gray-700">
          Third party content from member agencies may appear on the Site or may be accessible via links from the Site. We are not responsible for and assume no liability for any mistakes, misstatements of law, defamation, omissions, falsehood in the statements, opinions, representations or any other form of content thereon. We are not liable for any damages or loss arising from access to those websites. Use of the hyperlinks and access to such linked websites are entirely at your own risk. You understand that the information and opinions in the third party content represent solely the thoughts of the owner and is neither endorsed by nor does it necessarily reflect our belief.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">8. Unlawful Activity</h3>
        <div>
          <p className="mb-4 text-gray-700">
          We reserve the right to investigate complaints or reported violations of this Agreement and to take any action we deem appropriate, including but not limited to reporting any suspected unlawful activity to law enforcement officials, regulators, or other third parties and disclosing any information necessary or appropriate to such persons or entities relating to your profile, email addresses, usage history, posted materials, IP addresses and traffic information.
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">9. Use of Information</h3>
        <div>
          <p className="mb-4 text-gray-700">
          We reserve the right, and you authorize us, to the use and assignment of all information regarding Site used by you and all information provided by you in any manner consistent with our Privacy Policy. 
          </p>
        </div>
      </div>
    </div>

    <div className="privacy-statement rounded-lg bg-green-200 shadow-md mb-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-gray-500 pb-2">10. Privacy Policy</h3>
        <div>
          <p className="mb-4 text-gray-700">
          Our Privacy Policy, as it may change from time to time, is a part of this Agreement.
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