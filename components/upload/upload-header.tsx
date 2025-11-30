import React from "react";
import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";

const UploadHeader = () => {
  return (
    <div className=" flex flex-col justify-center items-center gap-4 mx-auto text-center mt-10">
      <Badge className=" bg-white text-rose-600 border border-rose-600 px-5 py-3 bg-linear-to-r hover:from-rose-200 hover:via-rose-500 hover:to-rose-800 hover:animate-pulse cursor-pointer animate-pulse">
        <Sparkles
          style={{ width: "20px", height: "20px" }}
          className="inline-block  animate-pulse"
        />
        <p className="text-sm md:text-xl font-medium ">
          AI Powered Content Creation
        </p>
      </Badge>
      <h1 className="text-3xl text-center  md:text-5xl ">
        Start Uploading{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Your PDF's</span>
          <span className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1 "></span>
        </span>{" "}
      </h1>
      <p>Upload your PDF and let our AI do the magic!</p>
    </div>
  );
};

export default UploadHeader;
