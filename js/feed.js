document.addEventListener('DOMContentLoaded', function() {
    // Create the feed container dynamically
    const feed = document.createElement('div');
    feed.id = 'feed';
    document.body.appendChild(feed);
    
    // Load existing posts from localStorage
    loadPostsFromStorage();
    
    // Show the post modal
    const plusButton = document.getElementById('plus-btn');
    const postModal = document.getElementById('post-modal');
    
    plusButton.addEventListener('click', function() {
      postModal.style.display = 'block';
    });
    
    // Handle post submission
    const submitButton = document.getElementById('submit-post');
    submitButton.addEventListener('click', function() {
      const postContent = document.getElementById('post-content').value;
      
      // Create post object with username, ISO timestamp, and content
      const post = {
        username: 'tempuser',
        content: postContent,
        timestamp: new Date().toISOString() // Store ISO string for accurate time calculations
      };
  
      // Add post to the feed and localStorage
      addPostToFeed(post, true); // Prepend new post
      savePostToStorage(post);
    
      // Hide the modal and clear the textarea
      postModal.style.display = 'none';
      document.getElementById('post-content').value = '';
    });
  
    // Function to calculate "time ago"
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
    
    // Function to add a post to the feed
    function addPostToFeed(post, isNew = false) {
      const postElement = document.createElement('div');
      postElement.className = 'post';
  
      // Use timeAgo to calculate relative time from the timestamp
      const relativeTime = timeAgo(post.timestamp);
  
      // Example profile image from UI Avatars or you can use any static image
      const profileImageURL = `https://ui-avatars.com/api/?name=${post.username}&background=random`;
  
      postElement.innerHTML = `
       <img src="${profileImageURL}" alt="Profile Image"/>
        <div id="profilePost">
            <div id="postUser">
              <h2>${post.username}</h2> <h3>${relativeTime}</h3>
            </div>
        <p>${post.content}</p>
        </div>
      `;
  
      // If the post is new, prepend it to the top of the feed, otherwise append it
      if (isNew) {
        feed.prepend(postElement);
      } else {
        feed.appendChild(postElement);
      }
    }
  
    // Save post to localStorage
    function savePostToStorage(post) {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.push(post);
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  
    // Load posts from localStorage and display them
    function loadPostsFromStorage() {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      // Reverse posts array to show newest first
      posts.reverse().forEach(post => addPostToFeed(post));
    }
  });
  