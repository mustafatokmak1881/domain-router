const http = require("http");
const app = require("express")();
const port = 8009;

const server = http.createServer(app);

app.listen(port, () => {
  console.log(`${port} is listening ...`);
});

app.get("/", (req, res) => {
  res.send("Welcome");
});
