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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Base directory for PDF storage (adjust as needed)
const pdfBasePath = './';
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
// Route to extract text from PDF
app.get('/extract-pdf', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract path from request body or query parameters (if provided)
        const pdfPath = 'pdf.pdf';
        // Validate path existence and access rights
        if (!pdfPath || !fs_1.default.existsSync(path_1.default.join(pdfBasePath, pdfPath))) {
            return res.status(400).json({ error: 'Invalid or inaccessible PDF path' });
        }
        const dataBuffer = fs_1.default.readFileSync(path_1.default.join(pdfBasePath, pdfPath));
        const data = yield (0, pdf_parse_1.default)(dataBuffer);
        // Access and return extracted text
        const extractedText = data.text;
        res.json({ extractedText });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Serve static PDFs (optional, adjust as needed)
// app.use('/static/pdfs', express.static(path.join(__dirname, 'static', 'pdfs')));
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
