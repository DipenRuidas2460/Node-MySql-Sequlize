const express = require("express");
const app = express();
const cors = require("cors");
require('./db/db')
require("dotenv").config();

const route = require('./routes/route')

app.use(cors());
app.use(express.json());

app.use('/', route)

// app.get("/", function (req, res) {
//   res.send("Hello World!");
// });

// const User = require("./models/userModel");
// const Product = require("./models/productModel")
// User.sync({alter:true})
// User.drop()
// User.sync();
// User.sync({ force: true });
// Product.sync({ force: true })

app.listen(process.env.PORT, () => {
  console.log(
    "Backend Server Running on Port:-",
    `http://localhost:${process.env.PORT}`
  );
});
