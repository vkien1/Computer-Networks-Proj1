// Toggle the mobile navigation menu for modern interactivity
document.getElementById("mobile-menu").addEventListener("click", function() {
    var navLinks = document.querySelector(".nav-links");
    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "flex";
      navLinks.style.flexDirection = "column";
    }
  });
  
  // Log a message once the content is fully loaded
  document.addEventListener("DOMContentLoaded", function() {
    console.log("NetFlux loaded successfully!");
  });
  