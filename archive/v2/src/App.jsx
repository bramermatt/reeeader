import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookData, setBookData] = useState([]);

  // Fetch books from Google Books API based on search query
  const searchBooks = async () => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
    setBookData(response.data.items);
  };

  // Add book to currently reading list
  const addToCurrentlyReading = (book) => {
    setCurrentlyReading([...currentlyReading, book]);
  };

  useEffect(() => {
    if (searchQuery) {
      searchBooks();
    }
  }, [searchQuery]);

  return (
    <div className="app-container">
      <h1>Currently Reading</h1>

      {/* Search for books */}
      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Search results */}
      <div className="search-results">
        {bookData.length > 0 && (
          <div>
            <h3>Search Results:</h3>
            <ul>
              {bookData.map((book) => (
                <li key={book.id}>
                  <h4>{book.volumeInfo.title}</h4>
                  <p>{book.volumeInfo.authors?.join(', ')}</p>
                  <button onClick={() => addToCurrentlyReading(book)}>Add to Currently Reading</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Currently Reading List */}
      <div>
        <h3>Your Currently Reading List</h3>
        <ul>
          {currentlyReading.map((book, index) => (
            <li key={index}>
              <h4>{book.volumeInfo.title}</h4>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
