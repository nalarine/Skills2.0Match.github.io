import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Use the actual image paths
// import retail from '../../assets/retail.png'
// import img1 from '../../assets/customer.jpg'
import img2 from '../../assets/foodservice.png'
import img3 from '../../assets/construction.jpg'
import img4 from '../../assets/domestic.png'
import img5 from '../../assets/informal.jpg'
import img6 from '../../assets/manufacturing.jpg'
import img7 from '../../assets/security.jpg'
import img8 from '../../assets/delivery.jpg'
import img9 from '../../assets/warehouse.jpg'
// import img10 from '../../assets/childcare.jpg'
// import img11 from '../../assets/data entry.jpg'
// import img12 from '../../assets/entrylevel.jpg'
// import img13 from '../../assets/fitness.jpg'
import img14 from '../../assets/event staff.jpg'
import img15 from '../../assets/photography.jpg'
import img16 from '../../assets/research.jpg'
import img17 from '../../assets/social worker.jpg'
import img18 from '../../assets/pet.jpg'

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
    destTitle: 'Construction and Manual Labor',
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
    destTitle: 'Informal Sector Jobs',
    desc: 'Unregulated and often temporary work across various sectors, often without formal contracts or protections.',
  },
  {
    id: 7,
    imgSrc: img6,
    destTitle: 'Manufacturing and Factory Work',
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
    desc: ' Positions responsible for managing and organizing inventory in storage facilities.',
  },
  // Add other data items
]

const NewestDeals = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 })
  }, [])

  return (
    <section className="popular section container mt-[220%] md:mt-[40%] lg:mt-80 xl:mt-[45%] p-6 md:p-12 xl:p-16 min-h-screen">
    <div className="secContainer">
      <div className="secHeader">
        <div className="textDiv" data-aos="fade-right" data-aos-duration="2500">
          <h2 className="secTitle text-left font-bold text-2xl md:text-3xl mb-4 md:mt-8">
            You deserve to love your job – let's find it.
          </h2>
        </div> 
      </div>

      <div className="mainContent grid gap-4 grid-cols-1 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {/* Map through your data array */}
      {Data.map(({ id, imgSrc, destTitle, desc }) => (
        <div key={id} data-aos="fade-up" className="singleDestination mb-6 text-center md:text-left">
          <div className="destImage relative overflow-hidden rounded-lg shadow-md">
            {/* Display your image */}
            <img src={imgSrc} alt="TitleImage" className="object-cover w-full h-40 md:h-52" />

            {/* Overlay info */}
            <div className="overlayInfo absolute inset-0 flex flex-col justify-center items-left px-4 text-white bg-black bg-opacity-70 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <h3 className="text-l font-bold mb-1 md:text-xl">{destTitle}</h3>
              <p className="text-xs md:text-sm">{desc}</p>
            </div>
          </div>

          {/* Footer section */}
          <div className="destFooter p-2">
            <div className="destText">
              <h6 className="font-semibold text-sm md:text-base">{destTitle}</h6>
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