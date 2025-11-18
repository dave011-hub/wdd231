

/* join.js
   Handles:
   - nav toggle for small screens (keeps behavior identical to your prior scripts)
   - timestamp hidden field fill
   - membership cards animation & accessible keyboard activation
   - opening/closing the membership <dialog> modals
*/

(function () {
    // Nav toggle (if present)
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
            navToggle.classList.toggle("open");
        });
    }

    // Helper to open modal by id
    function openModalById(id) {
        const dialog = document.getElementById(id);
        if (!dialog) return;
        try {
            if (typeof dialog.showModal === "function") {
                dialog.showModal();
                const close = dialog.querySelector("[data-close]");
                if (close) close.focus();
            } else {
                dialog.setAttribute("open", "");
            }
        } catch (err) {
            console.error("Modal open error:", err);
        }
    }

    // On DOM ready
    document.addEventListener("DOMContentLoaded", () => {
        // set timestamp
        const ts = document.getElementById("timestamp");
        if (ts) ts.value = new Date().toISOString();

        // animate membership cards in sequence (mobile-first)
        const cards = Array.from(document.querySelectorAll("#membership-cards .card"));
        cards.forEach((card, i) => {
            setTimeout(() => card.classList.add("visible"), 120 * i);
            // keyboard support: Enter / Space opens associated modal
            card.addEventListener("keydown", (ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                    const targetId = card.dataset.target;
                    openModalById(targetId);
                    ev.preventDefault();
                }
            });
        });

        // wire up all benefits links/buttons
        document.querySelectorAll(".benefits-link, #membership-cards .card").forEach(el => {
            el.addEventListener("click", (e) => {
                // find data-target from card or link
                let target;
                const cardEl = e.currentTarget.closest(".card");
                if (cardEl && cardEl.dataset && cardEl.dataset.target) {
                    target = cardEl.dataset.target;
                } else if (e.currentTarget.dataset && e.currentTarget.dataset.target) {
                    target = e.currentTarget.dataset.target;
                } else if (e.target && e.target.closest(".benefits-link")) {
                    target = e.target.closest(".benefits-link").dataset.target;
                }

                if (target) {
                    e.preventDefault();
                    openModalById(target);
                }
            });
        });

        // wire up close and backdrop click for each dialog
        document.querySelectorAll(".membership-modal").forEach(dialog => {
            // close buttons
            dialog.querySelectorAll("[data-close]").forEach(btn => {
                btn.addEventListener("click", () => dialog.close());
            });

            // clicking backdrop to close
            dialog.addEventListener("click", (ev) => {
                if (ev.target === dialog) dialog.close();
            });
        });
    });
})();
