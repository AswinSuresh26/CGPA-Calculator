// Function to calculate GPA
function calculateGradePointAverage({ subj1, subj2, subj3, subj4, subj5 }) {
 const totalGradePoints = subj1 + subj2 + subj3 + subj4 + subj5;
 const creditWeight1 = 5;
 const gpa = totalGradePoints / creditWeight1;
 return gpa.toFixed(2);
}

// Function to calculate CGPA
function calculateCumulativeGradePointAverage({ subj1, subj2, subj3, subj4, subj5 }) {
 const creditWeight2 = 4;
 const totalGradePoints = subj1 + subj2 + subj3 + subj4 + subj5;
 const cgpa = totalGradePoints / (5 * creditWeight2);
 return cgpa.toFixed(2);
}

// Getting inputs from user for grade
const userGrades = {
 subj1: parseFloat(prompt("Enter your grade for Subject 1:")), 
 subj2: parseFloat(prompt("Enter your grade for Subject 2:")), 
 subj3: parseFloat(prompt("Enter your grade for Subject 3:")), 
 subj4: parseFloat(prompt("Enter your grade for Subject 4:")), 
 subj5: parseFloat(prompt("Enter your grade for Subject 5:"))
};

// User's input are validated
if (
 isNaN(userGrades.subj1) ||
 isNaN(userGrades.subj2) ||
 isNaN(userGrades.subj3) ||
 isNaN(userGrades.subj4) ||
 isNaN(userGrades.subj5)
) {
 console.log("Please enter valid grades for all subjects.");
} else {
 // GPA is Calculated and displayed
 const calculatedGPA = calculateGradePointAverage(userGrades);
 console.log(`Your GPA is: ${calculatedGPA}`);

 // CGPA is Calculated and displayed
 const calculatedCGPA = calculateCumulativeGradePointAverage(userGrades);
 console.log(`Your CGPA is: ${calculatedCGPA}`);
}
