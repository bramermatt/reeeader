function toggleDropdown(element) {
    var dropdownContent = element.nextElementSibling;
    dropdownContent.classList.toggle("show");
    element.querySelector('.fa-chevron-down').classList.toggle('rotate');
}

function toggleNav() {
    var sideMenu = document.getElementById("sideMenu");
    var menuIcon = document.getElementById("menuIcon");
    var body = document.body;
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

document.addEventListener('DOMContentLoaded', function() {
    var dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            var currentDropdown = this.closest('.dropdown');
            
            // Close all other dropdowns
            dropdownToggles.forEach(function(otherToggle) {
                var otherDropdown = otherToggle.closest('.dropdown');
                if (otherDropdown !== currentDropdown) {
                    otherDropdown.querySelector('.dropdown-content').classList.remove('show');
                    otherDropdown.querySelector('.fa-chevron-down')?.classList.remove('rotate');
                }
            });
            
            toggleDropdown(this);
        });
    });
});

function toggleDropdown(element) {
    var dropdownContent = element.closest('.dropdown').querySelector('.dropdown-content');
    dropdownContent.classList.toggle("show");
    element.querySelector('.fa-chevron-down')?.classList.toggle('rotate');
}