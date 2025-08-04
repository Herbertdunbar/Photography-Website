document.addEventListener("DOMContentLoaded", () => {
  const photoItems = document.querySelectorAll(".photo-item img");
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImage");
  const modalLikeBtn = document.getElementById("modalLikeBtn");
  const modalLikeCount = document.getElementById("modalLikeCount");
  const modalCommentToggleBtn = document.getElementById("modalCommentToggleBtn");
  const modalComments = document.getElementById("modalComments");
  const modalCommentInput = document.getElementById("modalCommentInput");
  const modalCommentText = document.getElementById("modalCommentText");
  const modalCommentAddBtn = document.getElementById("modalCommentAddBtn");
  const modalPrev = document.getElementById("modalPrev");
  const modalNext = document.getElementById("modalNext");

  let currentIndex = 0;
  let likes = Array(photoItems.length).fill(0);
  let comments = Array(photoItems.length).fill().map(() => []);

  photoItems.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  function openModal(index) {
    currentIndex = index;
    modalImg.src = photoItems[index].src;
    modalLikeCount.textContent = likes[index];
    renderComments(index);
    modal.classList.add("active");
  }

  function closeModal() {
    modal.classList.remove("active");
    modalComments.style.display = "none";
    modalCommentInput.style.display = "none";
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  modalLikeBtn.addEventListener("click", () => {
    likes[currentIndex]++;
    modalLikeCount.textContent = likes[currentIndex];
  });

  modalCommentToggleBtn.addEventListener("click", () => {
    const show = modalComments.style.display === "block";
    modalComments.style.display = show ? "none" : "block";
    modalCommentInput.style.display = show ? "none" : "flex";
  });

  modalCommentAddBtn.addEventListener("click", () => {
    if (modalCommentText.value.trim()) {
      comments[currentIndex].push(modalCommentText.value.trim());
      modalCommentText.value = "";
      renderComments(currentIndex);
    }
  });

  function renderComments(index) {
    modalComments.innerHTML = comments[index].map(c => `<p>• ${c}</p>`).join("");
  }

  modalPrev.addEventListener("click", () => navigate(-1));
  modalNext.addEventListener("click", () => navigate(1));

  function navigate(dir) {
    currentIndex = (currentIndex + dir + photoItems.length) % photoItems.length;
    openModal(currentIndex);
  }

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  });
});
