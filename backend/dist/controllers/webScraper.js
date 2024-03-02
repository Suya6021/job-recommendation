"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scraperRunner = void 0;
const catchAsyncError_1 = __importDefault(require("../middleware/catchAsyncError"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axios_1 = __importDefault(require("axios"));
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: process.env.CHAT_GPT_KEY,
});
exports.scraperRunner = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = `extract job roles using following paragraph extracted from a resume : ${req.body.extractedText}, if there are no job roles found then give proper one accurate job role based on the skills found in the extracted resume in json format with jobs key as array of job roles and proposed_job_role_based_on_skills as key if there no job roles found`;
    const completion = yield openai.chat.completions.create({
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
    const respo = JSON.parse(completion.choices[0].message.content);
    console.log(respo.jobs);
    let keyword = "";
    respo.jobs.forEach((job) => {
        keyword = keyword + `${job} `;
    });
    console.log(keyword);
    const linkedinUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keyword)}`;
    const options = {
        api_key: process.env.SCRAPER_API,
        render_js: true,
        url: linkedinUrl,
    };
    axios_1.default
        .get("https://api.webscraper.io/api/v2/scraping", { params: options })
        .then((response) => {
        const jobsData = response.data;
        // TODO: Process the jobsData. Structure may vary, so inspect it.
        console.log(jobsData);
    })
        .catch((error) => {
        console.error("Error:", error);
    });
}));
