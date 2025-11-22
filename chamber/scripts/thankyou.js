

document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('currentyear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const params = new URLSearchParams(window.location.search);
    const required = ['first', 'last', 'email', 'phone', 'organization', 'timestamp'];
    const container = document.getElementById('submission-summary');
    if (!container) return;

    const missing = required.filter(k => !params.has(k) || !params.get(k).trim());
    if (missing.length) {
        container.innerHTML = '<p class="error">Submission data not found. Ensure form used method="get" and action="thankyou.html".</p>';
        return;
    }

    const first = params.get('first');
    const last = params.get('last');
    const email = params.get('email');
    const phone = params.get('phone');
    const org = params.get('organization');
    const time = params.get('timestamp');
    const membership = params.get('membership') || '—';
    const description = params.get('description') || '—';

    container.innerHTML = `
    <dl>
      <dt>Applicant</dt><dd>${escapeHtml(first)} ${escapeHtml(last)}</dd>
      <dt>Email</dt><dd><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></dd>
      <dt>Mobile</dt><dd>${escapeHtml(phone)}</dd>
      <dt>Organization</dt><dd>${escapeHtml(org)}</dd>
      <dt>Membership</dt><dd>${escapeHtml(membership)}</dd>
      <dt>Description</dt><dd>${escapeHtml(description)}</dd>
      <dt>Submitted</dt><dd>${escapeHtml(formatTimestamp(time))}</dd>
    </dl>
  `;
});

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function formatTimestamp(iso) {
    if (!iso) return '';
    try { return new Date(iso).toLocaleString(); } catch (e) { return iso; }
}
