"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Pdfread_1 = require("../controllers/Pdfread");
const multer_1 = __importDefault(require("multer"));
let router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./"); // Save files to the backend's root directory
    },
    filename: (req, file, cb) => {
        cb(null, "pdf.pdf");
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.route("/extract-pdf").get(Pdfread_1.ExtractFromPDF);
router.route("/upload").post(upload.single("pdf"), Pdfread_1.UploadPdf);
exports.default = router;
