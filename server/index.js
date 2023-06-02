require("dotenv").config();

const http = require("http");
const app = require("./app");
const router = require("./app/route");

const db = require("./db/index");

const server = http.createServer(app);

db.connect(process.env.DATABASE_CONNECTION_URL)
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT, () => {
      console.log("Server listening on port ", process.env.PORT);
    });
  })
  .catch((e) => {
    console.log("error: ", e);
  });
