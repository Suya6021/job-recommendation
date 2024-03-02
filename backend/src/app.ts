import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorfn from "./middleware/error";
import PDFroute from "./routes/PDFroute";
import Inforoute from "./routes/Inforoute";

let app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", PDFroute, Inforoute);

app.use(errorfn);

export default app;
