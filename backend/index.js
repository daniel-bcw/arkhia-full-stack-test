require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(require("./routes/exchangeRoutes"));


app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
