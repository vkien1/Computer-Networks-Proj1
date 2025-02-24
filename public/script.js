document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script loaded successfully!");

    //  Mobile Menu Toggle
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

    //  Dropdown Functionality
    document.querySelectorAll('.dropdown-btn').forEach(button => {
        button.addEventListener('click', function () {
            let content = this.nextElementSibling;
            content.style.display = content.style.display === "none" || content.style.display === "" ? "block" : "none";
        });
    });

    //  Flashcard Game Logic
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

    //  Toggle Login & Register Forms using Separate Buttons
    const showLoginBtn = document.getElementById("show-login");
    const showRegisterBtn = document.getElementById("show-register");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const authTitle = document.getElementById("auth-title");

    if (showLoginBtn && showRegisterBtn && loginForm && registerForm && authTitle) {
        console.log("✅ Found all authentication elements.");

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

    //  Handle Registration
    const registerFormElement = document.getElementById("register-form");
    if (registerFormElement) {
        registerFormElement.addEventListener("submit", async function (event) {
            event.preventDefault();
            console.log("📝 Register form submitted.");

            const email = document.getElementById("register-email").value.trim();
            const password = document.getElementById("register-password").value.trim();
            const registerMessage = document.getElementById("register-message");

            if (!email || !password) {
                registerMessage.innerText = "⚠ Please fill in all fields.";
                registerMessage.style.color = "red";
                return;
            }

            try {
                console.log("📡 Sending registration request...");
                const response = await fetch("http://localhost:3000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log("🔄 Registration Response:", data);
                registerMessage.innerText = data.message;
                registerMessage.style.color = response.ok ? "green" : "red";

                if (response.ok) {
                    document.getElementById("register-email").value = "";
                    document.getElementById("register-password").value = "";
                }
            } catch (error) {
                console.error("Registration Error:", error);
                registerMessage.innerText = "An error occurred. Check console.";
                registerMessage.style.color = "red";
            }
        });
    } else {
        console.error("Error: Register form not found.");
    }

    const loginFormElement = document.getElementById("login-form");
    if (loginFormElement) {
        loginFormElement.addEventListener("submit", async function (event) {
            event.preventDefault();
            console.log("Login form submitted.");

            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value.trim();
            const loginMessage = document.getElementById("login-message");

            if (!email || !password) {
                loginMessage.innerText = "⚠ Please fill in all fields.";
                loginMessage.style.color = "red";
                return;
            }

            try {
                console.log("📡 Sending login request...");
                const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log("🔄 Login Response:", data);
                loginMessage.innerText = data.message;
                loginMessage.style.color = response.ok ? "green" : "red";

                if (response.ok) {
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 1000);
                }
            } catch (error) {
                console.error("Login Error:", error);
                loginMessage.innerText = "An error occurred. Try again.";
                loginMessage.style.color = "red";
            }
        });
    } else {
        console.error("Error: Login form not found.");
    }
});
