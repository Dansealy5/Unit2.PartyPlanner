const COHORT = "2502-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    events: [],
};

const eventList = document.querySelector("#eventList")
const addEventForm = document.querySelector("#eventForm");

addEventForm.addEventListener("submit", addEvent);

async function render() {
    await getEvents();
    renderEvents();
}

render();

async function getEvents() {
    try {
        const response = await fetch(API_URL)
        const json = await response.json()
        state.events = json.data
    } catch (error) {
        console.error(error)
    }
}

async function addEvent(event) {
event.preventDefault();
    const eventInfo = {
        name: addEventForm.name.value,
        description: addEventForm.description.value,
        date: new Date(addEventForm.date.value),
        location: addEventForm.location.value,
    };

    try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventInfo),
        });
        const json = await response.json();
        addEventForm.name.value = "";
        addEventForm.description.value = "";
        addEventForm.date.value = "";
        addEventForm.location.value = "";
    } catch (error) {
        console.error(error);
    }
    render();
}

async function updateEvent(id, name, location, description) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name, location, description}),
        });
        const json = await response.json();

        if (json.error) {
            throw new Error(json.message);
        }

        render();
    }   catch (error) {
        console.error(error);
    }
}

async function deleteEvent(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    render()
    } catch (error) {
      console.error(error)
    }
  }

function renderEvents() {
    // const eventList = document.querySelector("#eventList")

    if (!state.events.length) {
        eventList.innerHTML = `<Li>-No Events-</Li>`;
        return;
    }

    const eventCards = state.events.map((event) => {
        const card = document.createElement("li");
        card.classList.add("event");
        card.innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.location}</p>
        <p>${event.date}</p>
        <p>${event.description}</p>
        `;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Event";
        card.append(deleteButton);

        deleteButton.addEventListener("click", () => deleteEvent(event.id));

        return card;
    });

    eventList.replaceChildren(...eventCards);
}
    // event.preventDefault();

    // const event = {
    //     name: form.eventName.value,
    //     description: form.description.value,
    //     date: newDate(form.date.value),
    //     location: form.location.value,
    // };

    // await addEvent(event);
    // render()
// async function createEvent(name, description, date, location) {
//     try {
//         const response = await fetch(API_URL, {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({name, description, date, location})
//         })
//         const json = await response.json()
//         console.log(json);
//         render()
//     } catch (error) {
//         console.error(error)
//     }
// }
