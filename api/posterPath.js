export default async function handler(req, res) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  const { poster_path } = req.query;

  if (!poster_path) {
    return res.status(400).json({ error: "Missing poster card parameter" });
  }

  const allowedOrigins = [
    "http://localhost:5173",
    "https://netflixgpt-movies.web.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const response = await fetch(
      `https://image.tmdb.org/t/p/original/${poster_path}`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch image details" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}