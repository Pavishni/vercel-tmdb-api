export default async function handler(req, res) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    return res.status(response.status).json({ error: "Failed to fetch from TMDB" });
  }

  const data = await response.json();
  res.status(200).json(data);
}