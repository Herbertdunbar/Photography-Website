// backend/models/commentsModel.js
import pool from "../db.js";

export async function addComment(photoId, text) {
  return pool.query(
    "INSERT INTO comments (photo_id, text) VALUES ($1, $2)",
    [photoId, text]
  );
}

export async function fetchComments(photoId) {
  const result = await pool.query(
    "SELECT text, timestamp FROM comments WHERE photo_id = $1 ORDER BY timestamp ASC",
    [photoId]
  );
  return result.rows;
}
