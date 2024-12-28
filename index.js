const http = require("http");
const fs = require("fs");
const path = require("path");
const app = require("express")();
const port = 80;

const server = http.createServer(app);

const createFolderIfNotExists = (domainFolder, res) => {
  return new Promise((resolve, reject) => {
    (async () => {
      const domainPath = path.join(__dirname, domainFolder);

      if (!fs.existsSync(domainPath)) {
        const exists = fs.mkdirSync(domainFolder);
        if (!exists) {
          const indexHtmlFile = `${domainFolder}/index.html`;
          fs.writeFileSync(indexHtmlFile, `<b>Welcome Page</b>`);
          resolve({
            status: true,
            message: `domainPath created: ${domainFolder}`,
          });
        }
        resolve({
          status: true,
          message: `domainPath already exists: ${domainFolder}`,
        });
      }

      resolve({
        status: true,
        message: `domainPath already exists: ${domainFolder}`,
      });
    })();
  });
};

app.use(async (req, res, next) => {
  const { host } = req.headers;
  await createFolderIfNotExists(host, res);
  const domainPath = path.join(__dirname, host);
  console.log({domainPath});
  res.sendFile(domainPath + '/index.html');
});

app.get("/", (req, res) => {
  res.send("Domain router is running ...");
});

server.listen(port, () => {
  console.log(`${port} is listening ...`);
});
