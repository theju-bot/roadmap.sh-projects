const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// middleware
app.use(logger);

// server side rendering
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// built-in middleware for json
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// middleware for cookies
app.use(cookieParser());

// connect to mongoDB
connectDB();

// serve static files
app.use("/", express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res) => {
  res.redirect("/auth");
});
app.use("/register", require("./routes/registerRoute"));
app.use("/auth", require("./routes/loginRoute"));
app.use("/products", require("./routes/api/productApi"));
app.use("/cart", require("./routes/api/cartApi"));
app.use("/logout", require("./routes/accountRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/stripe", require("./routes/stripeRoute"));

/* app.use('/', (req, res) => { res.redirect('/auth'); }); */
// error handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
