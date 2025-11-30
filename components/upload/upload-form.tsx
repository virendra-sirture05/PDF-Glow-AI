"use client";
import React, { useRef, useState } from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { UploadButton, useUploadThing } from "@/utils/uploadthing";

import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-action";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 24 * 1024 * 1024,
      "file size must be less than 24 mb"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "file must be a PDF"
    ),
});

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      console.log("✅ Upload successful:", res);
      setUploading(false);
    },
    onUploadError: (error) => {
      console.error("❌ Upload failed:", error);
      toast.error("error occured while uploading");
      setError(error.message);
      setUploading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setUploading(true);

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validatedFields = schema.safeParse({ file });
      console.log(validatedFields);

      if (!validatedFields.success) {
        const errorMsg =
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file";
        console.log(errorMsg);
        toast.error("something went wrong");
        setError(errorMsg);
        setUploading(false);
        setIsLoading(false);
        return;
      }
      toast.success("Uploading pdf");

      // upload the file to uploadthing
      const resp = await startUpload([file]);
      if (!resp || resp.length === 0) {
        toast.error("Something went wrong during upload");
        setIsLoading(false);
        setUploading(false);
        return;
      }

      // Get correct PDF URL (ufsUrl)
      const pdfUrl = resp[0]?.ufsUrl || resp[0]?.serverData?.file?.ufsUrl;
      if (!pdfUrl) {
        toast.error("Failed to get PDF URL");
        setIsLoading(false);
        setUploading(false);
        return;
      }

      console.log("PDF URL:", pdfUrl);

      toast("Processing PDF", {
        description: "Hang tight! Our AI is reading through your document!",
      });

      // validating the fields - DONE
      // parse the pdf using langchain
      // summarize the pdf using AI

      const result = await generatePdfSummary(resp);
      console.log("res: ", result);

      const { data = null, message = null } = result || {};

      if (data) {
        let storedResult;
        toast("Saving PDF....", {
          description: "Hang tight!, We are saving your summary",
        });

        if (data.summary) {
          storedResult = await storePdfSummaryAction({
            summary_text: data.summary,
            original_file_url: resp?.[0].serverData.file.url,
            title: data.title,
            file_name: file.name,
          });

          console.log(storedResult);
          toast("Summary Generated", {
            description: "Your  PDF has been successfully summarized and saved",
          });
          formRef.current?.reset();
        }
      }

      // save the summary to the database
      // redirect to the [id] summary page
    } catch (error) {
      console.log("Error occurred", error);
      formRef.current?.reset();
    }
  }; // ✅ MISSING - handleSubmit function close

  return (
    <div>
      {/* Option 1: Pre-built button */}
      {/* <UploadButton
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      /> */}

      {/* Option 2: Custom form with validation */}
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />

      {/* Show error message */}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      {/* Show loading state */}
      {uploading && <p className="text-blue-600 mt-2">Uploading...</p>}
    </div>
  );
}; // ✅ MISSING - Component close

export default UploadForm;
