const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

/*//Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/tetris", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
*/
//Example route
app.get("/", (req, res) => {
  res.send("Tetris project is running!");
});

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
