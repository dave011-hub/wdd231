
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

  // populate timestamp hidden field (ISO format)
  const timestamp = document.getElementById('timestamp');
  if (timestamp) timestamp.value = new Date().toISOString();

  // make cards keyboard-activatable and wire up modals
  setupCardsAndModals();
});

/* Cards & modals */
function setupCardsAndModals() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    // keyboard activation
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

  // dialog close handlers and backdrop click / escape
  const dialogs = document.querySelectorAll('dialog.membership-modal');
  dialogs.forEach(dialog => {
    const closeBtn = dialog.querySelector('[data-close]');
    if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());

    dialog.addEventListener('cancel', (ev) => {
      ev.preventDefault();
      dialog.close();
    });

    dialog.addEventListener('click', (ev) => {
      if (ev.target === dialog) dialog.close();
    });
  });
}

function openTargetModal(id) {
  if (!id) return;
  const dlg = document.getElementById(id);
  if (dlg && typeof dlg.showModal === 'function') {
    dlg.showModal();
    const closeBtn = dlg.querySelector('[data-close]');
    if (closeBtn) closeBtn.focus();
  } else if (dlg) {
    dlg.classList.add('open');
  }
}
