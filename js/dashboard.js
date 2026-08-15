// ======================================
// Login Protection
// ======================================

if (sessionStorage.getItem("isLoggedIn") !== "true") {

    alert("Please login first.");

    window.location.href = "index.html";

}
// ======================================
// Employee Attendance System Dashboard
// ======================================

// ---------- Company Information ----------

const companyTitle = document.getElementById("companyTitle");
const sidebarTitle = document.getElementById("sidebarTitle");

const savedCompany = localStorage.getItem("companyName");

if (savedCompany && savedCompany.trim() !== "") {

    companyTitle.textContent = savedCompany;
    sidebarTitle.textContent = savedCompany;

} else {

    companyTitle.textContent = "Employee Attendance System";
    sidebarTitle.textContent = "EMS";

}

// ---------- Today's Date ----------

const todayDate = document.getElementById("todayDate");

const today = new Date();

todayDate.textContent = today.toLocaleDateString("en-IN", {

    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"

});

// ---------- Load Employees ----------

const employees = JSON.parse(localStorage.getItem("employees")) || [];

// ---------- Dashboard Cards ----------

document.getElementById("totalEmployees").textContent = employees.length;

document.getElementById("employeeCountBadge").textContent =
employees.length + " Employees";
// ======================================
// Employee Table
// ======================================

const tableBody = document.getElementById("employeeTable");

function loadEmployeeTable() {

    tableBody.innerHTML = "";

    if (employees.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="5">

                    No Employees Found

                </td>

            </tr>

        `;

        return;

    }

    employees.forEach(emp => {

        tableBody.innerHTML += `

            <tr>

                <td>${emp.id}</td>

                <td>${emp.name}</td>

                <td>${emp.department}</td>

                <td>${emp.email}</td>

                <td>${emp.phone}</td>

            </tr>

        `;

    });

}

loadEmployeeTable();
// ======================================
// Attendance Summary
// ======================================

const attendance =
JSON.parse(localStorage.getItem("attendance")) || [];

let present = 0;
let absent = 0;
let leave = 0;

if (attendance.length > 0) {

    const latestAttendance =
    attendance[attendance.length - 1];

    if (latestAttendance.records) {

        latestAttendance.records.forEach(record => {

            switch (record.status) {

                case "Present":
                    present++;
                    break;

                case "Absent":
                    absent++;
                    break;

                case "Leave":
                    leave++;
                    break;

            }

        });

    }

}

document.getElementById("presentCount").textContent = present;

document.getElementById("absentCount").textContent = absent;

document.getElementById("leaveCount").textContent = leave;
// ======================================
// Dashboard Charts
// ======================================

function loadCharts() {

    // Attendance Pie Chart

    const attendanceCanvas =
    document.getElementById("attendanceChart");

    if (attendanceCanvas) {

        new Chart(attendanceCanvas, {

            type: "pie",

            data: {

                labels: [

                    "Present",
                    "Absent",
                    "Leave"

                ],

                datasets: [{

                    data: [

                        present,
                        absent,
                        leave

                    ],

                    backgroundColor: [

                        "#22c55e",
                        "#ef4444",
                        "#f59e0b"

                    ],

                    borderWidth: 2

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

    }

    // Department Chart

    const departmentCanvas =
    document.getElementById("departmentChart");

    if (departmentCanvas) {

        let departments = {};

        employees.forEach(emp => {

            departments[emp.department] =
            (departments[emp.department] || 0) + 1;

        });

        new Chart(departmentCanvas, {

            type: "bar",

            data: {

                labels: Object.keys(departments),

                datasets: [{

                    label: "Employees",

                    data: Object.values(departments),

                    backgroundColor: "#2563eb",

                    borderRadius: 8

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {

                            precision: 0

                        }

                    }

                }

            }

        });

    }

}

loadCharts();