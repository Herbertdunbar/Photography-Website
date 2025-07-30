document.addEventListener("DOMContentLoaded", () => {
  const photoItems = document.querySelectorAll(".photo-item");
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
  let photoData = [];

  // Build photo data
  photoItems.forEach((item, index) => {
    const img = item.querySelector("img").src;
    const likeCount = parseInt(item.dataset.likes || 0);
    const comments = [];
    const liked = false;

    photoData.push({ img, likes: likeCount, liked, comments, element: item });

    // Open modal on click
    item.querySelector("img").addEventListener("click", () => openModal(index));
  });

  /** Open Modal **/
  function openModal(index) {
    currentIndex = index;
    const data = photoData[index];
    modalImg.src = data.img;
    modalLikeCount.textContent = data.likes;
    modalLikeBtn.classList.toggle("liked", data.liked);
    renderModalComments(data.comments);
    modal.classList.add("active");
    showNavArrows();
  }

  /** Close Modal **/
  function closeModal() {
    modal.classList.remove("active");
    modalComments.style.display = "none";
    modalCommentInput.style.display = "none";
  }

  /** Show Nav Arrows **/
  function showNavArrows() {
    if (photoData.length > 1) {
      modalPrev.style.display = "block";
      modalNext.style.display = "block";
    }
  }

  /** Navigation **/
  function navigate(dir) {
    currentIndex = (currentIndex + dir + photoData.length) % photoData.length;
    openModal(currentIndex);
  }

  /** Like Button **/
  modalLikeBtn.addEventListener("click", () => {
    const data = photoData[currentIndex];
    data.liked = !data.liked;
    data.likes += data.liked ? 1 : -1;
    modalLikeBtn.classList.toggle("liked", data.liked);
    modalLikeCount.textContent = data.likes;
  });

  /** Comments Toggle **/
  modalCommentToggleBtn.addEventListener("click", () => {
    const show = modalComments.style.display === "block";
    modalComments.style.display = show ? "none" : "block";
    modalCommentInput.style.display = show ? "none" : "flex";
  });

  /** Add Comment **/
  modalCommentAddBtn.addEventListener("click", () => {
    if (modalCommentText.value.trim()) {
      photoData[currentIndex].comments.push(modalCommentText.value.trim());
      modalCommentText.value = "";
      renderModalComments(photoData[currentIndex].comments);
    }
  });

  function renderModalComments(comments) {
    modalComments.innerHTML = comments.map(c => `<p>• ${c}</p>`).join("");
  }

  /** Click Outside to Close **/
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  /** Navigation Buttons **/
  modalPrev.addEventListener("click", () => navigate(-1));
  modalNext.addEventListener("click", () => navigate(1));

  /** Keyboard Support **/
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      navigate(-1);
    } else if (e.key === "ArrowRight") {
      navigate(1);
    }
  });
});
