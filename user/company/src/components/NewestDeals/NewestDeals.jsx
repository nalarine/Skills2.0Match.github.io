import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

import about from '../../assets/about 1.0.png';
import img2 from '../../assets/foodservice.png';
import img3 from '../../assets/construction.jpg';
import img4 from '../../assets/domestic.png';
import img5 from '../../assets/informal.jpg';
import img6 from '../../assets/manufacturing.jpg';
import img7 from '../../assets/security.jpg';
import img8 from '../../assets/delivery.jpg';
import img9 from '../../assets/warehouse.jpg';
import match from '../../assets/match.gif';

const Data = [
  {
    id: 3,
    imgSrc: img2,
    destTitle: 'Food Service',
    desc: 'Positions in the food and hospitality industry, where employees provide food, accommodation, and service to guests.',
  },
  {
    id: 4,
    imgSrc: img3,
    destTitle: 'Construction Worker',
    desc: 'Labor-intensive jobs in construction and related fields that require physical work.',
  },
  {
    id: 5,
    imgSrc: img4,
    destTitle: 'Domestic Labor',
    desc: 'Household-related occupations, such as cleaning, cooking, and caregiving, usually performed in private residences.',
  },
  {
    id: 6,
    imgSrc: img5,
    destTitle: 'Part-time Jobs',
    desc: 'Unregulated and often temporary work across various sectors, often without formal contracts or protections.',
  },
  {
    id: 7,
    imgSrc: img6,
    destTitle: 'Manufacturing and Factory Worker',
    desc: 'Employment in factories and production facilities, involving the assembly or manufacturing of goods.',
  },
  {
    id: 8,
    imgSrc: img7,
    destTitle: 'Security Guard Services',
    desc: 'Roles focused on protecting individuals and property through surveillance and security measures.',
  },
  {
    id: 9,
    imgSrc: img8,
    destTitle: 'Driver',
    desc: 'Jobs involving the transportation and delivery of goods to customers or businesses.',
  },
  {
    id: 10,
    imgSrc: img9,
    destTitle: 'Warehouse Worker',
    desc: 'Positions responsible for managing and organizing inventory in storage facilities.',
  },
  // Add other data items
];

const NewestDeals = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
<<<<<<< Updated upstream
    <div className="flex flex-col md:flex-row mt-[620px]">
      {/* About Section */}
      <section className="about section py-12 w-full md:w-1/2 ">
        <div className="secContainer container mx-auto px-6 sm:top-[30%]">
          <div className="mainContent grid gap-8 grid-cols-1">
            <div
              className="videoCard mt-2 p-8 bg-cover bg-center rounded-xl"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(33,33,33,0.522), rgba(33,33,33,0.522)), url(../../../src/assets/bg.jpg)',
              }}
            >
              <div
                // data-aos="fade-right"
                // data-aos-duration="2000"
                className="text-white mb-8"
              >
                <h2 className="text-4xl font-bold mb-4">
                  Crafting Careers, Inspiring Success
                </h2>
                <p className="opacity-70">
                  Harness your unique strengths and abilities as you find the
                  tools to build your own future. With each career crafted, you
                  inspire a journey of success that resonates with your
                  individuality.
                </p>
              </div>
              <div 
                // data-aos="fade-left" 
                // data-aos-duration="2000"
              >
                <img
                  src={about}
                  alt="About"
                  className="w-full h-48 rounded-xl object-cover border-4 border-green-500"
                />
              </div>
            </div>
          </div>
            
          <div className='mt-24'>
            <blockquote class="text-5xl italic font-semibold text-gray-900 dark:text-white">
                <svg class="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                </svg>
                <p>Youth, Skills, Success: <span class="text-7xl font-bold font-serif">Let's Match!</span> </p>
            </blockquote>
            <div 
                // data-aos="fade-left" 
                // data-aos-duration="2000"
              >
                <img
                  src={match}
                  alt="About"
                  className="w-[90%] h-[90%] -mt-28 left-[10%]"
                />
              </div>
          </div>
=======
    <section className="popular section container mt-[220%] md:mt-[40%] lg:mt-80 xl:mt-[45%] p-6 md:p-12 xl:p-16 min-h-screen">
    <div className="secContainer">
      <div className="secHeader">
        <div className="textDiv" data-aos="fade-right" data-aos-duration="2500">
          <h2 className="secTitle text-left font-bold text-2xl md:text-3xl mb-4 md:mt-8">
          Find Your Perfect Job
          </h2>
        </div> 
      </div>
>>>>>>> Stashed changes

        </div>
      </section>


      {/* Newest Deals Section */}
      <section className="popular section container mx-auto py-16 px-6 md:px-12 xl:px-16 min-h-screen w-full md:w-1/2">
        <div className="secContainer">
          <div className="secHeader mb-12">
            <div
              className="textDiv"
              // data-aos="fade-right"
              data-aos-duration="2500"
            >
              <h2 className="secTitle text-left font-bold text-3xl md:text-4xl">
                Find Your Perfect Job
              </h2>
            </div>
          </div>

          <div className="mainContent grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
            {Data.map(({ id, imgSrc, destTitle, desc }) => (
              <div
                key={id}
                // data-aos="fade-up"
                className="singleDestination text-center md:text-left"
              >
                <div className="destImage relative overflow-hidden rounded-lg shadow-md mb-4">
                  <img
                    src={imgSrc}
                    alt={destTitle}
                    className="object-cover w-full h-40 md:h-[150px]"
                  />
                  <div className="overlayInfo absolute inset-0 flex flex-col justify-center items-start p-4 text-white bg-black bg-opacity-70 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <h3 className="text-lg font-bold mb-2">{destTitle}</h3>
                    <p className="text-sm">{desc}</p>
                  </div>
                </div>
                <div className="destFooter p-2">
                  <h6 className="font-semibold text-base">{destTitle}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewestDeals;
