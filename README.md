# Employee Attendance Management System

A web-based Employee Attendance Management System developed using HTML, CSS, and JavaScript.

This project provides a simple and user-friendly interface for managing employees, recording daily attendance, viewing attendance reports, and customizing company information.

The project was developed as a practical academic and portfolio project to demonstrate front-end web development concepts and real-world application functionality.

---

## 📌 About the Project

The Employee Attendance Management System is a front-end web application designed to simplify basic employee and attendance management.

The application provides a complete user flow starting from account registration and login, followed by employee management, attendance tracking, reports, and company settings.

The project focuses on creating a functional multi-page web application using client-side technologies without requiring an external backend or database.

---

## 🚀 Features

### 🔐 User Registration & Login

- Create a new user account
- Login using registered username and password
- Password visibility toggle
- Remember Me option
- Logout functionality
- Basic client-side authentication

### 👨‍💼 Employee Management

- Add new employees
- Edit employee information
- Delete employee records
- Search employees
- View employee details
- Dynamic employee table

### 📅 Attendance Management

- Select attendance date
- Record employee attendance
- Present status
- Absent status
- Leave status
- Save attendance records
- View employee attendance information

### 📊 Reports

- View attendance records
- Search attendance information
- Display Present count
- Display Absent count
- Display Leave count
- Generate attendance reports
- Export reports as PDF

### ⚙️ Company Settings

Users can customize basic company information such as:

- Company Name
- Admin Name
- Email
- Phone Number

The settings are stored locally and can be used throughout the application.

### 💾 LocalStorage

Browser LocalStorage is used to store application data such as:

- User accounts
- Employee records
- Attendance records
- Company settings

No external database is required.

### 📱 Responsive Design

The interface is designed to work across different screen sizes, including:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

## 🛠️ Technologies Used

### Front-End

- HTML5
- CSS3
- JavaScript

### Storage

- Browser LocalStorage

### PDF Generation

- jsPDF
- jsPDF AutoTable

### Development Tools

- Visual Studio Code
- GitHub
- Web Browser

---

## 📁 Project Structure

```text
Employee-Attendance-Management-System/
│
├── index.html
├── register.html
├── dashboard.html
├── employees.html
├── attendance.html
├── reports.html
├── settings.html
│
├── css/
│   ├── attendance.css
│   ├── dashboard.css
│   ├── employee.css
│   ├── login.css
│   ├── register.css
│   ├── reports.css
│   ├── settings.css
│   └── style.css
│
└── js/
    ├── attendance.js
    ├── dashboard.js
    ├── employee.js
    ├── login.js
    ├── register.js
    ├── reports.js
    └── settings.js
