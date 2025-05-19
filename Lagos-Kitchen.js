//window.onload = function () {
//    document.body.classList.add('noscroll'); // Disable scroll when overlay is showing
//};

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
    



    const searchInput = document.querySelector('.search1');
    const selectInput = document.querySelector('.select1');
    const resultsBox = document.getElementById('searchResults');



    // Perform search based on input and selected type
    function performSearch() {
        const searchValue = searchInput.value.trim().toLowerCase();
        const selectedType = selectInput.value.trim().toLowerCase();
        const keywords = searchValue.split(/\s+/);

        if (searchValue !== "") {
            let results = [];

            const allSections = document.querySelectorAll('.div6');

            allSections.forEach(section => {
                const sectionType = section.getAttribute('data-section').toLowerCase();

                if (selectedType === 'all' || sectionType === selectedType) {
                    const items = section.querySelectorAll('.div7');

                    items.forEach(item => {
                        const title = item.querySelector('h3').textContent.toLowerCase();

                        const isMatch = keywords.every(word => title.includes(word));

                        if (isMatch) {
                            results.push(title);
                        }
                    });
                }
            });

            displayResults(results);
        } else {
            resultsBox.style.display = "none";
        }
    }

    // Display results
    function displayResults(results) {
        resultsBox.style.display = "block";
        resultsBox.innerHTML = '';

        if (results.length === 0) {
            resultsBox.innerHTML = '<p>No results found</p>';
            resultsBox.style.color = 'red';
            return;
        }

        results.forEach(title => {
            const p = document.createElement('p');
            p.textContent = title;
            resultsBox.style.color = 'black';
            resultsBox.style.cursor = "pointer";

            resultsBox.appendChild(p);
        });
    }

    // Event listeners
    searchInput.addEventListener('input', performSearch);
    selectInput.addEventListener('change', performSearch);


    const scrollableDiv = document.getElementById("scrollable");
    const title = document.getElementById("food-title");

    scrollableDiv.addEventListener("scroll", function () {
        if (scrollableDiv.scrollTop > 0.5) {
            title.classList.add("shadowed");
        } else {
            title.classList.remove("shadowed");
        }
    });

    const foodItems = document.querySelectorAll(".div7");

    foodItems.forEach((food, index) => {
        food.setAttribute("data-food-id", index + 1)
    })

    foodItems.forEach(Items  => {
        Items.addEventListener("click", function(){
            const data = this.getAttribute("data-food-id");
            const imgSrc = this.querySelector("img").getAttribute("src");
            const title = this.querySelector("h3").textContent.trim();
            const priceText = this.querySelector("p").textContent.trim();
            const priceValue = priceText.replace("Price: $", ""); // or use split("$")[1]

            console.log("data:", data);
            console.log("Image:", imgSrc);
            console.log("Title:", title);
            console.log("Price:", priceValue);
        })

    
    })

    const foodData = {
        1: {
            description: "A popular West African dish made with rice simmered in a rich tomato-based sauce, often served with spicy, juicy grilled chicken.It's a party favorite across Nigeria and beyond.", Ingredients: ["Long grain parboiled rice",] },
    
    };


})

function closeRequestTab() {
    var userName = document.getElementById("username");
    var requestname = document.getElementById("request-name");
    var value = userName.value.trim();
    if (value === "") {
        userName.classList.remove("error");
        userName.classList.remove("shake")
        userName.classList.add("error")
        userName.placeholder = "Your name is needed to know you"
        userName.classList.add("shake")
        setTimeout(() => {
            userName.placeholder = "What is your name?";
            userName.classList.remove("error");
            userName.classList.remove("shake")
        }, 2000);
    } else {
        requestname.style.display = "none";
        document.body.classList.remove('noscroll');
        updateName()
    }
}

function updateName() {
    var userName = document.getElementById("username").value;
    var tooltipname = document.getElementById("tooltip-name");
    var usernamePlace = document.getElementById("usernamePlace");
    var div3 = document.getElementById("div3");

    if (userName.length > 8) {
        usernamePlace.textContent = userName;
        tooltipname.textContent = userName;

        if (window.innerWidth <= 1023) {
            enableMobileTooltip();
            tooltipname.classList.add("tooltip-name")
        } else {
            disableMobileTooltip();
            tooltipname.classList.add("tooltip-name")
            div3.classList.add("namediplay")
        }
    } else {
        usernamePlace.textContent = userName;
        tooltipname.classList.remove("tooltip-name");
        tooltipname.style.display = "none"; // hide tooltip if not needed
        disableMobileTooltip();
    }
}

function enableMobileTooltip() {
    var div3 = document.getElementById("div3");
    var tooltipname = document.getElementById("tooltip-name");

    // Remove any previous click to avoid stacking
    div3.onclick = function () {
        if (tooltipname.style.display = "none") {
            tooltipname.style.display = "block";
        }
    };

    // Listen for click outside
    document.addEventListener("click", closeTooltipOutside);
}

function disableMobileTooltip() {
    var usernamePlace = document.getElementById("usernamePlace");

    usernamePlace.onclick = null;
    document.removeEventListener("click", closeTooltipOutside);
}

function closeTooltipOutside(event) {
    var usernamePlace = document.getElementById("usernamePlace");
    var tooltipname = document.getElementById("tooltip-name");

    if (!usernamePlace.contains(event.target) && !tooltipname.contains(event.target)) {
        tooltipname.style.display = "none";
    }
}

function closeTab(event){
    var requestname = document.getElementById("request-name");
    if (event.target === requestname) {
        requestname.style.display = "none"
    }
    
}

function closeTab2(event){
    var foodDisplayer = document.getElementById("food-displayer");
    if (event.target === foodDisplayer) {
        foodDisplayer.style.display = "none";
    }
    
}




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