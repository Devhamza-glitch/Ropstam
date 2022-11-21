import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as routes from "./src/routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

let mongoUri = `mongodb+srv://${process.env.CLUSTER_DB_URI}:${process.env.CLUSTER_DB_PASSWORD}@${process.env.CLUSTER_DB_NAME}/?retryWrites=true&w=majority`;

await mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then(() => console.log("DB connection is successful."))
  .catch((error) => console.log("Connection error", error.message));

app.use(cors());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json({ extended: true, limit: "50mb" }));

app.use("/api", routes.router);

app.listen(port, () => {
  console.log(`Server listening on port 🚀: ${port}`);
});
