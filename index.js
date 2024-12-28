const http = require("http");
const fs = require("fs");
const path = require("path");
const app = require("express")();
const port = 80;

const server = http.createServer(app);

const createFolderIfNotExists = (domainFolder) => {
  const domainPath = path.join(__dirname, domainFolder);
  if (!fs.existsSync(domainPath)) {
    const exists = fs.mkdirSync(domainFolder);
    if (!exists) {
      console.log(`domainPath created: ${domainFolder}`);
      return false;
    }
    console.log(`domainPath already exists: ${domainFolder}`);
  }
};

app.use("/", (req, res, next) => {
  const { host } = req.headers;
  console.log({ host });
  createFolderIfNotExists(host);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

server.listen(port, () => {
  console.log(`${port} is listening ...`);
});
