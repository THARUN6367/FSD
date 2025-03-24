let students = []; // Array to store student details

function saveStudent() {
    const usn = document.getElementById("usn").value;
    const name = document.getElementById("name").value;
    const college = document.getElementById("college").value;
    const branch = document.getElementById("branch").value;
    const year_of_joining = document.getElementById("year_of_joining").value;
    const email = document.getElementById("email").value;

    // Add student details to array
    students.push({ usn, name, college, branch, year_of_joining, email });

    // Clear input fields after adding
    document.getElementById("usn").value = "";
    document.getElementById("name").value = "";
    document.getElementById("college").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("year_of_joining").value = "";
    document.getElementById("email").value = "";

    alert("Student details added successfully!");
}

function displayStudents() {
    if (students.length === 0) {
        alert("No student data available!");
        return;
    }

    const newWindow = window.open();
    newWindow.document.open();

    // Create student table
    let tableContent = `
        <html>
        <head>
            <title>Student Details</title>
            <style>
                body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; text-align: center; }
                table { width: 80%; margin: auto; border-collapse: collapse; background: white; }
                th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                th { background: #333; color: white; }
                tr:nth-child(even) { background: #f2f2f2; }
            </style>
        </head>
        <body>
            <h2>Student Details</h2>
            <table>
                <tr>
                    <th>USN</th>
                    <th>Name</th>
                    <th>College</th>
                    <th>Branch</th>
                    <th>Year of Joining</th>
                    <th>Email</th>
                </tr>`;

    students.forEach(student => {
        tableContent += `
                <tr>
                    <td>${student.usn}</td>
                    <td>${student.name}</td>
                    <td>${student.college}</td>
                    <td>${student.branch}</td>
                    <td>${student.year_of_joining}</td>
                    <td>${student.email}</td>
                </tr>`;
    });

    tableContent += `
            </table>
        </body>
        </html>`;

    newWindow.document.write(tableContent);
    newWindow.document.close();
}
