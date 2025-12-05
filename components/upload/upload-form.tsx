"use client";
import React, { useRef, useState, useEffect } from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-action";
import { getUserSubscription } from "@/actions/get-user-subscription";
import { useRouter } from "next/navigation";

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
  const [uploadCount, setUploadCount] = useState(0);
  const [isBasic, setIsBasic] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Subscription check on mount via API
    const checkSubscription = async () => {
      try {
        const response = await fetch("/api/subscription");
        const data = await response.json();
        setUploadCount(data.uploadCount);
        setIsBasic(data.isSubscribed && data.planId === "basic");
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
      }
    };
    checkSubscription();
  }, []);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      console.log("✅ Upload successful:", res);
      setUploading(false);
    },
    onUploadError: (error) => {
      console.error("❌ Upload failed:", error);
      toast.error("Error occurred while uploading");
      setError(error.message);
      setUploading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Basic plan limit check
    if (isBasic && uploadCount >= 5) {
      toast.error("Upload limit reached!", {
        description: "Upgrade to Pro for unlimited uploads",
      });
      return;
    }

    setUploading(true);

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        const errorMsg =
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file";
        toast.error(errorMsg);
        setError(errorMsg);
        setUploading(false);
        setIsLoading(false);
        return;
      }

      toast.success("Uploading PDF");

      const resp = await startUpload([file]);
      if (!resp || resp.length === 0) {
        toast.error("Something went wrong during upload");
        setIsLoading(false);
        setUploading(false);
        return;
      }

      const pdfUrl = resp[0]?.ufsUrl || resp[0]?.serverData?.file?.ufsUrl;
      if (!pdfUrl) {
        toast.error("Failed to get PDF URL");
        setIsLoading(false);
        setUploading(false);
        return;
      }

      toast("Processing PDF", {
        description: "Hang tight! Our AI is reading through your document!",
      });

      const result = await generatePdfSummary(resp);
      const { data = null } = result || {};

      if (data?.summary) {
        toast("Saving PDF....", {
          description: "Hang tight!, We are saving your summary",
        });

        const storedResult = await storePdfSummaryAction({
          summary_text: data.summary,
          original_file_url: resp?.[0].serverData.file.url,
          title: data.title,
          file_name: file.name,
        });

        toast("Summary Generated", {
          description: "Your PDF has been successfully summarized and saved",
        });
        
        formRef.current?.reset();
        router.push(`/summaries/${storedResult.data?.id}`);
      }
    } catch (error) {
      console.log("Error occurred", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {uploading && <p className="text-blue-600 mt-2">Uploading...</p>}
    </div>
  );
};

export default UploadForm;