document.addEventListener("DOMContentLoaded", function() {
    const authorDetailsDiv = document.getElementById('authorDetails');
    if (!authorDetailsDiv) {
        console.error("Element with id 'authorDetails' not found.");
        return;
    }

    // Extract the author key from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const authorKey = urlParams.get('key');

    if (authorKey) {
        fetchAuthorDetails(authorKey);
    } else {
        authorDetailsDiv.innerHTML = "<p>No author key provided.</p>";
    }

    async function fetchAuthorDetails(key) {
        authorDetailsDiv.innerHTML = "<p>Loading...</p>";

        try {
            const response = await fetch(`https://openlibrary.org/authors/${key}.json`);
            if (!response.ok) throw new Error("Failed to fetch author details");

            const author = await response.json();
            displayAuthorDetails(author);
        } catch (error) {
            console.error(error);
            authorDetailsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }

    function displayAuthorDetails(author) {
        const birthDate = author.birth_date || 'Unknown birth date';
        const deathDate = author.death_date || 'Still alive';
        const bio = author.bio ? (typeof author.bio === 'string' ? author.bio : author.bio.value) : 'No biography available';

        document.title = author.name; // Update the document's title

        authorDetailsDiv.innerHTML = `
            <div class="author-detail">
                <h2>${author.name}</h2>
                <p><strong>Birth Date</strong>: ${birthDate}</p>
                <p><strong>Death Date</strong>: ${deathDate}</p>
                <p><strong>Biography</strong>: ${bio}</p>
            </div>
        `;
    }
});