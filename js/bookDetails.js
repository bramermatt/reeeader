document.addEventListener("DOMContentLoaded", function() {
    const bookDetailsDiv = document.getElementById('bookDetails');

    // Extract the book key from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookKey = urlParams.get('key');

    if (bookKey) {
        fetchBookDetails(bookKey);
    } else {
        bookDetailsDiv.innerHTML = `
            <p>No book key provided.</p>
            <p><a href="javascript:history.back()">Go Back</a></p>
        `;
    }

    async function fetchBookDetails(key) {
        bookDetailsDiv.innerHTML = "<p>Loading...</p>";

        try {
            const openLibraryResponse = await fetch(`https://openlibrary.org${key}.json`);
            if (!openLibraryResponse.ok) throw new Error("Failed to fetch book details from OpenLibrary");

            const openLibraryBook = await openLibraryResponse.json();
            displayBookDetails(openLibraryBook);

            const googleBooksResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${openLibraryBook.isbn_13 || openLibraryBook.isbn_10}`);
            if (!googleBooksResponse.ok) throw new Error("Failed to fetch book details from Google Books");

            const googleBooksData = await googleBooksResponse.json();
            if (googleBooksData.totalItems > 0) {
                const googleBook = googleBooksData.items[0].volumeInfo;
                displayGoogleBookDetails(googleBook);
            }
        } catch (error) {
            console.error(error);
            bookDetailsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }

    function displayBookDetails(book) {
        const coverUrl = book.covers ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg` : 'https://via.placeholder.com/128x193.png?text=No+Cover';
        const author = book.authors ? book.authors.map(author => `<a href="https://openlibrary.org${author.key}" target="_blank">${author.name}</a>`).join(', ') : 'Unknown author';
        const publishDate = book.first_publish_date || 'Unknown year';
        const description = book.description ? (typeof book.description === 'string' ? book.description : book.description.value) : 'No description available';

        document.title = book.title; // Update the document's title

        const amazonLink = `https://www.amazon.com/s?k=${encodeURIComponent(book.title)}`;
        const barnesAndNobleLink = `https://www.barnesandnoble.com/s/${encodeURIComponent(book.title)}`;

        bookDetailsDiv.innerHTML = `
            <div class="book-detail">
            <div class="book-cover">
            <img src="${coverUrl}" alt="Cover">
            <p><a href="${amazonLink}" target="_blank">Buy on Amazon</a></p>
            <p><a href="${barnesAndNobleLink}" target="_blank">Buy on Barnes & Noble</a></p>
            </div>
            <div class="book-info">
                <h2>${book.title}</h2>
                <p><strong>Author</strong>: ${author}</p>
                <p><strong>Published</strong>: ${publishDate}</p>
                <p><strong>Description</strong>: ${description}</p>
            </div>
            </div>
        `;
    }

    function displayGoogleBookDetails(book) {
        const googleBookDetailsDiv = document.createElement('div');
        googleBookDetailsDiv.className = 'google-book-detail';

        const googleBookDescription = book.description || 'No description available';
        const googleBookPublisher = book.publisher || 'Unknown publisher';
        const googleBookPublishedDate = book.publishedDate || 'Unknown date';

        googleBookDetailsDiv.innerHTML = `
            <div class="google-book-info">
                <h3>Additional Information from Google Books</h3>
                <p><strong>Publisher</strong>: ${googleBookPublisher}</p>
                <p><strong>Published Date</strong>: ${googleBookPublishedDate}</p>
                <p><strong>Description</strong>: ${googleBookDescription}</p>
            </div>
        `;

        bookDetailsDiv.appendChild(googleBookDetailsDiv);
    }
});