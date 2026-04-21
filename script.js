const form = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");
const emptyText = document.getElementById("emptyText");
const clearAllBtn = document.getElementById("clearAll");
const addSampleBtn = document.getElementById("addSample");

// Load saved events
window.onload = function () {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    savedEvents.forEach(addEventToDOM);
};

// Add Event
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const event = {
        title: title.value,
        date: date.value,
        category: category.value,
        description: description.value
    };

    addEventToDOM(event);
    saveEvent(event);

    form.reset();
});

// Add to UI
function addEventToDOM(event) {
    const div = document.createElement("div");
    div.classList.add("event");

    div.innerHTML = `
        <h3>${event.title}</h3>
        <p><b>Date:</b> ${event.date}</p>
        <p><b>Category:</b> ${event.category}</p>
        <p>${event.description}</p>
        <button class="deleteBtn">Delete</button>
    `;

    eventList.appendChild(div);
    emptyText.style.display = "none";
}

// Save to localStorage
function saveEvent(event) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
}

// Delete event
eventList.addEventListener("click", function (e) {
    if (e.target.classList.contains("deleteBtn")) {
        const title = e.target.parentElement.querySelector("h3").innerText;
        deleteFromStorage(title);

        e.target.parentElement.remove();

        if (eventList.children.length === 0) {
            emptyText.style.display = "block";
        }
    }
});

// Delete from storage
function deleteFromStorage(title) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events = events.filter(e => e.title !== title);
    localStorage.setItem("events", JSON.stringify(events));
}

// Clear all
clearAllBtn.addEventListener("click", function () {
    localStorage.removeItem("events");
    eventList.innerHTML = "";
    emptyText.style.display = "block";
});

// Sample events
addSampleBtn.addEventListener("click", function () {
    const samples = [
        { title: "Tech Conference", date: "2026-05-10", category: "Conference", description: "Tech event" },
        { title: "React Workshop", date: "2026-05-15", category: "Workshop", description: "Learn React" }
    ];

    samples.forEach(event => {
        addEventToDOM(event);
        saveEvent(event);
    });
});
