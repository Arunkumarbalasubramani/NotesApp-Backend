const express = require("express");
const connection = require("./db.js");
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/UserRoute.js");
const noteRouter = require("./routes/NoteRoute.js");
const app = express();
const PORT = 4000;

connection();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/user/notes", noteRouter);
app.get("/", (req, res) => {
  res.send("Welcome to NotoSphere");
});

app.listen(PORT, () => {
  console.log(`Server Started and Running in PORT - ${PORT}`);
});
