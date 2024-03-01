const fs = require('fs');
const pdf = require('pdf-parse');

// Function to read and extract data from a PDF file
async function extractDataFromPDF(pdfPath:string) {
  try {
    // Read the PDF file
    const dataBuffer = fs.readFileSync(pdfPath);

    // Parse the PDF data
    const data = await pdf(dataBuffer);

    // Extracted text content from the PDF
    const textContent = data.text;

    // You can also access other information such as metadata
    const metadata = data.info;

    // Do something with the extracted data
    console.log('Text Content:', textContent);
    console.log('Metadata:', metadata);
  } catch (error) {
    console.error('Error extracting data from PDF:', error);
  }
}

// Example usage
const pdfFilePath = 'Resume-Suyog-Angaj.pdf';
extractDataFromPDF(pdfFilePath);