import catchAsyncError from "../middleware/catchAsyncError";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import PDFParser from "pdf-parse";

const pdfBasePath = "./";

export const ExtractFromPDF = catchAsyncError(
  async (req: Request, res: Response) => {
    try {
      const pdfPath: string | undefined = "pdf.pdf";

      if (!pdfPath || !fs.existsSync(path.join(pdfBasePath, pdfPath))) {
        return res
          .status(400)
          .json({ error: "Invalid or inaccessible PDF path" });
      }

      const dataBuffer = fs.readFileSync(path.join(pdfBasePath, pdfPath));
      const data = await PDFParser(dataBuffer);

      const extractedText = data.text;
      res.json({ extractedText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
