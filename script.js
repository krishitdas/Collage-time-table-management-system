function addSchedule() {
    const course = document.getElementById('course').value;
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;

    if (course && day && time) {
        if (!isConflict(day, time)) {
            const scheduleList = document.getElementById('schedule-items');
            const li = document.createElement('li');
            li.textContent = `${course} - ${day} at ${time}`;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editSchedule(li, course, day, time);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteSchedule(li);

            li.appendChild(editButton);
            li.appendChild(deleteButton);

            scheduleList.appendChild(li);

            updateScheduleTable();

            document.getElementById('course').value = '';
            document.getElementById('day').value = 'Monday';
            document.getElementById('time').value = '';
        } else {
            alert('Schedule conflict detected. Please choose a different time.');
        }
    } else {
        alert('Please fill in all fields.');
    }
}

function isConflict(day, time) {
    const scheduleItems = document.getElementById('schedule-items').children;
    for (let item of scheduleItems) {
        const [courseDay, courseTime] = item.firstChild.textContent.split(' - ')[1].split(' at ');
        if (courseDay === day && courseTime === time) {
            return true;
        }
    }
    return false;
}

function editSchedule(li, course, day, time) {
    const newCourse = prompt('Edit Course:', course);
    const newDay = prompt('Edit Day:', day);
    const newTime = prompt('Edit Time:', time);

    if (newCourse && newDay && newTime) {
        if (!isConflict(newDay, newTime)) {
            li.firstChild.textContent = `${newCourse} - ${newDay} at ${newTime}`;
            updateScheduleTable();
        } else {
            alert('Schedule conflict detected. Please choose a different time.');
        }
    }
}

function deleteSchedule(li) {
    if (confirm('Are you sure you want to delete this schedule?')) {
        li.remove();
        updateScheduleTable();
    }
}

function updateScheduleTable() {
    const scheduleItems = document.getElementById('schedule-items').children;
    const scheduleTableBody = document.querySelector('#schedule-table tbody');
    scheduleTableBody.innerHTML = '';

    Array.from(scheduleItems).forEach(item => {
        const [courseDay, courseTime] = item.firstChild.textContent.split(' - ')[1].split(' at ');
        const row = document.createElement('tr');

        const courseCell = document.createElement('td');
        courseCell.textContent = item.firstChild.textContent.split(' - ')[0];

        const dayCell = document.createElement('td');
        dayCell.textContent = courseDay;

        const timeCell = document.createElement('td');
        timeCell.textContent = courseTime;

        row.appendChild(courseCell);
        row.appendChild(dayCell);
        row.appendChild(timeCell);

        scheduleTableBody.appendChild(row);
    });
}

function showSection(section) {
    const sections = ['home', 'schedule', 'announcements', 'attendance', 'profile'];
    sections.forEach(s => {
        document.getElementById(s).style.display = s === section ? 'block' : 'none';
    });

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.textContent.toLowerCase() === section) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}