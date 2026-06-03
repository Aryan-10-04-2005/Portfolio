// script.js - Interactive behaviors for the portfolio

// Welcome messages to cycle through
const welcomeMessages = [
  'Welcome to My Portfolio',
  'Thank You For Visiting My Portfolio',
  'Have a Great Day'
];
let welcomeIndex = 0;

// === Cache DOM elements using querySelector / getElementById ===
// We use querySelector to select by CSS selectors and getElementById for known IDs.
const welcomeText = document.getElementById('welcomeText'); // heading that shows welcome message
const welcomeBtn = document.getElementById('welcomeBtn'); // button to change welcome message
const themeToggle = document.getElementById('themeToggle'); // theme toggle button
const skillDesc = document.getElementById('skillDesc'); // area to show skill descriptions
const skillsGrid = document.getElementById('skillsGrid'); // container for skill buttons
const contactForm = document.getElementById('contactForm'); // the contact form element
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const charCount = document.getElementById('charCount');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const datetimeEl = document.getElementById('datetime');
const yearEl = document.getElementById('year');

// === Dynamic Welcome Message ===
// Change the welcome text each time the button is clicked.
welcomeBtn.addEventListener('click', () => {
  // increment index and wrap around
  welcomeIndex = (welcomeIndex + 1) % welcomeMessages.length;
  // update text content of the welcome heading
  welcomeText.textContent = welcomeMessages[welcomeIndex];
});

// === Dark Mode / Light Mode Toggle ===
// Load saved theme from localStorage (if any) and apply it
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Toggle when the button is clicked
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next); // persist preference
});

// === Interactive Skills Section ===
// Delegate click events on the skills grid to detect which skill was clicked
skillsGrid.addEventListener('click', (e) => {
  // find the closest element with .skill-card (in case inner elements are clicked)
  const card = e.target.closest('.skill-card');
  if (!card) return; // click was not on a skill card

  // read the description from data-desc attribute
  const desc = card.getAttribute('data-desc') || 'No description available.';

  // Update the description area
  skillDesc.textContent = desc;

  // Add a visual active state by toggling classes
  // remove active class from any other card first
  document.querySelectorAll('.skill-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
});

// === Contact Form Validation ===
// Simple helper validators
function isValidEmail(email) {
  // basic email regex for demonstration (not bulletproof)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  let valid = true;

  // Name validation: not empty
  if (!nameInput.value.trim()) {
    nameError.textContent = 'Please enter your name.';
    nameInput.classList.add('input-error');
    valid = false;
  } else {
    nameError.textContent = '';
    nameInput.classList.remove('input-error');
  }

  // Email validation
  if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email.';
    emailInput.classList.add('input-error');
    valid = false;
  } else {
    emailError.textContent = '';
    emailInput.classList.remove('input-error');
  }

  // Message validation: at least 10 characters
  if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
    messageError.textContent = 'Message must be at least 10 characters.';
    messageInput.classList.add('input-error');
    valid = false;
  } else {
    messageError.textContent = '';
    messageInput.classList.remove('input-error');
  }

  return valid;
}

// Prevent submission if validation fails
contactForm.addEventListener('submit', (e) => {
  e.preventDefault(); // always prevent default to demonstrate validation
  if (!validateForm()) return; // stop submission if invalid

  // If valid, you could send the form via fetch/AJAX here.
  alert('Form is valid! (Demo)');
  contactForm.reset();
  charCount.textContent = `0 / ${messageInput.maxLength}`;
});

// === Live Character Counter ===
// Update while typing in the message textarea
messageInput.addEventListener('input', () => {
  const used = messageInput.value.length;
  charCount.textContent = `${used} / ${messageInput.maxLength}`;
});

// === Scroll To Top Button ===
// Show button after scrolling down 300px
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

// Smooth scroll to top when clicked
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Dynamic Current Date and Time ===
function updateDateTime() {
  const now = new Date();
  // Format date/time simply
  const formatted = now.toLocaleString();
  datetimeEl.textContent = formatted;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Update footer year
if (yearEl) yearEl.textContent = new Date().getFullYear();

// === Accessibility / small polish ===
// Keyboard support: allow Enter/Space to trigger skill buttons (if focused)
document.querySelectorAll('.skill-card').forEach(card => {
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// Initial character count update (in case of prefilled text)
charCount.textContent = `${messageInput.value.length} / ${messageInput.maxLength}`;

// End of script.js
