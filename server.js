const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

//Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to Database
connectDB(process.env.MONGO_URI);

const app = express();

// body parser
app.use(express.json());

// Route files
const bootcamps = require("./routes/bootcamps");

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

app.use("/api/v1/bootcamps", bootcamps);

// app.get("/api/v1/bootcamps/testing", (req, res) => {
//   res.status(200).send("hi there again");
// });

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT} `
  );
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
