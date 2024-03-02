import { Router } from "express";
import { ExtractFromPDF } from "../controllers/Pdfread";

let router = Router();

router.route("/extract-pdf").get(ExtractFromPDF);

export default router;
