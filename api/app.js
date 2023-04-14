const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;