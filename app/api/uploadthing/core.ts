import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();


export const ourFileRouter = {
    pdfUploader : f({
        pdf:{
            maxFileSize:'32MB'
        }
    }).middleware(async ({req})=>{
        const user = await currentUser();
        if(!user) throw new UploadThingError('unauthorized');
        return {userId : user.id};
    }).onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { userId: metadata.userId , file};
    }),
}satisfies FileRouter;

export type ourFileRouter = typeof ourFileRouter;

