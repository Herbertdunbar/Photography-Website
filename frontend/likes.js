// frontend/js/likes.js

// Fetch likes for a photo
export async function fetchLikes(photoId) {
    try {
      const res = await fetch(`/api/likes/${photoId}`);
      const data = await res.json();
      return data.likes || 0;
    } catch (err) {
      console.error("Error fetching likes:", err);
      return 0;
    }
  }
  
  // Send a like to backend
  export async function sendLike(photoId) {
    try {
      const res = await fetch(`/api/likes/${photoId}`, {
        method: "POST",
      });
      return await res.json();
    } catch (err) {
      console.error("Error sending like:", err);
    }
  }
  
  // Attach like button listeners to photos
  export function setupLikeButtons() {
    const likeButtons = document.querySelectorAll(".like-button");
    likeButtons.forEach((btn) => {
      const photoId = btn.dataset.photoId;
  
      // Initialize likes count
      fetchLikes(photoId).then((count) => {
        const countElem = btn.querySelector(".like-count");
        if (countElem) countElem.textContent = count;
      });
  
      btn.addEventListener("click", async () => {
        await sendLike(photoId);
        // Update UI after liking
        fetchLikes(photoId).then((count) => {
          const countElem = btn.querySelector(".like-count");
          if (countElem) countElem.textContent = count;
        });
      });
    });
  }
  