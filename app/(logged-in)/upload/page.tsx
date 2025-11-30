import BgGradient from "@/components/common/bg-gradient";
import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import React from "react";

const page = () => {
  return (
    <div>
      <BgGradient />
      <div className="flex justify-center items-center flex-col gap-6">
        <UploadHeader />
        <UploadForm />
      </div>
    </div>
  );
};

export default page;
