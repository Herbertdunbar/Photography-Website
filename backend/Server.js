import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import individual route files
import likesRoutes from "./routes/likes.js";
import commentsRoutes from "./routes/comments.js";
import socialRoutes from "./routes/social.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Use modular routes under /api path
app.use("/api/likes", likesRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/social", socialRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

