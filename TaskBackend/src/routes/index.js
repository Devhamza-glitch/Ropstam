import express from "express";
import * as userRoutes from "./UserRoutes.js";
const router = express.Router();

router.use("/user", userRoutes.router);

export {router}
