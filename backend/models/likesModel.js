import pool from "../db.js";

export async function incrementLike(photoId) {
  return pool.query(
    `INSERT INTO photos (photo_id, likes) VALUES ($1, 1)
     ON CONFLICT (photo_id) DO UPDATE SET likes = photos.likes + 1`,
    [photoId]
  );
}

export async function fetchLikes(photoId) {
  const result = await pool.query(
    "SELECT likes FROM photos WHERE photo_id = $1",
    [photoId]
  );
  return result.rows[0]?.likes || 0;
}
