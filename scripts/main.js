

// scripts/main.js
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

function toggleNav() {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if (navMenu) {
        if (!expanded) navMenu.style.display = 'block';
        else navMenu.style.display = '';
    }
}
if (navToggle) navToggle.addEventListener('click', toggleNav);

// set years in multiple pages
const yearEls = document.querySelectorAll('#year, #year2, #year3, #year4');
yearEls.forEach(el => el && (el.textContent = new Date().getFullYear()));

// last modified
const lastModEl = document.getElementById('lastModified');
if (lastModEl) lastModEl.textContent = `Last modified: ${document.lastModified}`;

// quick-search behavior: redirects to workers.html with query params
const quickSearch = document.getElementById('quick-search');
if (quickSearch) {
    quickSearch.addEventListener('submit', e => {
        e.preventDefault();
        const trade = document.getElementById('trade').value.trim();
        const location = document.getElementById('location').value.trim();
        const qs = new URLSearchParams();
        if (trade) qs.set('trade', trade);
        if (location) qs.set('location', location);
        window.location.href = `workers.html?${qs.toString()}`;
    });
}
