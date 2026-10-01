const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\CCIGA App - Distribution USB";
const PORT = 8931;

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const filePath = path.join(ROOT, urlPath === "/" ? "CCIGA-App-Setup-LATEST.exe" : urlPath);
  if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Content-Length": stat.size,
    "Content-Disposition": `attachment; filename="${path.basename(filePath)}"`,
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Serving ${ROOT} at http://localhost:${PORT}/`);
});
