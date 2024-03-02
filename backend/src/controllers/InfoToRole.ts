import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";
import cheerio from "cheerio";
import { HttpProxyAgent } from "http-proxy-agent";
import fetch from "node-fetch";

type Respo = {
  jobs: string[];
};

type jobListType = {
  title: string;
  company: string;
  location: string;
  logoImage?: string;
}[];

const openai = new OpenAI({
  apiKey: process.env.CHAT_GPT_KEY,
});

const proxies = [
  "http://38.162.8.79:3128",
  "http://38.162.29.255:3128",
  "http://38.162.26.98:3128",
  "http://38.174.39.198:3128",
  "http://38.62.220.236:3128",
  "http://38.162.6.27:3128",
  "http://38.174.40.217:3128",
  "http://38.162.5.93:3128",
  "http://38.162.1.128:3128",
  "http://38.162.25.113:3128",
  "http://38.162.8.49:3128",
  "http://38.162.15.229:3128",
  "http://38.162.15.54:3128",
  "http://38.62.222.225:3128",
  "http://38.174.39.140:3128",
  "http://38.162.5.17:3128",
  "http://38.174.39.56:3128",
  "http://38.162.3.169:3128",
  "http://38.162.20.153:3128",
  "http://38.162.15.85:3128",
  "http://38.162.24.187:3128",
  "http://38.162.21.133:3128",
  "http://38.162.30.18:3128",
  "http://38.162.7.23:3128",
  "http://38.162.14.127:3128",
  "http://38.162.28.136:3128",
];

async function fetchWithProxy(url: string) {
  const proxy = proxies[Math.floor(Math.random() * proxies.length)];
  const agent = new HttpProxyAgent(proxy);
  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0";
  const options = {
    agent,
    headers: {
      "User-Agent": userAgent,
    },
    timeout: 5000,
  };
  try {
    const response = await fetch(url, options);
    return await response.text();
  } catch (error) {
    console.error("Error fetching with proxy:", error);
    throw error;
  }
}

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
    const respo = JSON.parse(
      completion.choices[0].message.content as unknown as string
    ) as Respo;
    console.log(respo.jobs);

    let keyword: string = "";

    respo.jobs.forEach((job) => {
      keyword = keyword + `${job} `;
    });

    console.log(keyword);

    const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
      keyword
    )}`;

    try {
      const html = await fetchWithProxy(url);

      console.log(html);

      const $ = cheerio.load(html);

      const jobPostings: jobListType = [];

      $(".scaffold-layout__list-item li").each((index, element) => {
        const title = $(".job-card-list__title a strong").text().trim();
        const company = $(".job-card-container__primary-description")
          .text()
          .trim();
        const location = $(".job-card-container__metadata-item").text().trim();
        const logoImage = $(".job-card-list__logo img").attr("src");

        jobPostings.push({ title, company, location, logoImage });
      });

      console.log(jobPostings);

      res.status(201).json({
        success: true,
        data: respo,
      });
    } catch (error) {
      console.error("Error fetching job postings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
