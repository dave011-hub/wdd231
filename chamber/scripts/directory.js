

// ===== Directory.js =====

// === Footer Dates ===
document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("currentyear");
    const lastModifiedEl = document.getElementById("lastModified");

    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;

    loadMembers(); // load member data after DOM is ready
});

// === Fetch and Display Members ===
async function loadMembers() {
    const container = document.getElementById("members-container");
    if (!container) return;

    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Failed to load member data");

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
        container.innerHTML =
            "<p class='error'>Unable to load member data. Please try again later.</p>";
    }
}

// === Display Members with Extra Details ===
function displayMembers(members) {
    const container = document.getElementById("members-container");
    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        // Membership level label
        let levelLabel = "";
        if (member.membershipLevel === 3) levelLabel = "🌟 Gold Member";
        else if (member.membershipLevel === 2) levelLabel = "⭐ Silver Member";
        else levelLabel = "Member";

        // Determine image source: local or external
        let imgSrc = member.image;
        if (!member.image.startsWith("http")) {
            imgSrc = `images/${member.image}`;
        }

        // Services list
        const servicesHTML = member.services
            ? `<ul class="services">${member.services.map(s => `<li>${s}</li>`).join("")}</ul>`
            : "";

        // Create card
        card.innerHTML = `
            <img src="${imgSrc}" alt="${member.name} Logo" loading="lazy">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="membership">${levelLabel}</p>
                <p class="description">${member.description || ""}</p>
                <p class="address"><strong>Address:</strong> ${member.address}</p>
                <p class="phone"><strong>Phone:</strong> ${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="website-btn">Visit Website</a>
                ${servicesHTML}
            </div>
        `;

        container.appendChild(card);
    });
}

// === Grid/List View Toggle ===
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");
const container = document.getElementById("members-container");

if (gridBtn && listBtn && container) {
    gridBtn.addEventListener("click", () => {
        container.classList.add("grid-view");
        container.classList.remove("list-view");
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
        container.classList.add("list-view");
        container.classList.remove("grid-view");
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });
}
