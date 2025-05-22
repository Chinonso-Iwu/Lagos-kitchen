window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const req = document.getElementById('request-name');
        req.style.display = 'flex'; // show it first so opacity can animate
        requestAnimationFrame(() => {
            req.classList.add('show');
            document.body.classList.add('noscroll')
        });
    }, 2000); // 3000 ms = 3 seconds delay
});

const imgs = document.querySelectorAll("img");

imgs.forEach((imgss, index) => {
    imgss.setAttribute("loading", "lazy")
})

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
                const offsetTop = heading.offsetTop - 40;
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

    function adjustDivHeight() {
        const targetDiv = document.getElementById("food-container");
        const viewportHeight = window.innerHeight;
        const viewportwidth = window.innerWidth;

        // Try to use 480px if it fits
        if (viewportwidth > 700){
            if (viewportHeight >= 500) {
                targetDiv.style.height = "480px";
            } else {
                targetDiv.style.height = "85%";
            }
        }

    }

    // Run on page load and on window resize
    window.addEventListener("load", adjustDivHeight);
    window.addEventListener("resize", adjustDivHeight);

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

            displaythefood(data, imgSrc, title, priceValue);
        })

    
    })

    const foodData = {
        1: { description: "Jollof Rice & Grilled Chicken is a classic West African dish, especially popular in Nigeria. The rice is cooked in a rich tomato-based sauce seasoned with peppers, onions, and spices, giving it its iconic red color and deep flavor. It’s typically served with well-marinated, juicy grilled chicken for a complete, satisfying meal.", Ingredients: ["Long Grain Rice", "Tomato Paste", "Fresh Tomatoes", "Red Bell Peppers", "Onions", "Garlic", "Ginger", "Vegetable Oil", "Chicken Broth", "Seasoning Cubes", "Thyme", "Bay Leaf", "Salt", "Grilled Chicken", "Marinade (Pepper, Onion, Spices)"] },
        2: { description: "Juicy chicken pieces marinated in olive oil, garlic, and rosemary, then grilled to perfection. It's a simple yet flavorful dish perfect for any occasion.", Ingredients: ["Chicken thighs or breasts"," olive oil", "fresh rosemary", "garlic", "lemon juice", "black pepper", "salt", "paprika", "onion powder"] },
        3: { description: "A classic fast-food combo featuring a juicy beef patty in a soft bun with toppings like lettuce, tomato, and cheese, served with crispy golden fries on the side.", Ingredients: ["Ground beef", "burger buns", "lettuce", "tomato", "cheese slices"," pickles", "onions", "ketchup", "mustard", "mayonnaise", "potatoes", 'vegetable oil', 'salt'] },
        4: { description: "A beloved street food in Nigeria, Shawarma is made by wrapping spiced grilled chicken or beef, creamy sauce, and crunchy veggies in warm flatbread. It’s a tasty, quick meal often sold by roadside vendors and eateries.", Ingredients: ["Chicken Breast or Beef Strips", "Tortilla Wraps or Flatbread", "Cabbage", "Carrots", "Cucumber", "Onions", "Garlic", "Ginger", "Mayonnaise", "Ketchup", "Hot Sauce", "Paprika", "Thyme", "Curry Powder", "Vegetable Oil", "Salt", "Black Pepper", "Bouillon Cubes"] },
        5: { description: "A festive favorite in Nigeria, this colorful Fried Rice is made with mixed vegetables and seasoned to perfection. It’s typically served with juicy fried or grilled chicken and sweet, golden-brown fried plantains—perfect for parties and Sunday specials.", Ingredients: ["Parboiled Rice", "Carrots", "Green Peas", "Green Beans", "Sweet Corn", "Red Bell Peppers", "Spring Onions", "Onions", "Garlic", "Ginger", "Vegetable Oil", "Chicken Stock", "Curry Powder", "Thyme", "Bouillon Cubes", "Salt", "Fried Chicken", "Ripe Plantains", "Black Pepper"] },
        6: { description: "A quick and satisfying meal, this Bowl of Noodles is cooked with a spicy, savory broth and tossed with mixed vegetables and seasonings. It's a go-to comfort food in many Nigerian homes—simple, delicious, and customizable.", Ingredients: ["Instant Noodles", "Carrots", "Green Peppers", "Onions", "Cabbage", "Scotch Bonnet (Ata Rodo)", "Vegetable Oil", "Seasoning Powder", "Salt", "Boiled Egg", "Spring Onions", "Soy Sauce (optional)"] },
        7: { description: "A flavorful Mexican-inspired wrap, Chicken Burritos are made with soft tortillas filled with seasoned chicken, rice, beans, cheese, and fresh vegetables. Perfectly rolled and often grilled for a crispy outside, it's a full meal in one bite!", Ingredients: ["Flour Tortillas", "Grilled Chicken", "Cooked Rice", "Black Beans", "Cheddar Cheese", "Lettuce", "Tomatoes", "Sour Cream", "Guacamole", "Onions", "Bell Peppers", "Olive Oil", "Salt", "Pepper", "Taco Seasoning"] },
        8: { description: "A delicious and healthy option, this sandwich features layers of fresh vegetables and melted cheese between slices of golden, crispy grilled bread. Perfect for a quick snack or light meal, it's packed with flavor and texture.", Ingredients: ["Bread Slices", "Cheddar Cheese", "Tomatoes", "Cucumbers", "Lettuce", "Onions", "Bell Peppers", "Butter", "Mayonnaise", "Black Pepper", "Salt", "Olive Oil"] },
        9: { description: "A popular West African snack made from deep-fried dough. Puff-puff is soft, slightly sweet, and golden brown—perfect as a treat or party finger food.", Ingredients: ["All-Purpose Flour", "Sugar", "Yeast", "Nutmeg", "Salt", "Water", "Vegetable Oil"] },
        10: { description: "A savory pastry filled with seasoned minced meat, potatoes, and sometimes vegetables. Meat pie is a favorite snack in Nigeria, often enjoyed as a quick meal or street food.", Ingredients: ["All-Purpose Flour", "Butter", "Salt", "Water", "Ground Beef", "Potatoes", "Onions", "Carrots", "Seasoning Cubes", "Black Pepper", "Vegetable Oil"] },
        11: { description: "A popular Nigerian party platter featuring a variety of bite-sized fried snacks such as samosas, spring rolls, puff-puff, meat pies, and more. Perfect for gatherings and celebrations", Ingredients: ["Samosa", "Spring Rolls", "Puff-Puff", "Meat Pies", "Chicken Wings", "Shawarma", "Vegetable Oil", "Flour", "Spices", "Seasoning Cubes", "Salt"] },
        12: { description: "A classic Nigerian street food consisting of spicy grilled meat skewers, typically made from beef, seasoned with a special peanut and chili spice blend. Perfect as a flavorful snack or meal.", Ingredients: ["Beef", "Suya Spice Mix", "Peanut Powder", "Chili Powder", "Salt", "Vegetable Oil", "Onions", "Tomatoes", "Cabbage"] },
        13: { description: "A popular Nigerian snack of deep-fried pastry pockets filled with spiced minced meat or vegetables. Crispy on the outside and flavorful on the inside, often enjoyed at parties and street food stalls.", Ingredients: ["All-Purpose Flour", "Water", "Salt", "Vegetable Oil", "Ground Beef or Chicken", "Onions", "Garlic", "Ginger", "Carrots", "Green Peas", "Curry Powder", "Chili Powder", "Thyme", "Cumin", "Black Pepper"] },
        14: { description: "A crunchy, sweet fried dough snack popular in Nigeria, often enjoyed during parties and festive occasions. It comes in small bite-sized pieces, perfect for snacking", Ingredients: ["All-Purpose Flour", "Sugar", "Butter", "Eggs", "Baking Powder", "Nutmeg", "Milk", "Salt", "Vegetable Oil"] },
        15: { description: "A popular Nigerian snack made of thin pastry sheets filled with a savory mix of vegetables and sometimes meat, then deep-fried until crispy and golden brown.", Ingredients: ["Spring Roll Pastry Sheets", "Cabbage", "Carrots", "Onions", "Green Peppers", "Garlic", "Ginger", "Chicken (optional)", "Soy Sauce", "Salt", "Pepper", "Vegetable Oil"] },
        16: { description: "A traditional Nigerian steamed bean pudding made from peeled black-eyed peas blended with spices, onions, and peppers, wrapped in leaves or steamed in containers.", Ingredients: ["Black-eyed Peas", "Onions", "Red Bell Peppers", "Scotch Bonnet Peppers", "Vegetable Oil", "Seasoning Cubes", "Salt", "Water", "Leaf Wrappers (or aluminum foil)"] },
        17: { description: "A refreshing Nigerian drink made from dried hibiscus petals, known for its tart and fruity flavor, often served chilled.", Ingredients: ["Dried Hibiscus Petals", "Ginger", "Cloves", "Pineapple Juice", "Sugar", "Water"], },
        22: { description: "A popular Nigerian cocktail made with a mix of soft drinks, fruit juice, and a splash of bitters, served chilled with ice and slices of citrus.", Ingredients: ["Angostura Bitters", "Fanta", "Sprite", "Grenadine Syrup", "Lemon Juice", "Cucumber Slices", "Orange Slices", "Ice Cubes"] },
        24: { description: "Malta Guinness is a non-alcoholic malt beverage popular in Nigeria and other parts of Africa. It has a rich, smooth taste with a slightly sweet, malty flavor and is known for its energy-boosting properties. Often enjoyed chilled, it's a favorite for both refreshment and nutritional value.", Ingredients: ["Carbonated Water", "Malted Barley", "Sucrose", "Glucose Syrup", "Colour (Caramel E150C)", "Hops", "Vitamins (B1, B2, B3, B5, B6)"] },
        
        
    };

    function displaythefood(data, imgSrc, title, priceValue){
        const fooddisplayer = document.getElementById("food-displayer");
        const foodtitle = document.getElementById("food-title");
        const description = document.getElementById("description");
        const priceTag = document.getElementById("price-tag");
        const img = fooddisplayer.querySelector("img");
        const Ingredientslist = document.getElementById("Ingredients-list");

        // Update content
        img.setAttribute("src", imgSrc);
        foodtitle.textContent = title;
        description.textContent = foodData[data]?.description || "No description available.";
        priceTag.textContent = "$" + priceValue;

        // Clear previous ingredients
        Ingredientslist.innerHTML = "";

        // Append new ingredients
        if (foodData[data]?.Ingredients.length > 0) {
            foodData[data].Ingredients.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                Ingredientslist.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = "No ingredient information available.";
            Ingredientslist.appendChild(li);
        }

        // Show food displayer and lock background scroll
        fooddisplayer.style.display = "flex";

    }

})

let errorTimeoutId = null; // global or outer variable

function closeRequestTab() {
    var userName = document.getElementById("username");
    var requestname = document.getElementById("request-name");
    var value = userName.value.trim();

    if (value === "") {
        // Cancel previous timeout if it's still pending
        if (errorTimeoutId !== null) {
            clearTimeout(errorTimeoutId);
        }

        userName.classList.remove("error", "shake");
        userName.classList.add("error", "shake");
        userName.placeholder = "Your name is needed to know you";

        // Set new timeout and store its ID
        errorTimeoutId = setTimeout(() => {
            userName.placeholder = "What is your name?";
            userName.classList.remove("error", "shake");
            errorTimeoutId = null; // clear the reference
        }, 2000);
    } else {
        requestname.style.display = "none";
        document.body.classList.remove('noscroll');
        updateName();
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

window.addEventListener("resize", () => {
    const currentName = document.getElementById("usernamePlace").textContent;
    if (currentName !== "User") {
        updateName()
    }
});

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