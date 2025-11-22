
// Responsive nav toggle
const navToggle = document.getElementById('nav-toggle');
const primaryNav = document.getElementById('primary-nav');
if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        primaryNav.classList.toggle('open');
        navToggle.classList.toggle('open');
    });
}

// Set footer dates & hidden timestamp on load
document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('currentyear');
    const lastEl = document.getElementById('lastModified');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastEl) lastEl.textContent = 'Last Modified: ' + document.lastModified;

    // populate timestamp hidden field
    const timestamp = document.getElementById('timestamp');
    if (timestamp) timestamp.value = new Date().toISOString();

    // make cards keyboard-activatable and wire up modals
    setupCardsAndModals();
});

/* Cards & modals */
function setupCardsAndModals() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        // make cards focusable via keyboard (already tabindex in markup)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openTargetModal(card.dataset.target);
            }
        });

        const link = card.querySelector('.benefits-link');
        if (link) {
            link.addEventListener('click', (ev) => {
                ev.preventDefault();
                openTargetModal(link.dataset.target);
            });
        }
    });

    // add close handlers for modal close buttons and backdrop click & Escape key
    const dialogs = document.querySelectorAll('dialog.membership-modal');
    dialogs.forEach(dialog => {
        const closeBtn = dialog.querySelector('[data-close]');
        if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());

        dialog.addEventListener('cancel', (ev) => {
            ev.preventDefault();
            dialog.close();
        });

        // close when clicking outside content (click on backdrop)
        dialog.addEventListener('click', (ev) => {
            // if clicked directly on dialog (not its children)
            if (ev.target === dialog) dialog.close();
        });
    });
}

function openTargetModal(id) {
    if (!id) return;
    const dlg = document.getElementById(id);
    if (dlg && typeof dlg.showModal === 'function') {
        dlg.showModal();
        // move focus to close button for accessibility
        const closeBtn = dlg.querySelector('[data-close]');
        if (closeBtn) closeBtn.focus();
    } else if (dlg) {
        // fallback - toggle class if dialog not supported
        dlg.classList.add('open');
    }
}
