import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import icon1 from '../assets/discover.png';
import icon2 from '../assets/sched.png';
import icon3 from '../assets/success.png';
import about from '../assets/about 1.0.png';

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="about section">
      <div className="secContainer">
        <h2
          data-aos="fade-right"
          data-aos-duration="2000"
          className="title text-black line-clamp-5 ml-14 mb-3 mt-2 pb-8 pl-4 text-3xl font-bold font-poppins"
        >
          Join, Work, and Succeed
        </h2>

        <div className="mainContent container ml-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="singleItem text-center flex flex-col items-center"
          >
            <img src={icon1} alt="" className="w-20 h-20 mb-3" />
            <h3 className="mb-3 font-bold font-poppins text-neutral-700 text-xl">
              Discover possibilities at every step of your adventure
            </h3>
            <p className="font-poppins text-sm text-neutral-500">
              Embrace the journey of self-discovery as you find your path to a
              brighter future. Unleash your hidden potential and seize
              opportunities that will shape the destiny you envision.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="2500"
            className="singleItem text-center flex flex-col items-center"
          >
            <img src={icon2} alt="" className="w-20 h-20 mb-3" />
            <h3 className="mb-3 font-bold font-poppins text-neutral-700 text-xl">
              Take charge of your work schedule, location, and methods.
            </h3>
            <p className="font-poppins text-sm text-neutral-500">
              Empowers individuals with the authority to determine when, where,
              and how they work, promoting a culture of flexibility and
              self-determination, ultimately enhancing their work-life balance
              and productivity.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="singleItem text-center flex flex-col items-center"
          >
            <img src={icon3} alt="" className="w-20 h-20 mb-3" />
            <h3 className="mb-3 font-bold font-poppins text-neutral-700 text-xl">
              Building Pathways to Success for Out-of-School Youth
            </h3>
            <p className="font-poppins text-sm text-neutral-500">
              Dedicated effort to create structured avenues and support systems
              for young people who are not currently engaged in formal
              education, providing them with opportunities and resources to
              chart a path towards a successful future and brighter prospects.
            </p>
          </div>
        </div>

        <div
          className="videoCard container mt-14 ml-10 mb-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(33,33,33,0.522), rgba(33,33,33,0.522)), url('../../../src/assets/bg.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover', // Adjust this property to position the image as desired
          }}
        >
          <div className="cardContent grid gap-2 p-4 mx-14 md:grid-cols-2 items-center justify-center">
            <div
              data-aos="fade-right"
              data-aos-duration="2000"
              className="cardText text-white mr-24"
            >
              <h2 className="font-semibold font-poppins text-4xl pb-3">
                Crafting Careers, Inspiring Success
              </h2>
              <p className="opacity-70 text-sm font-normal font-poppins leading-6">
                Harness your unique strengths and abilities as you find the
                tools to build your own future. With each career crafted, you
                inspire a journey of success that resonates with your
                individuality.
              </p>
            </div>

            <div
              data-aos="fade-left"
              data-aos-duration="2000"
              className="cardVideo"
            >
              {/* Replace 'about' with the actual image import */}
              <img
                src={about}
                alt=""
                className="w-full h-48 border-4 border-green-500 overflow-hidden rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
