// ======================================
// Login Protection
// ======================================

if (sessionStorage.getItem("isLoggedIn") !== "true") {

    alert("Please login first.");

    window.location.href = "index.html";

}
// =====================================
// Employee Attendance System
// =====================================

// Company Name
let companyName = localStorage.getItem("companyName");

document.getElementById("companyTitle").innerHTML =
companyName || "Employee Attendance System";

document.getElementById("sidebarTitle").innerHTML =
companyName || "EMS";

// Today's Date
const today = new Date();

document.getElementById("todayDate").innerHTML =
today.toLocaleDateString("en-IN",{
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric"
});

// Set Today's Date
document.getElementById("attendanceDate").valueAsDate = new Date();

// Load Employees
let employees =
JSON.parse(localStorage.getItem("employees")) || [];

// Load Attendance
let attendance =
JSON.parse(localStorage.getItem("attendance")) || [];

// Display Employees
displayAttendance();

// ============================
// Display Attendance
// ============================

function displayAttendance(){

    let table =
    document.getElementById("attendanceBody");

    table.innerHTML="";

    if(employees.length===0){

        table.innerHTML=`
        <tr>
            <td colspan="4">
                No Employees Found.
                Please add employees first.
            </td>
        </tr>
        `;

        return;

    }

    employees.forEach(emp=>{

        table.innerHTML+=`

        <tr>

            <td>${emp.id}</td>

            <td>${emp.name}</td>

            <td>${emp.department}</td>

            <td>

                <select>

                    <option value="Present">
                        Present
                    </option>

                    <option value="Absent">
                        Absent
                    </option>

                    <option value="Leave">
                        Leave
                    </option>

                </select>

            </td>

        </tr>

        `;

    });

}

// ============================
// Load Saved Attendance
// ============================

document.getElementById("attendanceDate")
.addEventListener("change",loadAttendance);

function loadAttendance(){

    let date =
    document.getElementById("attendanceDate").value;

    displayAttendance();

    let saved =
    attendance.find(item=>item.date===date);

    if(!saved) return;

    let rows =
    document.querySelectorAll("#attendanceBody tr");

    rows.forEach((row,index)=>{

        if(saved.records[index]){

            row.querySelector("select").value =
            saved.records[index].status;

        }

    });

}

// ============================
// Save Attendance
// ============================

function saveAttendance(){

    let date =
    document.getElementById("attendanceDate").value;

    if(date===""){

        alert("Please select a date.");

        return;

    }

    let rows =
    document.querySelectorAll("#attendanceBody tr");

    let records=[];

    rows.forEach(row=>{

        if(row.cells.length>1){

            records.push({

                id:row.cells[0].innerText,

                name:row.cells[1].innerText,

                department:row.cells[2].innerText,

                status:row.querySelector("select").value

            });

        }

    });

    attendance =
    attendance.filter(item=>item.date!==date);

    attendance.push({

        date:date,

        records:records

    });

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );

    alert("Attendance Saved Successfully!");

}