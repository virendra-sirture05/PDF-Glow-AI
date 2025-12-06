import { getSummById } from "@/actions/get-summ-by-id";
import BgGradient from "@/components/common/bg-gradient";
import { MotionDiv } from "@/components/common/motion-wrapper";
import SourceInfo from "@/components/summaries/source-info";
import SummaryHeader from "@/components/summaries/summary-header";
import SummaryViewer from "@/components/summaries/summary-viewer";
import { itemVariants } from "@/utils/constants";
import React from "react";

// Bottom to top animation variants
const pageVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1], // easeOut as array
      staggerChildren: 0.15,
    },
  },
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const summary = await getSummById(id);
  if (!summary) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Summary not found</h1>
        <p className="text-gray-600 mt-2">
          The summary you're looking for doesn't exist.
        </p>
      </div>
    );
  }
  
  const { title, summary_text, file_name, original_file_url, created_at } =
    summary;

  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container mx-auto">
        <MotionDiv variants={itemVariants}>
          <div className="flex flex-col justify-center items-center text-center mx-auto px-4 py-4 mt-10">
            <SummaryHeader title={title || "Untitled"} />
          </div>
        </MotionDiv>

        {file_name && (
          <MotionDiv variants={itemVariants}>
            <SourceInfo
              title={title || "Untitled"}
              summary_text={summary_text}
              file_name={file_name}
              created_at={new Date(created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              original_file_url={original_file_url}
            />
          </MotionDiv>
        )}

        <MotionDiv variants={itemVariants}>
          <SummaryViewer summary={summary_text} />
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

export default page;