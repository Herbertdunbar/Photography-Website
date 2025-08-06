import { incrementLike, fetchLikes } from "../models/likesModel.js";

export async function likePhoto(req, res) {
  const { photoId } = req.params;
  try {
    await incrementLike(photoId);
    res.json({ message: "Photo liked!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getLikes(req, res) {
  const { photoId } = req.params;
  try {
    const likes = await fetchLikes(photoId);
    res.json({ likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
