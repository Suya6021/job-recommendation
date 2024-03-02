import dotenv from "dotenv";
dotenv.config({ path: "config/config.env" });

import app from "./app";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
