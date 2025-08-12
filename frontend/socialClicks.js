// frontend/js/socialClicks.js

export function setupSocialClicks() {
    const socialButtons = document.querySelectorAll(".social-icon");
  
    socialButtons.forEach((btn) => {
      const platform = btn.dataset.platform;
  
      btn.addEventListener("click", async () => {
        try {
          await fetch(`/api/social/${platform}`, {
            method: "POST",
          });
        } catch (err) {
          console.error("Error tracking social click:", err);
        }
      });
    });
  }
  