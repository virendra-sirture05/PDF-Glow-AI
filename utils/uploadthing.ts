// utils/uploadthing.ts
import { generateReactHelpers } from "@uploadthing/react";
import type { ourFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } = generateReactHelpers<ourFileRouter>();

// Export UploadButton and UploadDropzone
export { UploadButton, UploadDropzone } from "@uploadthing/react";