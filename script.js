// script.js
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fetch schedule data from an external JSON file
    fetch('schedule.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(scheduleData => {
            const tableBody = document.querySelector('#schedule-table tbody');

            scheduleData.forEach(row => {
                const tr = document.createElement('tr');

                Object.values(row).forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    tr.appendChild(td);
                });

                tableBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error fetching schedule data:', error);
        });
});
