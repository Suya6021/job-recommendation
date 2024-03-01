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
const fs = require('fs');
const pdf = require('pdf-parse');
// Function to read and extract data from a PDF file
function extractDataFromPDF(pdfPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Read the PDF file
            const dataBuffer = fs.readFileSync(pdfPath);
            // Parse the PDF data
            const data = yield pdf(dataBuffer);
            // Extracted text content from the PDF
            const textContent = data.text;
            // You can also access other information such as metadata
            const metadata = data.info;
            // Do something with the extracted data
            console.log('Text Content:', textContent);
            console.log('Metadata:', metadata);
        }
        catch (error) {
            console.error('Error extracting data from PDF:', error);
        }
    });
}
// Example usage
const pdfFilePath = 'Resume-Suyog-Angaj.pdf';
extractDataFromPDF(pdfFilePath);
