async function fetchBookNews() {
    const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:fiction');
    const data = await response.json();
    const newsFeed = document.getElementById('news-feed');
    
    data.items.forEach(item => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');
        const description = item.volumeInfo.description || '';
        const truncatedDescription = description.split(' ').slice(0, 20).join(' ') + (description.split(' ').length > 20 ? '...' : '');
        const publisher = item.volumeInfo.publisher || 'Unknown Publisher';
        
        articleElement.innerHTML = `
        <div class="book-news-article">
            <img src="${item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x193.png?text=No+Cover'}" alt="Book Cover">
            <h2>${item.volumeInfo.title}</h2>
            <p>${truncatedDescription}</p>
            <p><strong>Publisher:</strong> ${publisher}</p>
            <a href="${item.volumeInfo.infoLink}" target="_blank">Read more</a>
        </div>
        `;
        newsFeed.appendChild(articleElement);
    });
}

fetchBookNews();
