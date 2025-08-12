// frontend/js/main.js

import { setupLikeButtons } from "./likes.js";
import { setupComments } from "./comments.js";
import { setupSocialClicks } from "./socialClicks.js";

document.addEventListener("DOMContentLoaded", () => {
  setupLikeButtons();
  setupSocialClicks();

  // Example: For each photo, setup comments (adjust selectors to your HTML)
  document.querySelectorAll(".photo-item").forEach((photo) => {
    const photoId = photo.dataset.photoId;
    const commentsContainer = photo.querySelector(".comments-container");
    const commentForm = photo.querySelector(".comment-form");
    if (commentsContainer && commentForm) {
      setupComments(photoId, commentsContainer, commentForm);
    }
  });
});
