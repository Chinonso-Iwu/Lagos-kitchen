document.addEventListener("DOMContentLoaded", function () {

    let currentIndex = 0; // Start with the first slide
    const slides = document.querySelectorAll('.slides'); // Get all slides
    const totalSlides = slides.length; // Number of slides

    // Show the current slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.style.display = 'none');
        // Show the current slide
        slides[index].style.display = 'block';
    }

    // Go to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // Loop back to the first slide
        showSlide(currentIndex);
    }

    // Go to the previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Loop back to the last slide
        showSlide(currentIndex);
    }

    // Event listeners for buttons
    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    // Initialize the slideshow
    showSlide(currentIndex);
    setInterval(nextSlide, 5000);






    function updateActiveNav() {
        const sections = document.querySelectorAll('.div6[data-section]');
        const navItems = document.querySelectorAll('.food-type div');
        let currentSectionId = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 30 && rect.bottom >= 30) {
                currentSectionId = section.getAttribute('data-section');
            }
        });

        navItems.forEach(item => {
            const itemId = item.textContent.trim().toLowerCase();
            if (currentSectionId === itemId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    document.querySelectorAll('.food-type div').forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.textContent.trim().toLowerCase();
            const heading = document.getElementById(sectionId);
            if (heading) {
                const offsetTop = heading.offsetTop - 60;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', updateActiveNav);
    document.addEventListener('DOMContentLoaded', updateActiveNav);
    






})

function toggleAccordion(buttonId) {
    var button = document.getElementById(buttonId);
    var icon = button.querySelector('i');
    var content = button.nextElementSibling;

    // Close all accordion panels except the one being opened
    var allButtons = document.querySelectorAll('.button2');
    allButtons.forEach(function (otherButton) {
        if (otherButton !== button) {
            otherButton.nextElementSibling.style.maxHeight = null;
            otherButton.querySelector('i').classList.remove('fa-minus');
            otherButton.querySelector('i').classList.add('fa-plus');
        }
    });

    // Toggle the Font Awesome icon
    if (icon.classList.contains('fa-plus')) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
    } else {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
    }

    // Toggle the opening and closing of the content section
    if (content.style.maxHeight) {
        content.style.maxHeight = null; // Close the content
    } else {
        content.style.maxHeight = content.scrollHeight + 'px'; // Open the content
    }
};

document.addEventListener('DOMContentLoaded', function () {
    var currentYear = new Date().getFullYear();

    // Set the copyright text with the current year
    var copyrightElements = document.getElementById('copyright');

    // Loop through each element and set the text content
    copyrightElements.textContent = "@ " + currentYear + " Lagos kitchen's All Rights Reserved ";

});