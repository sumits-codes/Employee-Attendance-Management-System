// ======================================
// Login Protection
// ======================================

if (sessionStorage.getItem("isLoggedIn") !== "true") {

    alert("Please login first.");

    window.location.href = "index.html";

}

// ======================================
// Load Employees
// ======================================

let employees = JSON.parse(localStorage.getItem("employees")) || [];

let editIndex = -1;

// ======================================
// Convert Image to Base64
// ======================================

function imageToBase64(file) {

    return new Promise((resolve) => {

        if (!file) {

            resolve("");

            return;

        }

        const reader = new FileReader();

        reader.onload = function (e) {

            resolve(e.target.result);

        };

        reader.readAsDataURL(file);

    });

}

// ======================================
// Display Employees
// ======================================

displayEmployees();
async function addEmployee() {

    let id = document.getElementById("empId").value.trim();

    let name = document.getElementById("empName").value.trim();

    let department = document.getElementById("department").value.trim();

    let email = document.getElementById("email").value.trim();

    let phone = document.getElementById("phone").value.trim();

    let photoFile = document.getElementById("photo").files[0];

    if (
        id === "" ||
        name === "" ||
        department === "" ||
        email === "" ||
        phone === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    if (editIndex === -1 && employees.some(emp => emp.id === id)) {

        alert("Employee ID already exists.");

        return;

    }

    let photo = "";

    if (photoFile) {

        photo = await imageToBase64(photoFile);

    }

    if (editIndex !== -1 && photo === "") {

        photo = employees[editIndex].photo || "";

    }

    const employee = {

        id,

        name,

        department,

        email,

        phone,

        photo

    };

    if (editIndex === -1) {

        employees.push(employee);

    } else {

        employees[editIndex] = employee;

        editIndex = -1;

        document.getElementById("addBtn").innerHTML =
            "➕ Add Employee";

    }

    localStorage.setItem(

        "employees",

        JSON.stringify(employees)

    );

    displayEmployees();

    clearForm();

}
// ======================================
// Display Employees
// ======================================

function displayEmployees() {

    const table = document.getElementById("tableBody");

    table.innerHTML = "";

    if (employees.length === 0) {

        table.innerHTML = `

        <tr>

            <td colspan="7" style="text-align:center;padding:20px;">

                No Employees Found

            </td>

        </tr>

        `;

        return;

    }

    employees.forEach((emp, index) => {

        const image = emp.photo && emp.photo !== ""
            ? emp.photo
            : "images/default-avatar.png";

        table.innerHTML += `

        <tr>

            <td>

                <img
                    src="${image}"
                    class="employee-photo"
                    alt="Employee Photo">

            </td>

            <td>${emp.id}</td>

            <td>${emp.name}</td>

            <td>${emp.department}</td>

            <td>${emp.email}</td>

            <td>${emp.phone}</td>

            <td>

                <button
                    class="action-btn edit"
                    onclick="editEmployee(${index})">

                    Edit

                </button>

                <button
                    class="action-btn delete"
                    onclick="deleteEmployee(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}