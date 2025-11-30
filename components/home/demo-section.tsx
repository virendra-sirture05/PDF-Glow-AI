import { Pizza } from "lucide-react";
import React from "react";

const DemoSection = () => {
  return (
    <div className="my-10">
      <div></div>
      <div className=" relative flex flex-col justify-center items-center gap-4 ">
        <div className="border border-gray-300 rounded-2xl p-2 bg-gray-100/50 backdrop-blur-xs ">
          <Pizza className="text-rose-600 " />
        </div>
        <h3 className="max-w-2xl text-xl font-bold text-center md:text-3xl px-6 ">
          Watch how PDFGlow transfroms{" "}
          <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
            this Nextjs course PDF{" "}
          </span>
          into an easy-to-read summary!
        </h3>
      </div>
      <div>
        summary section
      </div>
    </div>
  );
};

export default DemoSection;
