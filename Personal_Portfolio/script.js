// --- Tab Functionality ---
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, event) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
} 

// --- Side Menu Functionality (for mobile) ---
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
} 

function closemenu() {
    sidemenu.style.right = "-200px"; 
} 

// --- Custom Smooth Scroll for Navigation Links ---
// This ensures a visible, timed scroll animation when clicking header links.
document.querySelectorAll('#sidemenu a').forEach(anchor => { 
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href'); 
        const targetElement = document.querySelector(targetId); // Get the actual section element

        if (targetElement) {
            const startPosition = window.pageYOffset; // Current scroll position
            // Adjust for fixed header/navbar if you have one.
            // If your header is fixed and covers content, subtract its height here.
            const headerOffset = 0; // Set this to your fixed header's height in pixels (e.g., 80)
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;

            const distance = targetPosition - startPosition;
            const duration = 800; // Duration of the scroll in milliseconds (0.8 seconds)
            let startTime = null;

            // Animation loop using requestAnimationFrame for smooth performance
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime; // Corrected operator
                // Calculate progress (0 to 1), ensuring it doesn't exceed 1
                const progress = Math.min(timeElapsed / duration, 1);

                // Easing function (easeOutCubic) for a more natural acceleration/deceleration
                const easeOutCubic = t => (--t) * t * t + 1;
                const easedProgress = easeOutCubic(progress);

                // Update the scroll position
                window.scrollTo(0, startPosition + distance * easedProgress);

                // Continue animation if duration not met
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            } // Closing brace for animation function
            requestAnimationFrame(animation); // Start the animation
        }

        // Close the sidemenu if it's open (for mobile view) after clicking a link
        if (window.innerWidth <= 768) { // Adjust breakpoint as per your CSS media query
            closemenu();
        }
    });
});

// --- Google Sheet Form Submission ---
const scriptURL = 'https://script.google.com/macros/s/AKfycbzKbfADFNwQcN4GGeCv8g-7L9HceD3FjpmF5Lz91uAz63PRzH2t2yL1myeVDdygp2pX/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message sent successfully"
        setTimeout(function(){
            msg.innerHTML = ""
        },5000) // Message disappears after 5 seconds
        form.reset() // Clear the form fields
    })
    .catch(error => console.error('Error!', error.message)) // Log any errors
});

// --- Scroll to Top Button Functionality ---
let mybutton = document.getElementById("scrollToTopBtn");

// Show/hide the button based on scroll position
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
        const portfolioTop = portfolioSection.offsetTop;
        // Show button when scrolled past the middle of the portfolio section
        if (window.pageYOffset > portfolioTop + (window.innerHeight / 2)) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
}

// Scroll to the top when the button is clicked
mybutton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Native smooth scroll for scroll-to-top
    });
});