import pool from "../db.js";

export async function trackClick(req, res) {
  const { platform } = req.params;
  try {
    await pool.query(
      `INSERT INTO social_clicks (platform, clicks) VALUES ($1, 1)
       ON CONFLICT (platform) DO UPDATE SET clicks = social_clicks.clicks + 1`,
      [platform]
    );
    res.json({ message: "Click tracked!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
