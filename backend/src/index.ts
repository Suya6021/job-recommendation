
import express from 'express';
import path from 'path';
import fs from 'fs';
import PDFParser from 'pdf-parse';

// Interface for PDF response
interface PdfResponse {
  extractedText?: string;
  error?: string;
}

const app = express();
const PORT = process.env.PORT || 3000;

// Base directory for PDF storage (adjust as needed)
const pdfBasePath = './'

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Route to extract text from PDF
app.get('/extract-pdf', async (req: express.Request, res: express.Response<PdfResponse>) => {
  try {
    // Extract path from request body or query parameters (if provided)
    const pdfPath: string | undefined = 'pdf.pdf'

    // Validate path existence and access rights
    if (!pdfPath || !fs.existsSync(path.join(pdfBasePath, pdfPath))) {
      return res.status(400).json({ error: 'Invalid or inaccessible PDF path' });
    }

    const dataBuffer = fs.readFileSync(path.join(pdfBasePath, pdfPath));
    const data = await PDFParser(dataBuffer);

    // Access and return extracted text
    const extractedText = data.text;
    res.json({ extractedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve static PDFs (optional, adjust as needed)
// app.use('/static/pdfs', express.static(path.join(__dirname, 'static', 'pdfs')));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});