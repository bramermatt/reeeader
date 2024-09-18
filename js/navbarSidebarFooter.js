  // Get modal elements
  var searchModal = document.getElementById('searchModal');
  var addModal = document.getElementById('addModal');
  var postModal = document.getElementById('post-modal');

  
  // Get the buttons that open the modals
  var searchIcon = document.getElementById('searchIcon');
  var addIcon = document.getElementById('addIcon');
  
  // Get the <span> elements that close the modals
  var closeSearch = document.getElementById('closeSearch');
  var closeAdd = document.getElementById('closeAdd');


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
                  <a href="#" id="searchIcon"><i class="fa fa-search search-icon"></i></a>
              </li>
          </ul>

          <ul id="add">
              <li>
                  <a href="#" id="addIcon"><i class="fa fa-plus"></i></a>
              </li>
          </ul>

          <ul  id="profile">
            <li>
                <a href="${basePath}pages/your-profile.html"><i class="fa-solid fa-user"></i></a>
            </li>
          </ul>


        <!-- <li class="dropdown" id="profile">
          <a href="javascript:void(0)" class="dropdown-toggle">
            
          </a>
          <div class="dropdown-content">
            <a href="${basePath}pages/your-books.html">Your Books</a>
            <a href="${basePath}pages/your-lists.html">Your Lists</a>
            <a href="${basePath}pages/your-stats.html">Your Stats</a>
            <a href="${basePath}pages/your-profile.html">Your Profile</a>
            <a href="${basePath}pages/sign-out.html">Sign Out</a>
          </div>
        </li> -->


        <a href="javascript:void(0)" onclick="toggleNav()"><i id="menuIcon" class="fa-solid fa-bars"></i></a>
      </ul>


    </nav>
  `;

  const sidebarHTML = `
    <div id="sideMenu">
      <ul>
        <li><a href="${basePath}index.html">Home</a></li>
        <li><a href="${basePath}pages/your-stats.html">Stats*</a></li>
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

  const modalsHTML = `
<!-- Search Modal -->
<div id="searchModal" class="modal">
    <div class="modal-content">
        <span class="close" id="closeSearch">&times;</span>
        <h2>Search Book</h2>
        <form>
          <input type="text" id="searchInput" placeholder="Search for a book..." required>

        </form>
          <div class="modal-footer">
          <button type="button" id="searchBtn">Search</button>
          </div>
    </div>
</div>

        <!-- Modal for writing a post -->
<div id="post-modal" class="modal">
            <div class="modal-content">
            <span class="close-btn">&times;</span>
            <textarea id="post-content" placeholder="What's on your mind?"></textarea>
            <button id="submit-post">Post</button>
        </div> 
    </div>

<!-- Add/Update Modal -->
<div id="addModal" class="modal">
    <div class="modal-content">
        <span class="close" id="closeAdd">&times;</span>
        <h2>Add/Update</h2>
            <form id="addBookForm">
              <!-- <label for="bookTitle">Post</label> -->
              <input type="text" id="bookTitle" name="bookTitle" placeholder="What's New?" required>
            </form>

            <div class="modal-footer">
              <button type="submit" id="addBtn">Post</button>
            </div>
    </div>
</div>`

  const footerHTML = `
  <footer>
      <div class="footer-links">
          <ul id="iconLinks">
          <li><a href="${basePath}pages/your-stats.html">Stats*</a></li>
          <li><a href="${basePath}pages/challenges.html">Challenges*</a></li>
          <li><a href="${basePath}pages/giveaways.html">Giveaways*</a></li>
          </ul>


          <ul id="menuProfile">
          <li><a href="${basePath}pages/your-profile.html">Your Profile</a></li>
          </ul>
      </div>
  
      <img src="${basePath}img/reeeader-footer-man.png" alt="">
  </footer>
  `;

  const topButtonHTML = `
          <span onclick="topFunction()" id="myBtn" title="Go to top"><i class="fa fa-arrow-up"></i></span>
        `

  document.body.insertAdjacentHTML('afterbegin', navbarHTML);
  document.body.insertAdjacentHTML('beforeend', sidebarHTML);
  document.body.insertAdjacentHTML('beforeend', modalsHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  document.body.insertAdjacentHTML('beforeend', topButtonHTML);

  // Now get the modal elements after inserting the HTML
  var searchModal = document.getElementById('searchModal');
  var addModal = document.getElementById('addModal');
  var postModal = document.getElementById('post-modal');


  // Get the buttons that open the modals
  var searchIcon = document.getElementById('searchIcon');
  var addIcon = document.getElementById('addIcon');

  // Get the <span> elements that close the modals
  var closeSearch = document.getElementById('closeSearch');
  var closeAdd = document.getElementById('closeAdd');

  // When the user clicks the search icon, open the search modal
  searchIcon.onclick = function(e) {
      e.preventDefault(); // Prevent default behavior
      searchModal.style.display = "block";
  }

  // When the user clicks the add icon, open the add modal
  addIcon.onclick = function(e) {
      e.preventDefault();
      addModal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modals
  closeSearch.onclick = function() {
      searchModal.style.display = "none";
  }

  closeAdd.onclick = function() {
      addModal.style.display = "none";
  }

  // Close modals if the user clicks anywhere outside of them
  window.onclick = function(event) {
      if (event.target == searchModal) {
          searchModal.style.display = "none";
      } else if (event.target == addModal) {
          addModal.style.display = "none";
          postModal.style.display = "none";
      }
  }



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


  //Get the button:
  mybutton = document.getElementById("myBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      myBtn.style.display = "block";
    } else {
      myBtn.style.display = "none";
    }
  }
  
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }