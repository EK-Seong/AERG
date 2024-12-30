// script.js
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const markdownFile = 'reading-list.md';
    const contentContainer = document.getElementById('reading-content');

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
                    td.style.textAlign = "left"; // Align text to the left for consistency with column titles
                    td.style.padding = "8px"; // Add padding for spacing
                    tr.appendChild(td);
                });

                tableBody.appendChild(tr);
            });

            // Apply table layout styling
            const table = document.querySelector('#schedule-table');
            table.style.borderCollapse = "collapse";
            table.style.width = "100%";
        })
        .catch(error => {
            console.error('Error fetching schedule data:', error);
        });
    


    // Fetch the markdown file
    fetch(markdownFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(markdown => {
            // Convert markdown to HTML
            const htmlContent = marked.parse(markdown);
            contentContainer.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error fetching the markdown file:', error);
            contentContainer.innerHTML = '<p>Failed to load the reading list.</p>';
        });
});
