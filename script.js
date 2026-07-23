// TASK 1 – Grab & Change
const heading = document.querySelector('#main-heading');
const paragraph = document.querySelector('#main-paragraph');

// Changes happen as soon as the script runs (after HTML loads)
heading.textContent = ' LAB 9';
paragraph.style.color = '#7c3aed'; // Purple
paragraph.textContent = 'This text changed to purple!';

//  TASK 2 – Click Counter
let count = 0;
const countDisplay = document.querySelector('#count-display');
const countBtn = document.querySelector('#count-btn');

countBtn.addEventListener('click', () => {
    count++;
    countDisplay.textContent = count;
});

//  TASK 3 – Toggle a Theme
const themeBtn = document.querySelector('#theme-btn');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Toggle button text
    themeBtn.textContent = document.body.classList.contains('dark')
        ? '☀️ Light Mode'
        : '🌙 Dark Mode';
});


//  TASK 4 – Build a List from Data
const courses = ['CS361 Web Programming', 'CS235 Databases', 'CS320 Networks and parallel computing'];
const courseList = document.querySelector('#course-list');
const addCourseBtn = document.querySelector('#add-course-btn');

// Function to render the list (also used by Task 5)
function renderCourses(list) {
    if (list.length === 0) {
        courseList.innerHTML = '<li style="color:#94a3b8; border-left-color:#94a3b8;">No courses match.</li>';
        return;
    }
    courseList.innerHTML = list.map((course) => `<li>${course}</li>`).join('');
}

// Initial render
renderCourses(courses);

// Add new course with createElement
addCourseBtn.addEventListener('click', () => {
    const newCourse = prompt('Enter new course name:');
    if (newCourse && newCourse.trim() !== '') {
        courses.push(newCourse.trim());
        // Re-render using the current filter (Task 05 integration)
        const filterValue = document.querySelector('#filter-input').value.trim().toLowerCase();
        const filtered = courses.filter((c) => c.toLowerCase().includes(filterValue));
        renderCourses(filtered);
    }
});

//  TASK 5 – Live Search Filter
const filterInput = document.querySelector('#filter-input');
filterInput.addEventListener('input', () => {
    const searchTerm = filterInput.value.trim().toLowerCase();
    const filtered = courses.filter((course) =>
        course.toLowerCase().includes(searchTerm)
    );
    renderCourses(filtered);
});

//  TASK 6 – Validate a Form
const form = document.querySelector('#signup-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const formMsg = document.querySelector('#form-message');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page reload

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();

    // Reset message class
    formMsg.className = '';
    if (nameVal === '') {
        formMsg.textContent = '❌ Name is required.';
        formMsg.className = 'error';
        return;
    }

    if (!emailVal.includes('@')) {
        formMsg.textContent = '❌ Please enter a valid email (must contain @).';
        formMsg.className = 'error';
        return;
    }
    // Success
    formMsg.textContent = '✅ Signup successful! (demo)';
    formMsg.className = 'success';
});