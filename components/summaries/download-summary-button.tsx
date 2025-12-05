"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const DownloadSummaryButton = ({
  title,
  summary_text,
  file_name,
  created_at,
}: {
  title: string;
  summary_text: string;
  file_name: string;
  created_at: string;
}) => {
  const handleDownload = () => {
    // Format the content
    const content = `
${title}
${"=".repeat(title.length)}

File: ${file_name}
Created: ${new Date(created_at).toLocaleString()}

SUMMARY
-------
${summary_text}
    `.trim();

    // Create a blob from the content
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${file_name.replace(/\.[^/.]+$/, "")}_summary.txt`;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Button
        onClick={handleDownload}
        className="bg-rose-100 font-semibold text-rose-600 px-6 py-2"
      >
        Download Summary
      </Button>
    </div>
  );
};

export default DownloadSummaryButton;
