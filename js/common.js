// Load the header
fetch('./components/header.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('header').outerHTML = data;

    // Initialize Hamburger Menu after Header is Loaded
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
      // Toggle navLinks visibility
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });

      // Close navLinks when clicking outside
      document.addEventListener('click', (event) => {
        const isClickInside = navLinks.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInside) {
          navLinks.classList.remove('active');
        }
      });
    }
  })
  .catch(error => console.error('Error loading header:', error));

// Load the footer
fetch('./components/footer.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('footer').outerHTML = data;
  })
  .catch(error => console.error('Error loading footer:', error));
