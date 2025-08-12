// frontend/js/comments.js

// Fetch comments for a photo
export async function fetchComments(photoId) {
    try {
      const res = await fetch(`/api/comments/${photoId}`);
      return await res.json();
    } catch (err) {
      console.error("Error fetching comments:", err);
      return [];
    }
  }
  
  // Send a new comment to backend
  export async function sendComment(photoId, text) {
    try {
      const res = await fetch(`/api/comments/${photoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      return await res.json();
    } catch (err) {
      console.error("Error sending comment:", err);
    }
  }
  
  // Setup comment form and display comments
  export function setupComments(photoId, commentsContainer, formElement) {
    // Load initial comments
    fetchComments(photoId).then((comments) => {
      commentsContainer.innerHTML = "";
      comments.forEach((c) => {
        const div = document.createElement("div");
        div.classList.add("comment");
        div.textContent = c.text;
        commentsContainer.appendChild(div);
      });
    });
  
    // Handle comment submit
    formElement.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = formElement.querySelector("input[name='comment']");
      if (!input.value.trim()) return;
  
      await sendComment(photoId, input.value.trim());
      input.value = "";
  
      // Refresh comments
      fetchComments(photoId).then((comments) => {
        commentsContainer.innerHTML = "";
        comments.forEach((c) => {
          const div = document.createElement("div");
          div.classList.add("comment");
          div.textContent = c.text;
          commentsContainer.appendChild(div);
        });
      });
    });
  }
  