document.addEventListener('DOMContentLoaded', function() {
  const feed = document.createElement('div');
  feed.id = 'feed';
  document.body.appendChild(feed);

  // Load existing posts from localStorage
  loadPostsFromStorage();

  const plusButton = document.getElementById('plus-btn');
  const postModal = document.getElementById('post-modal');
  const closeButton = document.querySelector('.close-btn');

  // Show the post modal
  plusButton.addEventListener('click', function() {
    postModal.style.display = 'block';
  });

  // Close the modal when the close button is clicked
  closeButton.addEventListener('click', function() {
    postModal.style.display = 'none';
  });

  // Close the modal if the user clicks anywhere outside the modal content
  window.addEventListener('click', function(event) {
    if (event.target === postModal) {
      postModal.style.display = 'none';
    }
  });

  const submitButton = document.getElementById('submit-post');
  submitButton.addEventListener('click', function() {
    const postContent = document.getElementById('post-content').value;

    const post = {
      username: 'tempuser',
      content: postContent,
      timestamp: new Date().toISOString()
    };

    addPostToFeed(post, true);
    savePostToStorage(post);

    // Hide the modal and clear the textarea
    postModal.style.display = 'none';
    document.getElementById('post-content').value = '';
  });

  function timeAgo(timestamp) {
    const now = new Date();
    const secondsAgo = Math.floor((now - new Date(timestamp)) / 1000);

    if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo} hours ago`;
    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo} days ago`;
  }

  function addPostToFeed(post, isNew = false) {
    const postElement = document.createElement('div');
    postElement.className = 'post';

    const relativeTime = timeAgo(post.timestamp);
    const profileImageURL = `https://ui-avatars.com/api/?name=${post.username}&background=random`;

    postElement.innerHTML = `
      <img src="${profileImageURL}" alt="Profile Image"/>
      <div id="profilePost">
        <div id="postUser">
          <h2>${post.username}</h2> <h3>${relativeTime}</h3>
          <button class="ellipsis-btn">...</button>

                <!-- Dropdown menu for post options -->
      <div class="post-menu" style="display: none;">
        <ul>
          <li class="delete-btn">Delete</li>
        </ul>
      </div>
      </div>
      <p>${post.content}</p>


    </div>
    `;

    const modalsHTML = `
      <!-- Modal for writing a post -->
      <div id="post-modal" class="modal">
        <div class="modal-content">
          <span class="close-btn">&times;</span>
          <div class="profile-info">
            <img src="${profileImageURL}" alt="Profile Image"/><h2>${post.username}</h2>
            </div>
          <textarea id="post-content" placeholder="What's new?"></textarea>
          <div class="modal-footer">
            <button id="submit-post">Post</button>
            <div class="modal-actions">
              <button><i class="fa fa-gift"></i></button>
              <button><i class="fa fa-hashtag"></i></button>
              <button><i class="fa fa-equals"></i></button>
            </div>
          </div>
        </div>
      </div>
    `


    

    document.body.insertAdjacentHTML('beforeend', modalsHTML);

    const ellipsisButton = postElement.querySelector('.ellipsis-btn');
    const postMenu = postElement.querySelector('.post-menu');
  
    // Toggle the dropdown menu when the ellipsis button is clicked
    ellipsisButton.addEventListener('click', function() {
      postMenu.style.display = postMenu.style.display === 'none' ? 'block' : 'none';
    });
  
    // Add event listener to the delete button
    const deleteButton = postElement.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
      // Remove the post from the feed
      postElement.remove();
      // Remove the post from localStorage
      deletePostFromStorage(post.timestamp);
    });
  
      if (isNew) {
        feed.prepend(postElement);
      } else {
        feed.appendChild(postElement);
      }
    }
    
    function deletePostFromStorage(timestamp) {
      let posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts = posts.filter(post => post.timestamp !== timestamp);
      localStorage.setItem('posts', JSON.stringify(posts));
    }


  function savePostToStorage(post) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  function loadPostsFromStorage() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.reverse().forEach(post => addPostToFeed(post));
  }
});

 

document.addEventListener('DOMContentLoaded', function () {
  const textarea = document.getElementById('post-content');
  const modalContent = document.querySelector('.modal-content');

  textarea.addEventListener('input', function () {
    // Reset the textarea height
    textarea.style.height = 'auto';

    // Set the height to the scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`;

    // Expand the modal height
    modalContent.style.height = 'auto';
    modalContent.style.height = `${modalContent.scrollHeight}px`;
  });
});

  // Submit post when Enter is pressed without Shift
  textarea.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents adding a new line
      submitPost(); // Trigger the submit function
    }
  });

  // Handle post submission
  submitButton.addEventListener('click', function () {
    submitPost();
  });