const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
// const multer = require("multer"); // Add multer for handling file uploads


const app = express();
app.use(cors());
dotenv.config();
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public", "build")));
}

// returns req.body object
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));


//Default Route
app.get("/", async (req, res) => {
  res.send("Welcome to my Recipe APP!");
});


//Routes to controllers
app.use("/recipes", require("./controllers/recipe"));
app.use("/recipes/ingredient", require("./controllers/ingredients"));
app.use("/recipes/photo", require("./controllers/photo"));


// Route to handle photo upload



//******************* Server connect ******************
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
