export default async function handler(req, res) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  const { seriesId } = req.query;

  if (!seriesId) {
    return res.status(400).json({ error: "Missing seriesId parameter" });
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
      `https://api.themoviedb.org/3/tv/${seriesId}/videos?api_key=${TMDB_API_KEY}&language=en-US`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch video details" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}