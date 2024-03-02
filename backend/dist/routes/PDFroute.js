"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Pdfread_1 = require("../controllers/Pdfread");
let router = (0, express_1.Router)();
router.route("/extract-pdf").get(Pdfread_1.ExtractFromPDF);
exports.default = router;
