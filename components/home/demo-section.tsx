import { Pizza } from "lucide-react";
import React from "react";
import { SummaryDemo } from "./summary-demo";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";

const DemoSection = () => {
  return (
    <div className="mt-24">
      <div></div>
      <div className=" relative flex flex-col justify-center items-center gap-4 ">
        <div className="border border-gray-300 rounded-2xl p-2 bg-gray-100/50 backdrop-blur-xs ">
          <Pizza className="text-rose-600 " />
        </div>
        <MotionH3
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-xl font-bold text-center md:text-3xl px-6 "
        >
          Watch how PDFGlow transfroms{" "}
          <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
            this Nextjs course PDF{" "}
          </span>
          into an easy-to-read summary!
        </MotionH3>
      </div>
      <MotionDiv initial={{ opacity: 0 }} whileInView={{opacity:1}} transition={{duration:0.5}}>
        <SummaryDemo />
      </MotionDiv>
    </div>
  );
};

export default DemoSection;
