function toggleDropdown(element) {
    // Get the dropdown content related to the clicked dropdown toggle
    var dropdownContent = element.closest('.dropdown').querySelector('.dropdown-content');
    
    // Toggle the 'show' class to either open or close the dropdown content
    dropdownContent.classList.toggle("show");

    // Toggle the chevron rotation (optional, if using an icon)
    element.querySelector('.fa-chevron-down')?.classList.toggle('rotate');
}

document.addEventListener('DOMContentLoaded', function() {
    // Select all dropdown toggle buttons
    var dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Add click event listener to each dropdown toggle button
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();  // Prevent default behavior (if it's a link)

            var currentDropdown = this.closest('.dropdown'); // Get the closest dropdown wrapper
            var dropdownContent = currentDropdown.querySelector('.dropdown-content'); // Get the dropdown content
            
            // Close all other dropdowns except the clicked one
            dropdownToggles.forEach(function(otherToggle) {
                var otherDropdown = otherToggle.closest('.dropdown');
                
                if (otherDropdown !== currentDropdown) {
                    otherDropdown.querySelector('.dropdown-content').classList.remove('show'); // Close other dropdowns
                    otherDropdown.querySelector('.fa-chevron-down')?.classList.remove('rotate'); // Reset chevron rotation for other dropdowns
                }
            });

            // Now toggle the dropdown for the clicked one (open/close)
            dropdownContent.classList.toggle('show');
            this.querySelector('.fa-chevron-down')?.classList.toggle('rotate'); // Toggle chevron rotation
        });
    });
});
