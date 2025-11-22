

document.addEventListener('DOMContentLoaded', () => {
    // footer info
    const yearEl = document.getElementById('currentyear');
    const lastEl = document.getElementById('lastModified');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastEl) lastEl.textContent = 'Last Modified: ' + document.lastModified;

    // parse query string and display required fields
    const params = new URLSearchParams(window.location.search);
    const required = ['first', 'last', 'email', 'phone', 'organization', 'timestamp'];
    const container = document.getElementById('submission-summary');

    if (!container) return;

    const missing = required.filter(k => !params.has(k) || !params.get(k).trim());
    if (missing.length) {
        container.innerHTML = '<p class="error">No submission data found. If you used the form, ensure the form used method="get" and action="thankyou.html".</p>';
        return;
    }

    // build a presentable summary
    const first = params.get('first');
    const last = params.get('last');
    const email = params.get('email');
    const phone = params.get('phone');
    const org = params.get('organization');
    const time = params.get('timestamp');

    const description = params.get('description') || '—';
    const membership = params.get('membership') || '—';

    const html = `
    <dl>
      <dt>Applicant</dt><dd>${escapeHtml(first)} ${escapeHtml(last)}</dd>
      <dt>Email</dt><dd><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></dd>
      <dt>Mobile</dt><dd>${escapeHtml(phone)}</dd>
      <dt>Organization</dt><dd>${escapeHtml(org)}</dd>
      <dt>Membership Level</dt><dd>${escapeHtml(membership)}</dd>
      <dt>Description</dt><dd>${escapeHtml(description)}</dd>
      <dt>Submitted</dt><dd>${escapeHtml(formatTimestamp(time))}</dd>
    </dl>
  `;
    container.innerHTML = html;
});

// small helper to avoid XSS when echoing query text
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function formatTimestamp(iso) {
    if (!iso) return '';
    try {
        const d = new Date(iso);
        return d.toLocaleString();
    } catch (e) { return iso; }
}
