

// === Responsive Navigation Toggle ===
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

// === Footer Date Info ===
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent =
        "Last Modified: " + document.lastModified;
});

// === Fetch Members Data ===
async function loadMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
    const container = document.getElementById("members-container");
    container.innerHTML = "";
    members.forEach((member) => {
        const card = document.createElement("div");
        card.classList.add("member-card");
        card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
        container.appendChild(card);
    });
}

// === View Toggle ===
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");
const membersContainer = document.getElementById("members-container");

gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

loadMembers();
