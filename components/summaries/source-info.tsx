import React from "react";
import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DownloadSummaryButton from "./download-summary-button";

const SourceInfo = ({
  file_name,
  original_file_url,
  title,
  summary_text,
  created_at,
}: {
  file_name: string;
  original_file_url: string;
  title: string;
  summary_text: string;
  created_at: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-10 mx-auto ">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* PDF Icon */}
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm pt-2 font-semibold text-gray-700 mb-1">
              Source : {title || file_name}
            </h3>
              
          </div>
        </div>

        {/* View Original Button */}
        <Link href={original_file_url} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white hover:bg-blue-50 border-blue-300 text-blue-700 font-semibold"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">View Original</span>
            <span className="sm:hidden">View</span>
          </Button>
        </Link>

        <DownloadSummaryButton
        title = {title}
        summary_text={summary_text}
        file_name={file_name}
        created_at = {created_at}
         />
      </div>
    </div>
  );
};

export default SourceInfo;