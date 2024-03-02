import { Router } from "express";
import { ExtractFromPDF, UploadPdf } from "../controllers/Pdfread";
import multer from "multer";

let router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./"); // Save files to the backend's root directory
  },
  filename: (req, file, cb) => {
    cb(null, "pdf.pdf");
  },
});

const upload = multer({ storage: storage });

router.route("/extract-pdf").get(ExtractFromPDF);
router.route("/upload").post(upload.single("pdf"), UploadPdf);

export default router;
