// Select all images in the photo grid
const images = document.querySelectorAll('.photo-grid img');

// Create a lightbox container
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

// Add click event for each image
images.forEach(image => {
  image.addEventListener('click', () => {
    lightbox.classList.add('active');
    const img = document.createElement('img');
    img.src = image.src;
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild);
    }
    lightbox.appendChild(img);
  });
});

// Close lightbox on click
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});




