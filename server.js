require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Contact Route
app.use("/api", require("./Routes/ConatctRoute")); // path apne project ke hisaab se

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});