// Array to hold student data
const students = [];

// Function to add a student and mark attendance
function addStudent() {
    const admissionNumber = document.getElementById("admissionNumber").value.trim();
    const name = document.getElementById("name").value.trim();
    const form = document.getElementById("form").value;

    if (!admissionNumber || !name || !form) {
        alert("Please fill out all fields.");
        return;
    }

    // Check if the student already exists
    const existingStudent = students.find(student => student.admissionNumber === admissionNumber);
    if (existingStudent) {
        alert("Student with this admission number already exists.");
        return;
    }

    // Add student to the array
    const newStudent = {
        admissionNumber,
        name,
        form,
        attendance: true,  // Automatically mark attendance as true
    };
    students.push(newStudent);

    alert("Student added and attendance marked.");

    // Clear the form fields
    document.getElementById("admissionNumber").value = '';
    document.getElementById("name").value = '';
    document.getElementById("form").value = 'Form 1';

    // Update the student table if "All Students" section is displayed
    if (document.getElementById("allStudentsSection").style.display === "block") {
        displayAllStudents();
    }
}

// Function to search for a student by admission number
function searchStudent() {
    const admissionNumber = document.getElementById("searchAdmissionNumber").value.trim();
    const student = students.find(student => student.admissionNumber === admissionNumber);

    if (student) {
        document.getElementById("searchResult").textContent =
            `Name: ${student.name}, Form: ${student.form}, Attendance: ${student.attendance ? "Present" : "Absent"}`;
    } else {
        document.getElementById("searchResult").textContent = "Student not found.";
    }

    document.getElementById("searchAdmissionNumber").value = '';
}

// Function to display all students in a table
function displayAllStudents() {
    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.admissionNumber}</td>
            <td>${student.name}</td>
            <td>${student.form}</td>
            <td>${student.attendance ? "Present" : "Absent"}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to show the selected section and hide others
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });

    // Automatically display all students when "All Students" section is shown
    if (sectionId === 'allStudentsSection') {
        displayAllStudents();
    }
}
