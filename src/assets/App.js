// Lightbox with Navigation //
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const images = document.querySelectorAll('.photo-grid img');

let currentIndex = 0;

// Open lightbox when an image is clicked //
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showImage();
    lightbox.classList.add('active');
  });
});

// Show current image in lightbox //
function showImage() {
  lightboxImg.src = images[currentIndex].src;
}

// Close lightbox //
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

// Navigate images //
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

// Close on background click //
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

// Keyboard navigation //
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'Escape') lightbox.classList.remove('active');
});

// Like Button Feature //
const likeButtons = document.querySelectorAll('.like-btn');

likeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const countSpan = btn.querySelector('.like-count');
    let count = parseInt(countSpan.textContent);

    // Toggle like/unlike //
    if (btn.classList.contains('liked')) {
      btn.classList.remove('liked');
      count--;
    } else {
      btn.classList.add('liked');
      count++;
    }

    countSpan.textContent = count;
  });
});

// =====================
// Comment Modal Feature
// =====================
const commentBtns = document.querySelectorAll('.comment-btn');
const modal = document.getElementById('commentModal');
const closeModal = document.querySelector('.close-modal');
const commentImage = document.getElementById('commentImage');
const commentText = document.getElementById('commentText');
const sendComment = document.getElementById('sendComment');

let selectedImage = '';

// Open modal on comment button click
commentBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const photo = btn.closest('.photo-item').querySelector('img').src;
    selectedImage = photo;

    commentImage.src = selectedImage;
    modal.classList.add('active');
  });
});

// Close modal (X button or outside click)
closeModal.addEventListener('click', () => modal.classList.remove('active'));
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

// Handle comment submission
sendComment.addEventListener('click', () => {
  const comment = commentText.value.trim();
  if (comment === '') {
    alert('Please write a comment.');
    return;
  }

  // Future: Send to email with EmailJS
  alert(`Comment Sent!\nImage: ${selectedImage}\nComment: ${comment}`);
  
  // Reset and close modal
  commentText.value = '';
  modal.classList.remove('active');
});

