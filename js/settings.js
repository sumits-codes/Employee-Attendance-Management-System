// ======================================
// Login Protection
// ======================================

if (sessionStorage.getItem("isLoggedIn") !== "true") {

    alert("Please login first.");

    window.location.href = "index.html";

}
// ================================
// SETTINGS PAGE
// ================================

// Load Saved Settings
window.onload = function () {

    let companyName = localStorage.getItem("companyName") || "";
    let adminName = localStorage.getItem("adminName") || "";
    let adminEmail = localStorage.getItem("adminEmail") || "";
    let adminPhone = localStorage.getItem("adminPhone") || "";

    document.getElementById("companyName").value = companyName;
    document.getElementById("adminName").value = adminName;
    document.getElementById("adminEmail").value = adminEmail;
    document.getElementById("adminPhone").value = adminPhone;

    // Dashboard Header
    if(companyName !== ""){

        document.getElementById("companyTitle").innerText = companyName;
        document.getElementById("sidebarTitle").innerText = companyName;

    }

}

// ================================
// Save Settings
// ================================

function saveSettings(){

    let companyName = document.getElementById("companyName").value.trim();
    let adminName = document.getElementById("adminName").value.trim();
    let adminEmail = document.getElementById("adminEmail").value.trim();
    let adminPhone = document.getElementById("adminPhone").value.trim();

    // Validation

    if(companyName=="" ||
       adminName=="" ||
       adminEmail=="" ||
       adminPhone==""){

        alert("Please fill all fields.");

        return;

    }

    // Email Validation

    let emailPattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(!adminEmail.match(emailPattern)){

        alert("Enter a valid Email Address.");

        return;

    }

    // Phone Validation

    if(adminPhone.length!=10 || isNaN(adminPhone)){

        alert("Enter a valid 10 digit Mobile Number.");

        return;

    }

    // Save

    localStorage.setItem("companyName",companyName);
    localStorage.setItem("adminName",adminName);
    localStorage.setItem("adminEmail",adminEmail);
    localStorage.setItem("adminPhone",adminPhone);

    alert("Settings Saved Successfully.");

}

// ================================
// Logout
// ================================

function logout() {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    sessionStorage.removeItem("isLoggedIn");

    window.location.replace("index.html");

}