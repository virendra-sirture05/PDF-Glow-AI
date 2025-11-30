import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import fs from "fs/promises";
import path from "path";
import os from "os";

export const fetchAndExtractPdfText = async (fileUrl: string) => {
  try {
    console.log("Downloading PDF from:", fileUrl);

    // 1️⃣ Download
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error("Failed to download PDF");

    const buffer = Buffer.from(await response.arrayBuffer());

    // 2️⃣ Create a temp file
    const tempFilePath = path.join(os.tmpdir(), `temp-${Date.now()}.pdf`);
    await fs.writeFile(tempFilePath, buffer);

    // 3️⃣ Load PDF
    const loader = new PDFLoader(tempFilePath);
    const docs = await loader.load();

    // 4️⃣ Delete temp file
    await fs.unlink(tempFilePath);

    // 5️⃣ Combine 
    return docs.map((doc) => doc.pageContent).join("\n\n");
  } catch (err) {
    console.error("PDF Extract Error:", err);
    throw err;
  }
};
