// ======================================
// Register New User
// ======================================

function registerUser() {

    const companyName = document.getElementById("companyName").value.trim();
    const adminName = document.getElementById("adminName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // ==========================
    // Validation
    // ==========================

    if (
        companyName === "" ||
        adminName === "" ||
        email === "" ||
        phone === "" ||
        username === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        alert("Please fill all fields.");

        return;
    }

    // Email Validation

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email.");

        return;
    }

    // Phone Validation

    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Phone number must be 10 digits.");

        return;
    }

    // Password Validation

    if (password.length < 6) {

        alert("Password must contain at least 6 characters.");

        return;
    }

    // Confirm Password

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }

    // ==========================
    // Load Existing Users
    // ==========================

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Duplicate Username

    if (users.some(user => user.username === username)) {

        alert("Username already exists.");

        return;
    }

    // Duplicate Email

    if (users.some(user => user.email === email)) {

        alert("Email already registered.");

        return;
    }

    // ==========================
    // Create User
    // ==========================

    const user = {

        companyName,

        adminName,

        email,

        phone,

        username,

        password

    };

    // Save

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "index.html";

}