import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

export const Runner = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const prompt = `extract job roles using following paragraph extracted from a resume : ${req.body.extractedText}, if there are no job roles found then give proper one accurate job role based on the skills found in the extracted resume in json format with jobs key as array of job roles and proposed_job_role_based_on_skills as key if there no job roles found`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful job role advisor to output JSON.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    });
    const respo = completion.choices[0].message.content;
    console.log();
    res.status(201).json({
      success: true,
      data: JSON.parse(respo!),
    });
  }
);
