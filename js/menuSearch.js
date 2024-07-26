document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.getElementById('searchIcon');
    const searchBox = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    const fakeResults = [
        'The Great Gatsby',
        'To Kill a Mockingbird',
        '1984',
        'The Catcher in the Rye',
        'Moby Dick'
    ];

    searchIcon.addEventListener('click', function() {
        searchBox.classList.toggle('visible');
        if (searchBox.classList.contains('visible')) {
            searchBox.focus();
        } else {
            searchBox.blur();
            searchResults.classList.add('hidden');
        }
    });

    searchBox.addEventListener('input', function() {
        if (searchBox.value.trim() === '') {
            searchResults.classList.add('hidden');
            return;
        }

        searchResults.innerHTML = '';
        fakeResults.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result;
            searchResults.appendChild(li);
        });
        searchResults.classList.remove('hidden');
    });
});


//  modal


// document.addEventListener('DOMContentLoaded', function() {
//     const searchIcon = document.getElementById('searchIcon');
//     const searchBox = document.getElementById('searchInput');
//     const searchResults = document.getElementById('searchResults');
//     const searchModal = document.getElementById('searchModal');
//     const closeModal = document.querySelector('.close');

//     const fakeResults = [
//         'The Great Gatsby',
//         'To Kill a Mockingbird',
//         '1984',
//         'The Catcher in the Rye',
//         'Moby Dick'
//     ];

//     searchIcon.addEventListener('click', function() {
//         searchBox.classList.toggle('visible');
//         if (searchBox.classList.contains('visible')) {
//             searchBox.focus();
//         } else {
//             searchBox.blur();
//         }
//     });

//     searchBox.addEventListener('input', function() {
//         if (searchBox.value.trim() === '') {
//             searchResults.innerHTML = '';
//             searchModal.style.display = 'none';
//             return;
//         }

//         searchResults.innerHTML = '';
//         fakeResults.forEach(result => {
//             const a = document.createElement('a');
//             a.textContent = result;
//             a.href = '#'; 
//         });
//         searchModal.style.display = 'flex';
//     });

//     closeModal.addEventListener('click', function() {
//         searchModal.style.display = 'none';
//     });

//     window.addEventListener('click', function(event) {
//         if (event.target === searchModal) {
//             searchModal.style.display = 'none';
//         }
//     });
// });
