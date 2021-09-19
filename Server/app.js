const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
//routes
const shopifyRoutes = require("./routes/shopify");
const userRoutes = require("./routes/user");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// My Routes
app.use("/api/shopify", shopifyRoutes);
app.use("/api", userRoutes);

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
