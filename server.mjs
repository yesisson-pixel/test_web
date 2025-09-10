import { createServer } from "node:http";
import { readFile } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = createServer((req, res) => {
  if (req.url === "/") {
    // Serve index.html
    readFile(join(__dirname, "index.html"), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading index.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url.startsWith("/calc")) {
    // Handle calculator API
    const urlParams = new URL(req.url, `http://${req.headers.host}`);
    const expr = urlParams.searchParams.get("expr");

    let result;
    try {
      result = eval(expr); // ⚠️ still using eval, careful with real apps!
    } catch {
      result = "Error";
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ result }));
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on http://127.0.0.1:3000");
});
