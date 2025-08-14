// ====== SELECTORS ======
const modal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalLikeBtn = document.getElementById("modalLikeBtn");
const modalLikeCount = document.getElementById("modalLikeCount");
const modalCommentToggleBtn = document.getElementById("modalCommentToggleBtn");
const modalComments = document.getElementById("modalComments");
const modalCommentInput = document.getElementById("modalCommentInput");
const modalCommentText = document.getElementById("modalCommentText");
const modalCommentAddBtn = document.getElementById("modalCommentAddBtn");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");

// ====== DATA ======
// Example images array — replace with your actual images
let photos = Array.from(document.querySelectorAll(".photo-grid img"));
let currentIndex = 0;
let likeCounts = {}; // store likes per image src
let commentsData = {}; // store comments per image src

// ====== FUNCTIONS ======

// Open modal
function openModal(index) {
  currentIndex = index;
  let imgSrc = photos[currentIndex].src;

  modalImage.src = imgSrc;
  modal.style.display = "block";

  // Set likes & comments
  modalLikeCount.textContent = likeCounts[imgSrc] || 0;
  renderComments(imgSrc);
}

// Close modal
function closeModal() {
  modal.style.display = "none";
}

// Render comments for current image
function renderComments(imgSrc) {
  modalComments.innerHTML = "";
  let comments = commentsData[imgSrc] || [];
  comments.forEach(comment => {
    let div = document.createElement("div");
    div.textContent = comment;
    modalComments.appendChild(div);
  });
}

// ====== EVENT LISTENERS ======

// Open modal on image click
photos.forEach((photo, index) => {
  photo.addEventListener("click", () => openModal(index));
});

// Like button
modalLikeBtn.addEventListener("click", () => {
  let imgSrc = photos[currentIndex].src;
  likeCounts[imgSrc] = (likeCounts[imgSrc] || 0) + 1;
  modalLikeCount.textContent = likeCounts[imgSrc];
});

// Toggle comment section
modalCommentToggleBtn.addEventListener("click", () => {
  modalCommentInput.style.display =
    modalCommentInput.style.display === "none" ? "block" : "none";
});

// Add comment
modalCommentAddBtn.addEventListener("click", () => {
  let imgSrc = photos[currentIndex].src;
  let text = modalCommentText.value.trim();
  if (text) {
    commentsData[imgSrc] = commentsData[imgSrc] || [];
    commentsData[imgSrc].push(text);
    modalCommentText.value = "";
    renderComments(imgSrc);
  }
});

// Navigation
modalPrev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  openModal(currentIndex);
});

modalNext.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % photos.length;
  openModal(currentIndex);
});

// Close modal when clicking outside image
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
