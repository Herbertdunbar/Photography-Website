import pool from "../db.js";

export async function likePhoto(req, res) {
  const { photoId } = req.params;
  try {
    await pool.query(
      `INSERT INTO photos (photo_id, likes) VALUES ($1, 1)
       ON CONFLICT (photo_id) DO UPDATE SET likes = photos.likes + 1`,
      [photoId]
    );
    res.json({ message: "Photo liked!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getLikes(req, res) {
  const { photoId } = req.params;
  try {
    const result = await pool.query(
      "SELECT likes FROM photos WHERE photo_id = $1",
      [photoId]
    );
    res.json({ likes: result.rows[0]?.likes || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
