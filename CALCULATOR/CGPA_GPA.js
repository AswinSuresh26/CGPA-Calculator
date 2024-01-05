// GPA Calculation Functions
function calculateGradePointAverage(grades) {
 const weightedSum = grades.reduce((total, grade, i) => total + (grade * (i + 1)), 0);
 const gpa = weightedSum / (grades.length * (grades.length + 1)) / 10;
 return gpa.toFixed(2);
}

function calculateCumulativeGradePointAverage(semesterGrades) {
 const totalPoints = semesterGrades.reduce((total, grade) => total + grade, 0);
 const totalCredits = semesterGrades.length;
 const cgpa = totalPoints / totalCredits / 10;
 return cgpa.toFixed(2);
}

function calculateCumulativeSemestersCGPA(semestersGrades) {
 const cgpas = semestersGrades.map(semesterGrades => calculateCumulativeGradePointAverage(semesterGrades));
 const overallCGPA = cgpas.reduce((total, cgpa) => total + cgpa, 0) / cgpas.length;
 return overallCGPA.toFixed(2);
}

// Getting inputs from user for grade
const semestersCount = parseInt(prompt("Enter the number of semesters:"));
const userGrades = [];

for (let i = 0; i < semestersCount; i++) {
 const semesterGrades = {
   subj1: parseFloat(prompt(`Enter your grade for Subject 1 in Semester ${i + 1}:`)), 
   subj2: parseFloat(prompt(`Enter your grade for Subject 2 in Semester ${i + 1}:`)), 
   subj3: parseFloat(prompt(`Enter your grade for Subject 3 in Semester ${i + 1}:`)), 
   subj4: parseFloat(prompt(`Enter your grade for Subject 4 in Semester ${i + 1}:`)), 
   subj5: parseFloat(prompt(`Enter your grade for Subject 5 in Semester ${i + 1}:`))
 };

 userGrades.push(Object.values(semesterGrades));
}

// User's input are validated
if (userGrades.some(semesterGrades => semesterGrades.some(isNaN))) {
 console.log("Please enter valid grades for all subjects.");
} else {
 // GPA for each semester is Calculated and displayed
 userGrades.forEach((semesterGrades, i) => {
   const calculatedGPA = calculateGradePointAverage(semesterGrades);
   console.log(`Your GPA for Semester ${i + 1} is: ${calculatedGPA}`);
 });

 // CGPA for each semester is Calculated and displayed
 userGrades.forEach((semesterGrades, i) => {
   const calculatedCGPA = calculateCumulativeGradePointAverage(semesterGrades);
   console.log(`Your CGPA for Semester ${i + 1} is: ${calculatedCGPA}`);
 });

 // Overall CGPA is Calculated and displayed
 const overallCGPA = calculateCumulativeSemestersCGPA(userGrades);
 console.log(`Your Overall CGPA is: ${overallCGPA}`);
}
