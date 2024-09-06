document.addEventListener("DOMContentLoaded", function() {
    // Detect the current URL path
    const currentPath = window.location.pathname;
  
    // Determine the base path (root or /pages)
    let basePath = "";
    if (currentPath.includes("/pages/")) {
      basePath = "../";  // We are in the /pages folder, so need "../" for root
    }
  
    const navbarHTML = `
      <nav>
        <ul id="iconLinks">
          <a href="${basePath}index.html"><i class="fa-solid fa-book-open-reader"></i></a>
          <h1>Reeeader</h1>
          <li><a href="${basePath}index.html">Home</a></li>
          <li class="dropdown">
            <a href="javascript:void(0)" class="dropdown-toggle">
              <span>Trending</span>
              <i class="fas fa-chevron-down"></i>
            </a>
            <div class="dropdown-content">
              <a href="${basePath}pages/trending-books.html">Books*</a>
              <a href="${basePath}pages/trending-authors.html">Authors*</a>
              <a href="${basePath}pages/trending-series.html">Series*</a>
              <a href="${basePath}pages/trending-genres.html">Genres*</a>
            </div>
          </li>
          <li class="dropdown">
            <a href="javascript:void(0)" class="dropdown-toggle">
              <span>Challenges</span>
              <i class="fas fa-chevron-down"></i>
            </a>
            <div class="dropdown-content">
              <a href="${basePath}pages/challenges.html">Coming Soon*</a>
            </div>
          </li>
          <li class="dropdown">
            <a href="javascript:void(0)" class="dropdown-toggle">
              <span>Giveaways</span>
              <i class="fas fa-chevron-down"></i>
            </a>
            <div class="dropdown-content">
              <a href="${basePath}pages/giveaways.html">Coming Soon*</a>
            </div>
          </li>
        </ul>
        <ul id="menuProfile">
          <ul id="search">
            <li>
              <input type="search" id="searchInput" placeholder="Search.." class="search-box hidden">
              <li>
                <i class="fa fa-search search-icon" id="searchIcon"></i>
              </li>
            </li>
          </ul>
          <li class="dropdown" id="profile">
            <a href="javascript:void(0)" class="dropdown-toggle">
              <i class="fa-solid fa-user"></i>
            </a>
            <div class="dropdown-content">
              <a href="${basePath}pages/your-books.html">Your Books</a>
              <a href="${basePath}pages/your-lists.html">Your Lists</a>
              <a href="${basePath}pages/your-stats.html">Your Stats</a>
              <a href="${basePath}pages/your-profile.html">Your Profile</a>
              <a href="${basePath}pages/sign-out.html">Sign Out</a>
            </div>
          </li>
          <a href="javascript:void(0)" onclick="toggleNav()"><i id="menuIcon" class="fa-solid fa-bars"></i></a>
        </ul>
      </nav>
    `;
  
    const sidebarHTML = `
      <div id="sideMenu">
        <ul>
          <li><a href="${basePath}index.html">Home</a></li>
          <li><a href="${basePath}pages/stats.html">Stats</a></li>
          <li><a href="${basePath}pages/challenges.html">Challenges</a></li>
          <li><a href="${basePath}pages/giveaways.html">Giveaways</a></li>
          <li><a href="${basePath}pages/your-books.html">Your Books</a></li>
          <li><a href="${basePath}pages/your-lists.html">Your Lists</a></li>
          <li><a href="${basePath}pages/your-profile.html">Your Profile</a></li>
        </ul>
      </div>
    `;

    const footerHTML = `
    <footer>
        <div class="footer-links">
            <ul id="iconLinks">
                <li><a href="">Stats</a></li>
                <li><a href="">Challenges</a></li>
                <li><a href="">Giveaways</a></li>
            </ul>

            <ul id="menuProfile">
                <li><a href="">Your Books</a></li>
                <li><a href="">Your Lists</a></li>
                <li><a href="">Your Profile</a></li>
                
            </ul>
        </div>
    
        <img src="${basePath}/reeeader-footer-man.png" alt="">
    </footer>
    `
  
    // Insert navbar and sidebar into the document
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.insertAdjacentHTML('beforeend', sidebarHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  
    // Add event listeners for dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', function() {
        const dropdownContent = this.nextElementSibling;
        dropdownContent.classList.toggle('show'); // Toggle the dropdown menu
      });
    });
  });

  function getUserID() {
    // Example: Pull from session storage, cookies, or make an API call
    return sessionStorage.getItem('userID') || 'guest';  // Fallback to 'guest'
}

  