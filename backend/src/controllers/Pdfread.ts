import catchAsyncError from "../middleware/catchAsyncError";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import PDFParser from "pdf-parse";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const pdfBasePath = "./";

const openai = new OpenAI({
  apiKey: process.env.CHAT_GPT_KEY,
});

export const UploadPdf = catchAsyncError(
  async (req: Request, res: Response) => {
    console.log(req.body.file);
    res.send("PDF uploaded successfully");
  }
);

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

      const prompt = `convert the following text into json format : ${extractedText}`;

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a Text to Json converter",
          },
          { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
      });
      const respo = completion.choices[0].message.content;

      console.log(respo);
      res.json({ success: true, data: JSON.parse(respo!) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
