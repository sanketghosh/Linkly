import express from "express";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import { connectToDB } from "./db/connect.js";
import router from "./routes/urlRouter.js";

// initializing the app
const app = express();

app.use(express.json());
// app.set("view engine", "ejs");

app.use("/url", router);

const MONGO_URI = process.env.MONGO_URI;
connectToDB(MONGO_URI).then(() => {
  console.log(`Connected to database`.bold.black.bgYellow);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost/${PORT}`.black.bgCyan);
});
