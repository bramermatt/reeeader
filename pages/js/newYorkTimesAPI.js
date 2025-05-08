// Assuming the bookContainer is the div with id 'book-list'
const bookContainer = document.getElementById('book-list');

// Fetch data from the NYTimes Best Sellers API (example API call)
fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=34YPRaF9tbJvdeYy2rzWGBBAJ5LfDxDB')
  .then(response => response.json())
  .then(data => {
    // Parse the response and update the book list
    const books = data.results.books;

    // Clear existing content
    bookContainer.innerHTML = '';

    // Loop through the books and create HTML elements for each
    books.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('grid-item'); // Reuse existing grid-item class

      // Create the book image, title, and author
      bookDiv.innerHTML = `
      <div>
        <a href="bookDetails.html?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&description=${encodeURIComponent(book.description)}">
          <img src="${book.book_image}" alt="${book.title}">
          <h2>${book.title}</h2>
          <p>${book.author}</p>
        </a>
        <div class="button-container">
          <button onclick="window.location.href='${book.amazon_product_url}'">Amazon</button>
          <button onclick="window.location.href='https://www.barnesandnoble.com/s/${encodeURIComponent(book.title)}'">Barnes and Noble</button>
          <button onclick="window.location.href='bookDetails.html?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&description=${encodeURIComponent(book.description)}'">Book Details</button>
        </div>
      </div>
      `;

      // Append the newly created book element to the bookContainer
      bookContainer.appendChild(bookDiv);
    });
  })
  .catch(error => console.error('Error fetching book data:', error));
