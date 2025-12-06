
// scripts/form.js
const joinForm = document.getElementById('join-form');
if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
        // Let form submit normally to form-action.html (GET). Also store the name in localStorage as example.
        const name = document.getElementById('wname').value;
        if (name) {
            localStorage.setItem('fixit-last-registrant', name);
        }
    });
}
