<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CGPA Calculator</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }

        form {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            width: 300px;
            text-align: center;
            padding: 20px;
            margin: 20px;
        }

        h2 {
            color: #28a745;
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #495057;
        }

        input {
            width: 100%;
            padding: 8px;
            margin-bottom: 12px;
            box-sizing: border-box;
            border: 1px solid #ced4da;
            border-radius: 4px;
            background-color: #f8f9fa;
        }

        button {
            background-color: #28a745;
            color: #ffffff;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #218838;
        }

        #subjectPage {
            display: none;
            margin-top: 20px;
        }

        fieldset {
            border: 1px solid #ced4da;
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 20px;
        }

        legend {
            color: #28a745;
            font-weight: bold;
            font-size: 16px;
        }

        select, button {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            box-sizing: border-box;
            border: 1px solid #ced4da;
            border-radius: 4px;
            background-color: #28a745;
            color: #ffffff;
            cursor: pointer;
        }

        select:hover, button:hover {
            background-color: #218838;
        }

        #result {
            margin-top: 20px;
            text-align: center;
            color: #28a745;
        }
    </style>
</head>
<body>
    <form id="semesterForm">
        <h2>CGPA Calculator</h2>

        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>

        <label for="registerNumber">Register Number:</label>
        <input type="text" id="registerNumber" name="registerNumber" required>

        <label for="semesters">Number of Semesters Attended:</label>
        <input type="number" id="semesters" name="semesters" required>

        <button type="button" onclick="getUserInputs()">Next</button>
    </form>

    <div id="subjectPage">
        <form id="cgpaForm" onsubmit="return false;">
            <div id="subjectsContainer"></div>

            <button type="button" onclick="calculateSemesterGPA()">Calculate Semester GPA</button>
            <button type="button" onclick="calculateCGPA()">Calculate Overall CGPA</button>

            <div id="result"></div>
        </form>
    </div>

    <script>
        function getUserInputs() {
            const name = document.getElementById('name').value.trim();
            const registerNumber = document.getElementById('registerNumber').value.trim();
            const semesters = document.getElementById('semesters').value;

            if (name === '' || registerNumber === '' || isNaN(semesters) || semesters <= 0) {
                alert('Please enter valid information.');
                return;
            }

            // Now, you can proceed to generate subject inputs based on the user inputs.
            generateSubjectInputs();
        }

        function generateSubjectInputs() {
            const semesters = document.getElementById('semesters').value;
            const subjectPage = document.getElementById('subjectPage');
            const subjectsContainer = document.getElementById('subjectsContainer');
            const name = document.getElementById('name').value.trim();
            const registerNumber = document.getElementById('registerNumber').value.trim();

            // Validate name and register number
            if (name === '' || registerNumber === '') {
                alert('Please enter valid Name and Register Number.');
                return;
            }

            subjectsContainer.innerHTML = '';

            for (let i = 1; i <= semesters; i++) {
                const numSubjects = prompt(`Enter the number of subjects for Semester ${i}:`);
                subjectsContainer.innerHTML += `<fieldset><legend>Semester ${i}</legend>`;

                for (let j = 1; j <= numSubjects; j++) {
                    subjectsContainer.innerHTML += `
                        <label for="courseName${i}_${j}">Course ${j} Name:</label>
                        <input type="text" id="courseName${i}_${j}" name="courseName${i}_${j}" required>
                        <label for="credit${i}_${j}">Credit Points (e.g., 3):</label>
                        <input type="number" id="credit${i}_${j}" name="credit${i}_${j}" required>
                        <label for="grade${i}_${j}">Grade:</label>
                        <select id="grade${i}_${j}" name="grade${i}_${j}" required>
                            <option value="O">O</option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="U">U</option>
                        </select><br><br>`;
                }
                subjectsContainer.innerHTML += `</fieldset>`;
            }

            subjectPage.style.display = 'block';
        }

        function calculateSemesterGPA() {
            const semesters = document.getElementById('semesters').value;
            const resultContainer = document.getElementById('result');
            const name = document.getElementById('name').value.trim();

            resultContainer.innerHTML = '';  // Clear previous results

            for (let i = 1; i <= semesters; i++) {
                let totalCredits = 0;
                let totalGradePointCredits = 0;

                const numSubjects = document.getElementById(`subjectsContainer`).getElementsByTagName(`fieldset`).length;

                for (let j = 1; j <= numSubjects; j++) {
                    const credit = parseFloat(document.getElementById(`credit${i}_${j}`).value);
                    const grade = document.getElementById(`grade${i}_${j}`).value;

                    const gradeScale = { 'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'U': 0 };
                    const gradePoint = gradeScale[grade] || 0;

                    totalCredits += credit;
                    totalGradePointCredits += gradePoint * credit;
                }

                // Calculate GPA for the semester and display it
                const semesterGPA = totalGradePointCredits / totalCredits;
                resultContainer.innerHTML += `<p>${name}'s Semester ${i} GPA: ${semesterGPA.toFixed(2)}</p>`;
            }
        }

        function calculateCGPA() {
            const semesters = document.getElementById('semesters').value;
            const resultContainer = document.getElementById('result');
            const name = document.getElementById('name').value.trim();

            let totalCredits = 0;
            let totalGradePointCredits = 0;

            for (let i = 1; i <= semesters; i++) {
                const numSubjects = document.getElementById(`subjectsContainer`).getElementsByTagName(`fieldset`).length;

                for (let j = 1; j <= numSubjects; j++) {
                    const credit = parseFloat(document.getElementById(`credit${i}_${j}`).value);
                    const grade = document.getElementById(`grade${i}_${j}`).value;

                    const gradeScale = { 'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'U': 0 };
                    const gradePoint = gradeScale[grade] || 0;

                    totalCredits += credit;
                    totalGradePointCredits += gradePoint * credit;
                }
            }

            // Calculate CGPA by dividing the total grade points by total credits
            const cgpa = totalGradePointCredits / totalCredits;

            resultContainer.innerHTML = `
                <h2>CGPA Calculation Result</h2>
                <p>${name}'s Overall CGPA is: ${cgpa.toFixed(2)}</p>`;
        }
    </script>
</body>
</html>
