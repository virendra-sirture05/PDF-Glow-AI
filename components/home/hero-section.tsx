import Link from "next/link";
import React from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col mx-auto justify-center items-center my-4 ">
      <div className="my-4 ">
        <Badge className=" bg-white text-rose-600 border border-rose-600 px-5 py-3 bg-linear-to-r hover:from-rose-200 hover:via-rose-500 hover:to-rose-800 hover:animate-pulse cursor-pointer animate-pulse">
          <Sparkles style={{width : '20px', height:'20px'}} className="inline-block  animate-pulse" />
          <p className="text-sm md:text-xl font-medium ">Powered by AI</p>
        </Badge>
      </div>
      <h1 className="text-3xl text-center  md:text-5xl ">
        Transform PDFs into{' '}
        <span className="relative inline-block">
           <span className="relative z-10 px-2">concise</span>
          <span className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1 "></span> 
        </span> {' '}
        summaries
      </h1>
      <h2 className="text-gray-900  text-center my-4 ">
        Get a beautifull summary reel of the document in seconds
      </h2>
      <div className="flex gap-2 text-center mx-auto justify-center bg-red-300 px-6 py-3 w-40 rounded-full bg-linear-to-r from-slate-900 to-red-600 text-white shadow-lg font-semibold hover:from-rose-600 hover:to-slate-900 transition-all ease-in ">
        <Link href={"/#pricing"}>Try Now</Link>
        <span>→</span>
      </div>
    </section>
  );
};

export default HeroSection;
