const express = require("express");
const http = require("http");
const morgan = require("morgan")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const router =require("./router")
const app = express();
//import routes from './routes';
app.use(bodyParser.json({ type: '*/*' }))
app.use(cors())
mongoose.connect("mongodb://localhost:27017/auth");
const port = 4444;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("h");
});
app.use(morgan("combined"))
router(app)
const server = http.createServer(app);
server.listen(port);
console.log("Server listening %d", port);
