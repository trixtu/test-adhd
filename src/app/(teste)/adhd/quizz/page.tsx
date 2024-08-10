import React from "react";
import { QuizzComponent } from "./_components/QuizzComponent";
import { Navbar } from "./_components/Navbar";


const QuizzPage = () => {
  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center gap-6 container my-6">
      <QuizzComponent />
    </div>
    </>
  );
};

export default QuizzPage;
