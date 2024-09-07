document.addEventListener("DOMContentLoaded", function() {
  // Detect the current URL path and set basePath
  const currentPath = window.location.pathname;
  const basePath = currentPath.includes("/pages/") ? "../" : "";

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
            <a href="${basePath}pages/trending-books.html">Trending Books*</a>
            <a href="${basePath}pages/trending-authors.html">Trending Authors*</a>
            <a href="${basePath}pages/trending-series.html">Trending Series*</a>
            <a href="${basePath}pages/trending-genres.html">Trending Genres*</a>
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
        <li><a href="${basePath}pages/stats.html">Stats*</a></li>
        <li><a href="${basePath}pages/challenges.html">Challenges*</a></li>
        <li><a href="${basePath}pages/giveaways.html">Giveaways*</a></li>
        <li><a href="${basePath}pages/your-books.html">Your Books</a></li>
        <li><a href="${basePath}pages/your-lists.html">Your Lists</a></li>
        <li><a href="${basePath}pages/your-profile.html">Your Profile</a></li>

        <li><a href="${basePath}pages/trending-books.html">Trending Books*</a></li>
        <li><a href="${basePath}pages/trending-authors.html">Trending Authors*</a></li>
        <li><a href="${basePath}pages/trending-series.html">Trending Series*</a></li>
        <li><a href="${basePath}pages/trending-genres.html">Trending Genres*</a></li>
      </ul>
    </div>
  `;

  const footerHTML = `
  <footer>
      <div class="footer-links">
          <ul id="iconLinks">
          <li><a href="${basePath}pages/stats.html">Stats*</a></li>
          <li><a href="${basePath}pages/challenges.html">Challenges*</a></li>
          <li><a href="${basePath}pages/giveaways.html">Giveaways*</a></li>
          </ul>


          <ul id="menuProfile">
          <li><a href="${basePath}pages/your-books.html">Your Books</a></li>
          <li><a href="${basePath}pages/your-lists.html">Your Lists</a></li>
          <li><a href="${basePath}pages/your-profile.html">Your Profile</a></li>
          </ul>
      </div>
  
      <img src="${basePath}img/reeeader-footer-man.png" alt="">
  </footer>
  `;

  document.body.insertAdjacentHTML('afterbegin', navbarHTML);
  document.body.insertAdjacentHTML('beforeend', sidebarHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Add event listeners for dropdowns
  const dropdowns = document.querySelectorAll('.dropdown-toggle');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(event) {
      event.stopPropagation();  // Prevent event bubbling to document
      toggleDropdown(this);  // Open the clicked dropdown
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
      closeAllDropdowns();
  });
});

// Toggle individual dropdown
function toggleDropdown(element) {
  const dropdownContent = element.nextElementSibling;
  const chevron = element.querySelector('.fa-chevron-down');
  
  // Close all dropdowns before opening the clicked one
  closeAllDropdowns();
  
  // Toggle the clicked dropdown
  dropdownContent.classList.toggle("show");
  chevron?.classList.toggle("rotate");
}



// Close all dropdowns
function closeAllDropdowns() {
  const dropdownContents = document.querySelectorAll('.dropdown-content');
  const chevrons = document.querySelectorAll('.fa-chevron-down');
  
  dropdownContents.forEach(content => content.classList.remove('show'));
  chevrons.forEach(chevron => chevron.classList.remove('rotate'));
}

// Toggle Side Menu
function toggleNav() {
  const sideMenu = document.getElementById("sideMenu");
  const menuIcon = document.getElementById("menuIcon");
  const body = document.body;

  if (sideMenu.classList.contains("open")) {
      sideMenu.classList.remove("open");
      sideMenu.style.width = "0";
      menuIcon.className = "fa-solid fa-bars";
      body.classList.remove("menu-open");
  } else {
      sideMenu.classList.add("open");
      sideMenu.style.width = window.innerWidth <= 768 ? "100%" : "250px";
      menuIcon.className = "fa-solid fa-times";
      body.classList.add("menu-open");
  }
}



