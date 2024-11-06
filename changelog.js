// Function to fetch changelog data from the server
async function fetchChangelog() {
    try {
        const response = await fetch('/changelog'); // Request to /changelog API
        const data = await response.json();         // Parse JSON response
        displayChangelog(data);                     // Call function to display data
    } catch (error) {
        document.getElementById('changelog').innerHTML = "<h2>Error fetching changelog</h2>";
        console.error("Error fetching changelog:", error);
    }
}

// Function to display the changelog on the page
function displayChangelog(data) {
    const changelogDiv = document.getElementById('changelog');
    changelogDiv.innerHTML = ''; // Clear loading message

    // Create sections for Features, Bug Fixes, and Others
    for (let category in data) {
        if (data[category].length) {
            const categoryHeader = document.createElement('h2');
            categoryHeader.textContent = category;
            changelogDiv.appendChild(categoryHeader);

            const ul = document.createElement('ul');
            data[category].forEach(commit => {
                const li = document.createElement('li');
                li.textContent = commit;
                ul.appendChild(li);
            });
            changelogDiv.appendChild(ul);
        }
    }
}

// Fetch changelog when the page loads
fetchChangelog();
