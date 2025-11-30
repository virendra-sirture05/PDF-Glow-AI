"use client";
import React, { forwardRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}
export const UploadFormInput = forwardRef<
  HTMLFormElement,
  UploadFormInputProps
>(({ onSubmit, isLoading }, ref) => {
  return (
    <div>
      <form ref={ref} onSubmit={onSubmit} className="flex gap-2">
        <Input
          id="file"
          name="file"
          accept="application/pdf"
          type="file"
          required
          className={cn(isLoading && "opacity-50 cursor-not-allowed")}
        />
        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              {" "}
              <Loader2 className="mr-2 h-4 w-4  animate-spin" />
              Processing...{" "}
            </>
          ) : (
            "Upload Your PDF"
          )}{" "}
        </Button>
      </form>
    </div>
  );
});

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
