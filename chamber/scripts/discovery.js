

// discovery.js
import { items } from "../data/places.mjs";

// SELECT GRID CONTAINER
const showHere = document.querySelector("#cards-grid");

// DISPLAY CARDS FUNCTION
function displayItems(list) {
    list.forEach(x => {
        const card = document.createElement("div");
        card.classList.add("place-card");

        // IMAGE
        const img = document.createElement("img");
        img.src = `images/${x.images}`;
        img.alt = x.name;
        img.loading = "lazy";
        card.appendChild(img);

        // NAME
        const title = document.createElement("h2");
        title.textContent = x.name;
        card.appendChild(title);

        // POPULATION
        const pop = document.createElement("p");
        pop.textContent = `Population: ${x.population}`;
        card.appendChild(pop);

        // DESCRIPTION
        const desc = document.createElement("p");
        desc.textContent = x.description;
        card.appendChild(desc);

        // ADDRESS
        const address = document.createElement("address");
        address.textContent = x.address;
        card.appendChild(address);

        showHere.appendChild(card);
    });
}

// LAST VISIT MESSAGE
function lastVisitMessage() {
    const visitBox = document.querySelector("#visit-msg");
    const lastVisit = Number(localStorage.getItem("lastVisit")) || Date.now();

    const now = Date.now();
    const daysPassed = Math.round((now - lastVisit) / (1000 * 60 * 60 * 24));

    let message = "";

    if (!localStorage.getItem("lastVisit")) {
        message = "Welcome! This is your first visit.";
    } else if (daysPassed < 1) {
        message = "Back so soon! Awesome!";
    } else if (daysPassed === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${daysPassed} days ago.`;
    }

    visitBox.textContent = message;
    localStorage.setItem("lastVisit", now);
}

// INIT PAGE
displayItems(items);
lastVisitMessage();
