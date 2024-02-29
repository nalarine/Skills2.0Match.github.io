import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Use the actual image paths
import retail from '../../assets/retail.png';
import img1 from '../../assets/customer.jpg'
import img2 from '../../assets/food.jpg'
import img3 from '../../assets/construction.jpg'
import img4 from '../../assets/domestic.png'
import img5 from '../../assets/informal.jpg'
import img6 from '../../assets/manufacturing.jpg'
import img7 from '../../assets/security.jpg'
import img8 from '../../assets/delivery.jpg'
import img9 from '../../assets/warehouse.jpg'
import img10 from '../../assets/childcare.jpg'
import img11 from '../../assets/data entry.jpg'
import img12 from '../../assets/entrylevel.jpg'
import img13 from '../../assets/fitness.jpg'
import img14 from '../../assets/event staff.jpg'
import img15 from '../../assets/photography.jpg'
import img16 from '../../assets/research.jpg'
import img17 from '../../assets/social worker.jpg'
import img18 from '../../assets/pet.jpg'

const Data = [
  {
    id: 1,
    imgSrc: retail,
    destTitle: 'Retail and Sales',
    desc: 'Jobs involving the sale of products or services to customers, often in stores or online.',
  },
  {
    id: 2,
    imgSrc: img1,
    destTitle: 'Customer Service',
    desc:'Roles dedicated to assisting and resolving customer inquiries to ensure a positive experience.',
  },
  {
    id: 3,
    imgSrc: img2,
    destTitle: 'Food Service and Hospitality',
    desc:'Positions in the food and hospitality industry, where employees provide food, accommodation, and service to guests.',
  },
  {
    id: 4,
    imgSrc: img3,
    destTitle: 'Construction and Manual Labor',
    desc:'Labor-intensive jobs in construction and related fields that require physical work.',
  },
  {
    id: 5,
    imgSrc: img4,
    destTitle: 'Domestic Labor',
    desc:'Household-related occupations, such as cleaning, cooking, and caregiving, usually performed in private residences.',
  },
  {
    id: 6,
    imgSrc: img5,
    destTitle: 'Informal Sector Jobs',
    desc:'Unregulated and often temporary work across various sectors, often without formal contracts or protections.',
  },
  {
    id: 7,
    imgSrc: img6,
    destTitle: 'Manufacturing and Factory Work',
    desc:'Employment in factories and production facilities, involving the assembly or manufacturing of goods.',
  },
  {
    id: 8,
    imgSrc: img7,
    destTitle: 'Security Guard Services',
    desc:'Roles focused on protecting individuals and property through surveillance and security measures.',
  },
  {
    id: 9,
    imgSrc: img8,
    destTitle: 'Delivery Driver',
    desc:'Jobs involving the transportation and delivery of goods to customers or businesses.',
  },
  {
    id: 10,
    imgSrc: img9,
    destTitle: 'Warehouse Worker',
    desc:' Positions responsible for managing and organizing inventory in storage facilities.',
  },
  {
    id: 11,
    imgSrc: img10,
    destTitle: 'Childcare Assistant',
    desc:'Roles in childcare and early childhood education, assisting in caring for and nurturing children.',
  },
  {
    id: 12,
    imgSrc: img11,
    destTitle: 'Data Entry Clerk',
    desc:'Jobs that entail inputting and managing data in computer systems.',
  },
  {
    id: 13,
    imgSrc: img12,
    destTitle: 'Entry-Level Tradesperson',
    desc:'Beginner-level positions in skilled trades like plumbing, electrical work, or carpentry.',
  },
  {
    id: 14,
    imgSrc: img13,
    destTitle: 'Fitness Instructor',
    desc:'Roles centered on leading and guiding fitness and exercise activities.',
  },
  {
    id: 15,
    imgSrc: img14,
    destTitle: 'Event Staff',
    desc:'Workers responsible for various tasks at events, including setup, customer service, and cleanup.',
  },
  {
    id: 16,
    imgSrc: img15,
    destTitle: 'Photography Assistant',
    desc:'Jobs supporting photographers in studios or on-location shoots.',
  },
  {
    id: 17,
    imgSrc: img16,
    destTitle: 'Research Assistant',
    desc:'Positions providing support to researchers in conducting experiments, collecting data, and aiding research projects.',
  },
  {
    id: 18,
    imgSrc: img17,
    destTitle: 'Social Service Aid',
    desc:'Jobs focused on assisting individuals and communities in need, often in social work or counseling contexts.',
  },
  {
    id: 19,
    imgSrc: img18,
    destTitle: 'Pet Caretaker',
    desc:'Roles involving the care and well-being of animals, such as pet sitting and grooming.',
  },
  // Add other data items
];

const NewestDeals = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <section className="popular section container mt-96 p-8 justify-center items-center">
      <div className="secContainer">
        <div className="secHeader flex">
          <div data-aos="fade-right" data-aos-duration="2500" className="textDiv">
            <h2 className="secTitle font-bold text-3xl mt-72 mb-9">
              You deserve to love your job – let's find it.
            </h2>
          </div>
        </div>

        <div className="mainContent grid gap-x-10 gap-4 grid-cols-5 grid-rows-4 ml-2">
          {/* Map through your data array */}
          {Data.map(({ id, imgSrc, destTitle, desc }) => (
            <div
              key={id}
              data-aos="fade-up"
              className="singleDestination w-56 h-72 mb-5 text-l font-semibold overflow-hidden border rounded-2xl shadow-md group"
            >
              <div className="destImage relative overflow-hidden h-52 transition-opacity duration-300">
                {/* Display your image */}
                <img src={imgSrc} alt="TitleImage" className="object-cover h-52" />

                {/* Overlay info */}
                <div
                  className="overlayInfo absolute bottom-0 w-full h-full flex flex-col justify-center items-left px-4 text-white bg-zinc-950 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-opacity-70"               
                >
                  <h3 className="text-left text-l font-bold pt-5">{destTitle}</h3>
                  <p className=" text-xs font-normal pt-2">{desc}</p>
                  <div className="flex items-center justify-end w-full p-3">
                    <svg
                      className="rounded-full bg-green-800 p-2 w-10 h-10 text-white-800 dark:text-white transition duration-300 transform hover:bg-slate-600 hover:border-green-800 hover:text-green-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Footer section */}
              <div className="destFooter p-4">
                <div className="destText flex justify-between">
                  <h6>{destTitle}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewestDeals;
