const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

const app = express();
app.use(cors());
dotenv.config();
app.use(express.urlencoded({ extended: true }));

//Deploy code for mono app
// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public", "build")));
}

// returns req.body object
app.use(express.json());

//Default Route
app.get("/", async (req, res) => {
  res.send("Welcome to my Recipe APP");
});

// app.get("/recipes/:id/photo", async (req, res) => {
//   res.send("Welcome to my Recipe APP-2");
// });

//Routes to controllers
app.use("/recipes", require("./controllers/recipe"));
app.use("/recipes/ingredient", require("./controllers/ingredients"));

//******************* Server connect ******************
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
