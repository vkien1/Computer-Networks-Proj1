document.getElementById("mobile-menu").addEventListener("click", function () {
    var navLinks = document.querySelector(".nav-links");
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Kiendom loaded successfully!");

    // Flashcard game toggle logic
    const startGameButton = document.getElementById("start-game");
    const resetGameButton = document.getElementById("reset-game");
    const flashcardsContainer = document.querySelector(".flashcards-container");
    const networkingConcepts = document.getElementById("network");

    startGameButton.addEventListener("click", function () {
       
        networkingConcepts.style.display = "none";
      
        flashcardsContainer.style.display = "flex";
        resetGameButton.style.display = "block";

        startGameButton.style.display = "none";
    });

    resetGameButton.addEventListener("click", function () {
    
        networkingConcepts.style.display = "block";


        flashcardsContainer.style.display = "none";
        resetGameButton.style.display = "none";

        startGameButton.style.display = "block";
    });

    document.querySelectorAll(".flashcard").forEach(function (card) {
        card.addEventListener("click", function () {
            card.classList.toggle("flipped");
        });
    });
});
