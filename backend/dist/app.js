"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_1 = __importDefault(require("./middleware/error"));
const PDFroute_1 = __importDefault(require("./routes/PDFroute"));
const Inforoute_1 = __importDefault(require("./routes/Inforoute"));
let app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use("/api", PDFroute_1.default, Inforoute_1.default);
app.use(error_1.default);
exports.default = app;
