import { nanoid } from "nanoid";
import { URL } from "../models/urlModel.js";

export async function generateShortUrlHandler(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({ error: "Bad request! An URL expected" });

  const shortId = nanoid(8);

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.json({ shortUrlId: shortId });
}

export async function generatedUrlHandler(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
}

export async function getAnalyticsHandler(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  if (!result) {
    res.status(404).json({
      error: "Error ! No Analytics",
    });
  }

  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

export async function getAllLinksHandler(req, res) {
  const allUrls = await URL.find({});
  return res.status(200).json(allUrls);
}
