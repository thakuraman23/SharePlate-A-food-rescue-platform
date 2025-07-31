import React, { useRef } from "react";
import { useNavigate } from "react-router";
import LandingImage from "../components/images/landing_image.jpg";
import AboutImage from "../components/images/About.webp"; // Replace with the actual image path

const Home = () => {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#ECE852] min-h-screen flex flex-col items-center p-10">
      {/* Header */}
      <h1 className="text-[#5CB338] text-6xl font-extrabold mb-4">SharePlate</h1>
      <p className="text-black text-lg max-w-lg text-center mb-6">
        Join hands to eliminate hunger and provide food to those in need.
      </p>

      {/* Main Section */}
      <div className="bg-black rounded-lg shadow-lg w-full max-w-4xl relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 w-full h-[500px] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${LandingImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-[500px] p-8">
          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { text: "RESTAURANT", path: "/restaurant/login" },
              { text: "VOLUNTEER", path: "/volunteer/login" },
              { text: "ABOUT", action: () => scrollToSection(aboutRef) },
              { text: "CONTACT", action: () => scrollToSection(contactRef) },
            ].map(({ text, path, action }) => (
              <button
                key={text}
                onClick={path ? () => navigate(path) : action}
                className="bg-[#FFC145] text-[#FB4141] text-xl font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300 ease-in-out"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="w-full max-w-4xl mt-20 p-10 bg-[#ECE852] rounded-lg shadow-lg flex flex-col md:flex-row items-center"
      >
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
  <img
    src={AboutImage}
    alt="About SharePlate"
    className="rounded-lg shadow-lg w-64 h-64 object-cover"
  />
</div>


        {/* Right: Text */}
        <div className="w-full md:w-1/2 md:pl-10 mt-6 md:mt-0">
          <h2 className="text-4xl font-bold text-[#5CB338] mb-4">About Us</h2>
          <p className="text-black text-lg leading-relaxed">
            SharePlate is a platform dedicated to reducing food waste and
            helping those in need. We connect restaurants with volunteers to
            ensure surplus food reaches the right people. Join us in making a
            difference today!
          </p>
        </div>
      </section>

      {/* Contact Section Placeholder */}

      <section ref={contactRef} className="w-full max-w-4xl mt-20 p-10 bg-[#ECE852] text-black rounded-lg shadow-lg text-center">
        <h2 className="text-4xl text-[#5CB338] font-bold mb-6">Contact Us</h2>
        <div className="space-y-4">
          <p className="font-bold text-2xl">SharePlate</p>
          <p>123 Anywhere St., Any City, State, Country 12345</p>
          <p className="font-bold pt-5">Email Address</p>
          <p>test@gmail.com</p>
          <p className="font-bold pt-5">Phone Number</p>
          <p>(123) 456 7890</p>
        </div>
     
      </section>
    </div>
  );
};

export default Home;
