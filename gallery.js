// Load and display images on page load
window.addEventListener("load", () => {
    loadImages(); // Call loadImages on page load
});

// Utility function to randomly assign classes
function getRandomClasses() {
    const classes = ["card"]; // Start with the base class

    // Randomly decide to add 'card-tall' and 'card-wide'
    if (Math.random() < 0.5) {
        classes.push("card-tall");
    }
    if (Math.random() > 0.5) {
        classes.push("card-wide");
    }

    return classes.join(" "); // Join the classes into a single string
}

// Add image on button click
document.getElementById("addImage").addEventListener("click", () => {
    const fileInput = document.getElementById("imageFile");
    const imageNameInput = document.getElementById("imageName");
    const file = fileInput.files[0];
    const imageName = imageNameInput.value.trim(); // Get user-input file name

    if (file && imageName) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const images = getImages();
            if (images.length >= 10) {
                alert(
                    "Maximum of 10 images allowed. Please delete an image to add a new one."
                );
                return;
            }

            // Use the random class assignment
            const newImage = {
                name: imageName,
                url: reader.result,
                classes: getRandomClasses(), // Assign random classes
            };

            images.push(newImage);
            saveImages(images); // Save updated images array to local storage
            loadImages(); // Reload images to display them
            fileInput.value = ""; // Clear the file input
            imageNameInput.value = ""; // Clear the image name input
        };
        reader.readAsDataURL(file); // Read the selected file
    } else {
        alert("Please select an image file and enter a name.");
    }
});

// Delete all image when the user clicks it
document.getElementById("deleteImage").addEventListener("click", () => {
    localStorage.clear(); // Clear images from local storage
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear the gallery content
});

// Filter images as user types
document.getElementById("filter").addEventListener("input", (e) => {
    loadImages(e.target.value); // Load images based on filter input
});

// Load images from local storage and display them, with optional filtering
function loadImages(filter = "") {
    const images = getImages().filter(
        (img) =>
            img.name && img.name.toLowerCase().includes(filter.toLowerCase())
    );
    const gallery = document.getElementById("gallery");

    console.log("Loaded images: ", images); // Debugging log to check loaded images

    // Clear the gallery and add images
    gallery.innerHTML = images
        .map(
            (img) => `
            <div class="${img.classes}" style="background-image: url('${img.url}')"></div>
        `
        )
        .join(""); // Join the HTML strings for display
}

// Utility functions for local storage handling
function getImages() {
    return JSON.parse(localStorage.getItem("images")) || []; // Retrieve images from local storage
}

function saveImages(images) {
    localStorage.setItem("images", JSON.stringify(images)); // Save images to local storage
}

//! Removes all images from the gallery
// localStorage.clear();
