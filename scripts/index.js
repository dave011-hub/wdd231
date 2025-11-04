



// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
    // NAVIGATION TOGGLE (hamburger -> toggles .open)
    const navButton = document.getElementById("nav-button");
    const nav = document.getElementById("primary-nav");

    if (navButton && nav) {
        navButton.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            navButton.classList.toggle("open");
            navButton.setAttribute("aria-expanded", isOpen);
        });
    }

    // COURSE DATA (modify completed to true for courses you finished)
    const courses = [
        { code: "WDD130", name: "Web Fundamentals", credits: 3, subject: "WDD", completed: true },
        { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, subject: "WDD", completed: false },
        { code: "WDD231", name: "Frontend Development I", credits: 3, subject: "WDD", completed: false },
        { code: "CSE110", name: "Introduction to Programming", credits: 2, subject: "CSE", completed: true },
        { code: "CSE210", name: "Programming with Classes", credits: 3, subject: "CSE", completed: false },
        { code: "COMM130", name: "Public Speaking", credits: 2, subject: "COMM", completed: true },
    ];

    // Build containers
    const courseSection = document.createElement("section");
    courseSection.id = "courses";
    courseSection.className = "card";
    courseSection.innerHTML = `<h2>My Course Progress</h2>`;

    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-buttons";

    const courseList = document.createElement("div");
    courseList.className = "course-list";

    const totalCreditsEl = document.createElement("p");
    totalCreditsEl.id = "totalCredits";

    courseSection.appendChild(filterContainer);
    courseSection.appendChild(courseList);
    courseSection.appendChild(totalCreditsEl);

    // Insert courses section after the join section
    const joinSection = document.getElementById("join");
    if (joinSection && joinSection.parentNode) {
        joinSection.parentNode.insertBefore(courseSection, joinSection.nextSibling);
    } else {
        document.querySelector("main").appendChild(courseSection);
    }

    // Subjects for filters
    const subjects = ["All", ...new Set(courses.map(c => c.subject))];

    subjects.forEach(sub => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = sub;
        btn.addEventListener("click", () => {
            // visually mark active button
            Array.from(filterContainer.children).forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderCourses(sub);
        });
        filterContainer.appendChild(btn);
    });

    // initial active
    if (filterContainer.firstChild) filterContainer.firstChild.classList.add("active");

    // Render function
    function renderCourses(filter = "All") {
        courseList.innerHTML = "";

        const filtered = filter === "All" ? courses : courses.filter(c => c.subject === filter);

        filtered.forEach(course => {
            const card = document.createElement("article");
            card.className = "course-card";
            if (course.completed) card.classList.add("completed");

            card.innerHTML = `
        <h3>${course.code}</h3>
        <p class="course-name">${course.name}</p>
        <p class="course-credits"><strong>Credits:</strong> ${course.credits}</p>
      `;
            courseList.appendChild(card);
        });

        const total = filtered.reduce((sum, c) => sum + c.credits, 0);
        totalCreditsEl.textContent = `Total Credits: ${total}`;
    }

    // Initial render
    renderCourses("All");

    // Footer dynamic dates
    const yearEl = document.getElementById("currentyear");
    const lastEl = document.getElementById("lastModified");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastEl) lastEl.textContent = "Last Modified: " + document.lastModified;
});
