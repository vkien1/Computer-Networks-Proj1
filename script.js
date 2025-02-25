//Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

//Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDwyiES7DPOkkxgS0b4IeFWjhn8lkhgJ4",
  authDomain: "computer-network1.firebaseapp.com",
  projectId: "computer-network1",
  storageBucket: "computer-network1.appspot.com",
  messagingSenderId: "867431642482",
  appId: "1:867431642482:web:9dfbeb65bb72471e8119eb"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Redirect Users if Not Logged In (For main.html)
if (window.location.pathname.includes("main.html")) {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "index.html";
        }
    });
}

//Handle Registration
document.getElementById("register-form")?.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const registerMessage = document.getElementById("register-message");

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      registerMessage.innerText = "✅ Registration Successful! You can now log in.";
      registerMessage.style.color = "green";
    })
    .catch((error) => {
      registerMessage.innerText = "❌ " + error.message;
      registerMessage.style.color = "red";
    });
});

//Handle Login
document.getElementById("login-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
  
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const loginMessage = document.getElementById("login-message");

    // Get reCAPTCHA response token
    const recaptchaResponse = grecaptcha.getResponse();

    if (!recaptchaResponse) {
        loginMessage.innerText = "❌ Please complete the reCAPTCHA challenge.";
        loginMessage.style.color = "red";
        return;
    }

    // Proceed with Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            loginMessage.innerText = "✅ Login Successful! Redirecting...";
            loginMessage.style.color = "green";
            setTimeout(() => {
                window.location.href = "main.html";
            }, 1000);
        })
        .catch((error) => {
            loginMessage.innerText = "❌ " + error.message;
            loginMessage.style.color = "red";
        });
});

// Handle Logout
document.getElementById("logout-btn")?.addEventListener("click", function () {
    signOut(auth).then(() => {
        window.location.href = "index.html"; 
    });
});

// Toggle Login & Register Forms
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded successfully!");

    const showLoginBtn = document.getElementById("show-login");
    const showRegisterBtn = document.getElementById("show-register");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const authTitle = document.getElementById("auth-title");

    if (showLoginBtn && showRegisterBtn && loginForm && registerForm && authTitle) {
        console.log("Found all authentication elements.");

        showLoginBtn.addEventListener("click", function () {
            console.log("🔄 Switching to Login form.");
            loginForm.style.display = "block";
            registerForm.style.display = "none";
            authTitle.innerText = "Login";
            showLoginBtn.classList.add("active");
            showRegisterBtn.classList.remove("active");
        });

        showRegisterBtn.addEventListener("click", function () {
            console.log("🔄 Switching to Register form.");
            loginForm.style.display = "none";
            registerForm.style.display = "block";
            authTitle.innerText = "Register";
            showRegisterBtn.classList.add("active");
            showLoginBtn.classList.remove("active");
        });
    } else {
        console.error("Error: One or more authentication elements are missing in the DOM.");
    }
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) {
        mobileMenu.addEventListener("click", function () {
            var navLinks = document.querySelector(".nav-links");
            navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
            navLinks.style.flexDirection = "column";
        });
    } else {
        console.warn("⚠ Warning: 'mobile-menu' not found in the DOM.");
    }

    // Dropdown Functionality
    document.querySelectorAll('.dropdown-btn').forEach(button => {
        button.addEventListener('click', function () {
            let content = this.nextElementSibling;
            content.style.display = content.style.display === "none" || content.style.display === "" ? "block" : "none";
        });
    });

    // Flashcard Game Logic
    const startGameButton = document.getElementById("start-game");
    const resetGameButton = document.getElementById("reset-game");
    const flashcardsContainer = document.querySelector(".flashcards-container");
    const networkingConcepts = document.getElementById("network");

    if (startGameButton) {
        startGameButton.addEventListener("click", function () {
            networkingConcepts.style.display = "none";
            flashcardsContainer.style.display = "flex";
            resetGameButton.style.display = "block";
            startGameButton.style.display = "none";
        });
    }

    if (resetGameButton) {
        resetGameButton.addEventListener("click", function () {
            networkingConcepts.style.display = "block";
            flashcardsContainer.style.display = "none";
            resetGameButton.style.display = "none";
            startGameButton.style.display = "block";
        });
    }

    document.querySelectorAll(".flashcard").forEach(function (card) {
        card.addEventListener("click", function () {
            card.classList.toggle("flipped");
        });
    });
});
