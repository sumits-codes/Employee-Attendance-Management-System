// ======================================
// Show / Hide Password
// ======================================

function togglePassword() {

    const password = document.getElementById("password");

    if (password.type === "password") {

        password.type = "text";

    } else {

        password.type = "password";

    }

}

// ======================================
// Login
// ======================================

function login() {

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value;

    const rememberMe = document.getElementById("rememberMe").checked;

    if (username === "" || password === "") {

        alert("Please enter Username and Password.");

        return;

    }

    // Load all registered users

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user

    const user = users.find(u =>
        u.username === username &&
        u.password === password
    );

    if (!user) {

        alert("Invalid Username or Password.");

        return;

    }

    // Save Login Session

    sessionStorage.setItem("isLoggedIn", "true");

    sessionStorage.setItem("loggedInUser", username);

    // Remember Me

    if (rememberMe) {

        localStorage.setItem("rememberUser", username);

    } else {

        localStorage.removeItem("rememberUser");

    }

    // Redirect

    window.location.href = "dashboard.html";

}

// ======================================
// Auto Fill Remember Me
// ======================================

window.onload = function () {

    const rememberedUser = localStorage.getItem("rememberUser");

    if (rememberedUser) {

        document.getElementById("username").value = rememberedUser;

        document.getElementById("rememberMe").checked = true;

    }

};