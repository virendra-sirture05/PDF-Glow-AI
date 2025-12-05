import Link from "next/link";
import React from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";

import { MotionDiv, MotionH1, MotionH2, MotionSection, MotionSpan } from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

import { Variants } from "motion/react";

const buttonVariants = {
  initial: {
    scale: 1
  },
  animate: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10
    }
  }
}


const HeroSection = () => {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col mx-auto justify-center items-center my-4 "
    >
      <MotionDiv variants={itemVariants} className="my-4 ">
        <Badge className=" bg-white text-rose-600 border border-rose-600 px-5 py-3 bg-linear-to-r hover:from-rose-200 hover:via-rose-500 hover:to-rose-800 hover:animate-pulse cursor-pointer animate-pulse">
          <Sparkles
            style={{ width: "20px", height: "20px" }}
            className="inline-block  animate-pulse"
          />
          <p className="text-sm md:text-xl font-medium ">Powered by AI</p>
        </Badge>
      </MotionDiv>
      <MotionH1 variants={itemVariants} className="text-3xl text-center font-bold  md:text-5xl ">
        Transform PDFs into{" "}
        <span className="relative inline-block">
          <MotionSpan whileHover={buttonVariants} className="relative z-10 px-2">concise</MotionSpan>
          <span className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1 "></span>
        </span>{" "}
        summaries
      </MotionH1>
      <MotionH2 variants={itemVariants} className="text-gray-900 mt-8 text-center my-4 ">
        Get a beautifull summary reel of the document in seconds
      </MotionH2>
      <MotionDiv variants={itemVariants} whileHover={buttonVariants} className="flex gap-2 text-center mx-auto justify-center bg-red-300 px-6 py-3 w-40 rounded-full bg-linear-to-r from-slate-900 to-red-600 text-white shadow-lg font-semibold hover:from-rose-600 hover:to-slate-900 transition-all ease-in ">
        <Link href={"/#pricing"}>Try Now</Link>
        <span>→</span>
      </MotionDiv>
    </MotionSection>
  );
};

export default HeroSection;
