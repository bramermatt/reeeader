document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');

    searchBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        performSearch();
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            performSearch();
        }
    });

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        if (query) {
            searchBooks(query);
            searchModal.style.display = "block"; // Show the modal
        } else {
            searchResults.innerHTML = ''; // Clear results if query is empty
        }
    }

    async function searchBooks(query) {
        console.log(`Searching for: ${query}`);

        searchResults.innerHTML = "<p>Loading...</p>";

        try {
            const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`);
            console.log(response);

            if (!response.ok) throw new Error("Failed to fetch data");

            const data = await response.json();
            console.log(data);

            const books = data.docs.map(item => ({
                title: item.title,
                author_name: item.author_name,
                first_publish_year: item.first_publish_year,
                cover_i: item.cover_i,
                key: item.key,
                number_of_pages_median: item.number_of_pages_median,
                series: item.series
            }));

            displayResults(books);
        } catch (error) {
            console.error(error);
            searchResults.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }

    function displayResults(books) {
        if (books.length === 0) {
            searchResults.innerHTML = "<p>No books found.</p>";
            return;
        }

        const html = books
            .slice(0, 10)
            .map(
            (book) => {
                const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/128x193.png?text=No+Cover';
                const author = book.author_name ? book.author_name.map(name => `<a href="authorDetails.html?name=${encodeURIComponent(name)}" target="_blank">${name}</a>`).join(', ') : 'Unknown author';
                const publishDate = book.first_publish_year ? book.first_publish_year : 'Unknown year';
                const pageCount = book.number_of_pages_median ? book.number_of_pages_median : 'Unknown page count';
                const series = book.series && book.series.length > 0 ? book.series.join(', ') : 'No series information available';
                const bookUrl = `bookDetails.html?key=${book.key}`;
                return `<li>
                <img src="${coverUrl}" alt="Cover" style="width:128px;height:193px;">
                <div>
                <a href="${bookUrl}"><h2>${book.title}</h2></a> by ${author}
                <p>Published: ${publishDate}</p>
                <p>Page Count: ${pageCount}</p>
                <!-- <p>Series: ${series}</p> -->
                <button onclick="addToList('${book.key}')">Add to List</button>
                </div>
            </li>`;
            }
            )
            .join("");

        searchResults.innerHTML = `<h2>Search Results:</h2><ul>${html}</ul>`;
    }

    window.addEventListener("click", (event) => {
        if (event.target === searchModal) {
            searchModal.style.display = "none";
            searchResults.innerHTML = "";
            searchInput.value = "";
        }
    });
});

function addToList(bookKey) {
    alert(`Book with key ${bookKey} added to list.`);
}