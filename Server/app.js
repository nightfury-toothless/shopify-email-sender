const mongoose = require("mongoose");
const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
require("dotenv").config();
//routes
const shopifyRoutes = require("./routes/shopify");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// My Routes
app.use("/api/shopify", shopifyRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Its Working",
  });
});

//Port
const Port = process.env.PORT || 7000;

app.listen(Port, () => {
  console.log(`Server Running on PORT ${Port}`);
});
