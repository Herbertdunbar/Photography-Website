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


// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, updateDoc, increment, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

//  Firebase Config (Replace with your Firebase credentials)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//  Photo ID for example
const photoId = "photo1";

//  Like button functionality
document.querySelector(".like-btn").addEventListener("click", async () => {
    const photoRef = doc(db, "photos", photoId);
    await updateDoc(photoRef, { likes: increment(1) });
});

//  Real-time update for likes and comments count
const photoRef = doc(db, "photos", photoId);
onSnapshot(photoRef, (docSnap) => {
    const data = docSnap.data();
    if (data) {
        document.getElementById(`likes-${photoId}`).innerText = data.likes || 0;
        document.getElementById(`comments-${photoId}`).innerText = data.commentsCount || 0;
    }
});

// Comment form submit
document.querySelector(".comment-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const comment = e.target.comment.value;

    // Add comment to Firestore
    const commentsRef = collection(db, "photos", photoId, "comments");
    await addDoc(commentsRef, {
        user: username,
        text: comment,
        timestamp: new Date()
    });

    // Increment comment count
    await updateDoc(photoRef, { commentsCount: increment(1) });

    e.target.reset();
});

// Real-time listener for comments list
const commentsRef = collection(db, "photos", photoId, "comments");
const q = query(commentsRef, orderBy("timestamp", "desc"));
onSnapshot(q, (snapshot) => {
    const commentList = document.getElementById(`comment-list-${photoId}`);
    commentList.innerHTML = "";
    snapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `${data.user}: ${data.text}`;
        commentList.appendChild(li);
    });
});

// Track social link clicks
document.querySelectorAll(".social-link").forEach(link => {
    link.addEventListener("click", async () => {
        const linkId = link.getAttribute("data-link-id");
        const linkRef = doc(db, "socialLinks", linkId);
        await updateDoc(linkRef, { clicks: increment(1) });
    });
});
