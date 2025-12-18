import React from "react";
import heroImg from "../assets/health.jpg";

const Hero = () => {
  return (
    <section
      className="h-screen flex items-center justify-center text-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-lg">
        <h1 className="text-white text-5xl font-bold mb-4">
          Heart Failure Mortality Risk Assessment
        </h1>
        <p className="text-gray-200 mb-6">
          Clinically interpretable insights using healthcare data analytics
        </p>
        <a
          href="#about"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold transition duration-300"
        >
          Explore Study
        </a>
      </div>
    </section>
  );
};

export default Hero;
