const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  let filePath;
  if (url === "/") {
    filePath = path.join(__dirname, "pages", "index.html");
  } else if (url === "/about") {
    filePath = path.join(__dirname, "pages", "about.html");
  } else if (url === "/contact-me") {
    filePath = path.join(__dirname, "pages", "contact-me.html");
  } else {
    filePath = path.join(__dirname, "pages", "404.html");
    res.statusCode = 404;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("Server error");
      return;
    }
    res.setHeader("Content-Type", "text/html");
    res.end(data);
  });
});

const PORT = 8080;
server.listen(PORT, (err) => {
  if (err) {
    console.error("There is an error in running server");
    return;
  }
  console.log(`The server is successfully running on http://localhost:${PORT}`);
});
