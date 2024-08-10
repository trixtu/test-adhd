import React from "react";
import { Hero } from "./_components/Hero";
import { Navbar } from "./_components/Navbar";

const ADHDPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div id="testimonials" className="bg-red-500 h-[500px]">
          ADHDPage
        </div>
        <div id="about" className="bg-blue-500 h-[500px]">
          ADHDPage
        </div>
        <div id="benefits" className="bg-green-600 h-[500px]">
          ADHDPage
        </div>
      </main>
    </>
  );
};

export default ADHDPage;
