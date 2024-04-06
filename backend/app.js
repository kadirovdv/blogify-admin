// 3rd party libraries
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const sanitize = require("express-mongo-sanitize");
const ngrok = require("ngrok");

// Importing Routes&Controllers

const adminRoutes = require("./routes/admin.routes");

const errorController = require("./controllers/error.controller");

// Utils

const ErrorMessage = require("./utils/error.handler");

const app = express();

// Security based
app.use(helmet());
app.use(sanitize());
app.use(xss());

app.use(logger("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.options("*", cors());

let req = 0;
app.use((request, response, next) => {
  req++;
  console.log(req);
  next();
})

const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 60 * 60 * 1000, // 60 minutes,
  message: "Too many requests from this IP, try again after an hour",
});

app.use("/api", limiter);
app.use("/api/admin", adminRoutes);

app.all("*", (request, response, next) => {
  next(new ErrorMessage(`Could not find ${request.originalUrl}`, 404));
});

app.use(errorController);

// ngrok.connect({ addr: 5000, authtoken_from_env: true })
//   .then(listener => console.log(`Ingress established at: ${listener.url()}`));

module.exports = app;
