

// === Responsive Navigation Toggle ===
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });
}

// === Footer Date Info ===
document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("currentyear");
    const lastModifiedEl = document.getElementById("lastModified");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastModifiedEl)
        lastModifiedEl.textContent = "Last Modified: " + document.lastModified;

    // Load members for directory or spotlight if container exists
    if (document.getElementById("members-container")) loadMembers();
    if (document.getElementById("spotlight-container")) loadSpotlights();

    // Load weather if container exists
    if (document.getElementById("weather-container")) loadWeather();
});

// === Fetch Members Data for Directory ===
async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    const container = document.getElementById("members-container");
    if (!container) return;

    container.innerHTML = "";
    members.forEach((member) => {
        const card = document.createElement("div");
        card.classList.add("member-card");
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo">
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

if (gridBtn && listBtn && membersContainer) {
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
}

// === Spotlight for Home Page ===
async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        // Filter gold/silver members and pick random 2–3
        const eligible = members.filter(m => m.membershipLevel >= 2);
        const spotlight = [];
        while (spotlight.length < Math.min(3, eligible.length)) {
            const random = eligible[Math.floor(Math.random() * eligible.length)];
            if (!spotlight.includes(random)) spotlight.push(random);
        }

        displaySpotlights(spotlight);
    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

function displaySpotlights(spotlights) {
    const container = document.getElementById("spotlight-container");
    if (!container) return;
    container.innerHTML = "";

    spotlights.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership: ${member.membershipLevel === 3 ? "Gold" : "Silver"}</p>
        `;
        container.appendChild(card);
    });
}

// === Weather Section (OpenWeatherMap API) ===
async function loadWeather() {
    const container = document.getElementById("weather-container");
    if (!container) return;

    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const city = "Accra";
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${apiKey}`
        );
        const data = await response.json();

        // Process current weather and 3-day forecast
        // Display dynamically inside container
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
