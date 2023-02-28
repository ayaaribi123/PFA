const express = require("express");

// const expressLayouts = require("express-ejs-layouts");

const mongoose = require("mongoose");

const flash = require("connect-flash");
const session = require("express-session");
const passport = require('passport');

const app = express();

// Passport Config
require('./config/passport')(passport);


// DataBase config
const db = require("./config/keys").MongoURI;

// Connect to Mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("DataBase connection successfull !"))
  .catch((err) => {
    console.log(err);
  });

// EJS
// app.use(expressLayouts);
app.set("view engine", "ejs");

// set the path our 'views' are going to be coming from
app.set("views", __dirname + "/views");

// Body parser to get information from 'form' element
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// GET /styles.css, images and js files
app.use(express.static("public"));

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
