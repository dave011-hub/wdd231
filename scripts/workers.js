

// scripts/workers.js
const dataUrl = 'data/workers.json';
const grid = document.getElementById('workers-grid');
const filterInput = document.getElementById('filter-trade');
const sortSelect = document.getElementById('sort-by');
const modalEl = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

let workers = [];











async function loadWorkers() {
    try {
        const res = await fetch(dataUrl);
        if (!res.ok) throw new Error('Network response not ok');
        const json = await res.json();
        workers = json.workers || [];
        renderWorkersFromQuery();
    } catch (err) {
        console.error(err);
        if (grid) grid.innerHTML = '<p class="error">Failed to load worker data. Please try again later.</p>';
    }
}

function workerCardTemplate(w) {
    return `
    <article class="card" data-id="${w.id}">
      <img src="${w.img}" alt="${w.name} photo" loading="lazy" />
      <div class="meta">
        <h3>${w.name} — ${w.trade}</h3>
        <p>${w.location} • ${w.experience} yrs</p>
        <p>Rating: ${w.rating} ⭐</p>
        <div class="card-actions">
          <button class="btn-primary" data-action="contact" data-id="${w.id}">Contact</button>
          <button class="btn-outline" data-action="details" data-id="${w.id}">Details</button>
        </div>
      </div>
    </article>
  `;
}

function renderWorkers(list) {
    if (!grid) return;
    if (list.length === 0) {
        grid.innerHTML = '<p>No workers match your search.</p>';
        return;
    }
    grid.innerHTML = list.map(workerCardTemplate).join('');
    attachCardListeners();
}

// attach click listeners for details/contact
function attachCardListeners() {
    grid.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('button');
            const id = card.getAttribute('data-id');
            if (actionBtn) {
                const action = actionBtn.getAttribute('data-action');
                if (action === 'details') openModalById(id);
                if (action === 'contact') contactWorkerById(id);
            } else {
                // click on card shows details
                openModalById(id);
            }
        });
    });
}

function openModalById(id) {
    const w = workers.find(x => String(x.id) === String(id));
    if (!w) return;
    modalBody.innerHTML = `
    <h2 id="modal-title">${w.name}</h2>
    <p><strong>Trade:</strong> ${w.trade}</p>
    <p><strong>Location:</strong> ${w.location}</p>
    <p><strong>Experience:</strong> ${w.experience} years</p>
    <p><strong>Rating:</strong> ${w.rating} ⭐</p>
    <p>${w.bio || ''}</p>
    <p><button id="save-worker" class="btn-outline">Save</button> <a class="btn-secondary" href="mailto:hire@fixit.example?subject=Hire%20${encodeURIComponent(w.name)}">Contact</a></p>
  `;
    modalEl.setAttribute('aria-hidden', 'false');
    modalEl.style.display = 'flex';
    modalClose.focus();

    // Save button uses localStorage
    document.getElementById('save-worker').addEventListener('click', () => {
        saveWorker(w);
    });
}

function closeModal() {
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.style.display = 'none';
    modalBody.innerHTML = '';
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalEl) modalEl.addEventListener('click', (e) => { if (e.target === modalEl) closeModal(); });

function saveWorker(worker) {
    const saved = JSON.parse(localStorage.getItem('fixit-saved') || '[]');
    if (!saved.find(s => s.id === worker.id)) {
        saved.push({ id: worker.id, name: worker.name, trade: worker.trade });
        localStorage.setItem('fixit-saved', JSON.stringify(saved));
        alert(`${worker.name} saved to your list.`);
    } else {
        alert('Worker already saved.');
    }
}

function contactWorkerById(id) {
    const w = workers.find(x => String(x.id) === String(id));
    if (!w) return;
    // For demo: open mailto
    window.location.href = `mailto:hire@fixit.example?subject=Hiring%20${encodeURIComponent(w.name)}`;
}

// Filtering + sort
function applyFilters() {
    const tradeQ = (filterInput?.value || '').toLowerCase();
    const urlParams = new URLSearchParams(location.search);
    // apply trade/location from query string if present
    const qTrade = urlParams.get('trade') || '';
    const qLocation = urlParams.get('location') || '';

    let list = workers.slice();

    if (tradeQ) list = list.filter(w => w.trade.toLowerCase().includes(tradeQ) || w.name.toLowerCase().includes(tradeQ));
    if (qTrade) list = list.filter(w => w.trade.toLowerCase().includes(qTrade.toLowerCase()));
    if (qLocation) list = list.filter(w => w.location.toLowerCase().includes(qLocation.toLowerCase()));

    const sortBy = sortSelect?.value || 'distance';
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'experience') list.sort((a, b) => b.experience - b.experience ? b.experience - a.experience : b.rating - a.rating);
    // default 'distance' — we will leave as is (assumes pre-sorted by proximity in data)

    renderWorkers(list);
}

filterInput?.addEventListener('input', () => applyFilters());
sortSelect?.addEventListener('change', () => applyFilters());

function renderWorkersFromQuery() {
    applyFilters();
    // Show saved count badge (optional)
    const saved = JSON.parse(localStorage.getItem('fixit-saved') || '[]');
    if (saved.length && document.querySelector('.saved-count')) {
        document.querySelectorAll('.saved-count').forEach(el => el.textContent = saved.length);
    }
}

loadWorkers();
