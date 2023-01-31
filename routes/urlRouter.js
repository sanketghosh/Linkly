import express from "express";
import { generateShortUrlHandler } from "../controllers/urlController.js";

const router = express.Router();

router.route("/").post(generateShortUrlHandler);

export default router;
