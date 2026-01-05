// Form validation
document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Form submitted successfully!");
});

// Hamburger toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
