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
    y: 50  // Bottom se start
  },
  visible: {
    opacity: 1,
    y: 0,  // Top pe aayega
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15  // Children ek ke baad ek aayenge
    }
  }
};


const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const summary = await getSummById(id);
  console.log(summary);
  const { title, summary_text, file_name, original_file_url, created_at } =
    summary;

  return (
    <MotionDiv 
      variants={pageVariants} 
      initial="hidden" 
      animate="visible"  // whileInView ki jagah animate use karo
      viewport={{ once: true }}
    >
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container mx-auto">
        <MotionDiv variants={itemVariants}>
          <div className="flex flex-col justify-center items-center text-center mx-auto px-4 py-4 mt-10">
            <SummaryHeader title={title} />
          </div>
        </MotionDiv>

        {file_name && (
          <MotionDiv variants={itemVariants}>
            <SourceInfo
              title={title}
              summary_text={summary_text}
              file_name={file_name}
              created_at={created_at}
              original_file_url={original_file_url}
            />
          </MotionDiv>
        )}

        <MotionDiv variants={itemVariants}>
          <SummaryViewer summary={summary?.summary_text} />
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

export default page;