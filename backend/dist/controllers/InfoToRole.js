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
exports.Runner = void 0;
const catchAsyncError_1 = __importDefault(require("../middleware/catchAsyncError"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai_1 = __importDefault(require("openai"));
const cheerio_1 = __importDefault(require("cheerio"));
const http_proxy_agent_1 = require("http-proxy-agent");
const node_fetch_1 = __importDefault(require("node-fetch"));
const openai = new openai_1.default({
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
function fetchWithProxy(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const proxy = proxies[Math.floor(Math.random() * proxies.length)];
        const agent = new http_proxy_agent_1.HttpProxyAgent(proxy);
        const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0";
        const options = {
            agent,
            headers: {
                "User-Agent": userAgent,
            },
            timeout: 5000,
        };
        try {
            const response = yield (0, node_fetch_1.default)(url, options);
            return yield response.text();
        }
        catch (error) {
            console.error("Error fetching with proxy:", error);
            throw error;
        }
    });
}
exports.Runner = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keyword)}`;
    try {
        const html = yield fetchWithProxy(url);
        console.log(html);
        const $ = cheerio_1.default.load(html);
        const jobPostings = [];
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
    }
    catch (error) {
        console.error("Error fetching job postings:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
