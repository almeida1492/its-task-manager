import path from "path";
import url from "url";
import express from "express";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "src")));

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
