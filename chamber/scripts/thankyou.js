

/* thankyou.js
   Parses GET parameters and populates the thankyou.html output fields.
   Also inserts footer year and lastModified.
*/

document.addEventListener("DOMContentLoaded", () => {
    // footer date values (keeps parity with other pages)
    const yearEl = document.getElementById("currentyear");
    const lastModifiedEl = document.getElementById("lastModified");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastModifiedEl) lastModifiedEl.textContent = "Last Modified: " + document.lastModified;

    const params = new URLSearchParams(window.location.search);

    const mapping = [
        { key: "first", id: "out-first" },
        { key: "last", id: "out-last" },
        { key: "email", id: "out-email" },
        { key: "phone", id: "out-phone" },
        { key: "organization", id: "out-org" },
        { key: "timestamp", id: "out-ts" }
    ];

    mapping.forEach(m => {
        const value = params.get(m.key) || "—";
        const node = document.getElementById(m.id);
        if (!node) return;
        if (m.key === "timestamp" && value !== "—") {
            // try to format ISO timestamps nicely
            try {
                const d = new Date(value);
                node.textContent = d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
            } catch {
                node.textContent = value;
            }
        } else {
            // decode URI components (browser auto-encodes GET params)
            node.textContent = decodeURIComponent(value);
        }
    });
});
