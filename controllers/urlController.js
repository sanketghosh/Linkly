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

  return res.json({ id: shortId });
}
