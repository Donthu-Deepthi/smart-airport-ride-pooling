require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/passengers", require("./routes/passengers"));
app.use("/api/cabs", require("./routes/cabs"));
app.use("/api/bookings", require("./routes/bookings"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
