import http from "http";
import fs from "fs";
import path from "path";
import url from "url";

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
};

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  const pathname = path.join(
    __dirname,
    "src",
    req.url === "/" ? "index.html" : req.url
  );

  const extname = path.extname(pathname);
  fs.readFile(pathname, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal Server Error");
      return;
    }
    res.statusCode = 200;
    res.setHeader(
      "Content-Type",
      mimeTypes[extname] || "application/octet-stream"
    );
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
