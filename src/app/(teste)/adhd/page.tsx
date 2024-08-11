import React from "react";
import { Hero } from "./_components/Hero";
import { Navbar } from "./_components/Navbar";
import { Testimonies } from "./_components/Testimonies";
import Benefits from "./_components/Benefits";

const ADHDPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div id="testimonies" className="bg-red-500 h-[500px]">
          <Testimonies />
        </div>
        <div id="about" className="bg-blue-500 h-[500px]"></div>
        <div className="my-12">
          <h2 className="font-semibold text-2xl target md:text-5xl md:leading-[52px] text-center mb-6 md:mb-12 animate-fadeInTop dark:text-gray-200">
            Wie funktioniert es?
          </h2>
          <div id="benefits" className=" bg-violet-50 dark:bg-gray-900 py-8">
            <Benefits />
          </div>
        </div>
      </main>
    </>
  );
};

export default ADHDPage;
