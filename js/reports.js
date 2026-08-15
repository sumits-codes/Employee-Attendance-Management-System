// ======================================
// Login Protection
// ======================================

if (sessionStorage.getItem("isLoggedIn") !== "true") {

    alert("Please login first.");

    window.location.href = "index.html";

}
// =============================
// Employee Attendance Reports
// =============================

// Load Attendance Data
let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

let reportTable = document.getElementById("reportTable");

let present = 0;
let absent = 0;
let leave = 0;

// Load Report
function loadReport() {

    reportTable.innerHTML = "";

    present = 0;
    absent = 0;
    leave = 0;

    // No Records
    if (attendance.length === 0) {

        reportTable.innerHTML = `
            <tr>
                <td colspan="5" style="padding:25px;font-weight:bold;color:#666;">
                    No Attendance Records Found
                </td>
            </tr>
        `;

        updateCards();
        return;
    }

    attendance.forEach(day => {

        day.records.forEach(emp => {

            let statusClass = "";

            if (emp.status === "Present") {

                present++;
                statusClass = "present-status";

            } else if (emp.status === "Absent") {

                absent++;
                statusClass = "absent-status";

            } else {

                leave++;
                statusClass = "leave-status";

            }

            reportTable.innerHTML += `

                <tr>

                    <td>${day.date}</td>

                    <td>${emp.id}</td>

                    <td>${emp.name}</td>

                    <td>${emp.department}</td>

                    <td class="${statusClass}">
                        ${emp.status}
                    </td>

                </tr>

            `;

        });

    });

    updateCards();

}

// Update Summary Cards
function updateCards() {

    document.getElementById("presentCount").innerText = present;

    document.getElementById("absentCount").innerText = absent;

    document.getElementById("leaveCount").innerText = leave;

}

// Search Report
function searchReport() {

    let search = document
        .getElementById("searchReport")
        .value
        .toLowerCase();

    let rows = document.querySelectorAll("#reportTable tr");

    rows.forEach(row => {

        if (row.innerText.toLowerCase().includes(search)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}

// Load Data Automatically
loadReport();
// =============================
// Export Attendance Report PDF
// =============================

function downloadPDF() {

    const { jsPDF } = window.jspdf;

    let doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Employee Attendance Report", 14, 20);

    doc.setFontSize(11);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 30);

    let rows = [];

    attendance.forEach(day => {

        day.records.forEach(emp => {

            rows.push([

                day.date,
                emp.id,
                emp.name,
                emp.department,
                emp.status

            ]);

        });

    });

    doc.autoTable({

        head: [[
            "Date",
            "ID",
            "Name",
            "Department",
            "Status"
        ]],

        body: rows,

        startY: 40,

        styles: {

            fontSize: 10,
            halign: "center"

        },

        headStyles: {

            fillColor: [37, 99, 235]

        }

    });

    let finalY = doc.lastAutoTable.finalY + 15;

    doc.setFontSize(12);

    doc.text("Summary", 14, finalY);

    doc.text("Present : " + present, 14, finalY + 10);
    doc.text("Absent  : " + absent, 14, finalY + 20);
    doc.text("Leave   : " + leave, 14, finalY + 30);

    doc.save("Attendance_Report.pdf");

}