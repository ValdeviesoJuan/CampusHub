document.addEventListener('DOMContentLoaded', function() {
    // Array of image URLs
const images = [
    
    'kayden.jpg',
    'shoyo.jpg',
    'image.jpg',
    // Add more image URLs as needed
];

// Function to change the image
function changeImage() {
    const imgElement = document.getElementById('dashboard');
    let currentIndex = 0;

    setInterval(() => {
        // Update the src attribute of the img element
        imgElement.src = images[currentIndex];
        // Move to the next index, and loop back to the start if at the end
        currentIndex = (currentIndex + 1) % images.length;
    }, 5000); // 20000 milliseconds = 20 seconds
}

// Call the function when the page loads
window.onload = changeImage;
});

