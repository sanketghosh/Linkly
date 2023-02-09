import express from "express";
import {
  generatedUrlHandler,
  generateShortUrlHandler,
  getAllLinksHandler,
  getAnalyticsHandler,
} from "../controllers/urlController.js";

const router = express.Router();

router.route("/").post(generateShortUrlHandler).get(getAllLinksHandler);
router.route("/:shortId").get(generatedUrlHandler);
router.route("/analytics/:shortId").get(getAnalyticsHandler);

export default router;
