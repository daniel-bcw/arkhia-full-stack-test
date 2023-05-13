require("dotenv").config();
const express = require("express");
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors(corsOptions))

app.use(require("./routes/exchangeRoutes"));


app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
