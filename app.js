const spruchAnzeige = document.getElementById('spruch-anzeige');
const randomSpruchBtn = document.getElementById('random-spruch-btn');
const neuesSpruchForm = document.getElementById('neuer-spruch-form');
const spruchInput = document.getElementById('spruch-input');
const autorInput = document.getElementById('autor-input');
const spruchListe = document.getElementById('spruch-liste');

const API_URL = 'http://localhost:3000/api/sprueche';

// 🟢 A: Sprüche vom Server laden (GET)
async function ladeSprueche() {
    const response = await fetch(API_URL);
    const daten = await response.json();
    renderSprueche(daten);
}

// 🟡 B: Sprüche anzeigen und löschen (GET & DELETE)
function renderSprueche(sprueche) {
    spruchListe.innerHTML = '';
    sprueche.forEach(spruch => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div>
                <p class="mb-1">"${spruch.text}"</p>
                <small class="text-muted fst-italic">- ${spruch.autor}</small>
            </div>
            <button class="btn btn-danger btn-sm" onclick="loescheSpruch(${spruch.id})">🗑</button>
        `;
        spruchListe.appendChild(li);
    });
}

// NEU: Löschen-Funktion (DELETE)
async function loescheSpruch(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    ladeSprueche(); // Aktualisiere die Ansicht
}

// 🔵 C: Neue Sprüche senden (POST)
neuesSpruchForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const daten = {
        text: spruchInput.value,
        autor: autorInput.value
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(daten)
    });

    ladeSprueche(); // Nach dem Senden neu laden
    neuesSpruchForm.reset(); // Formular leeren
});

// 🟣 Bonus: Zufälligen Spruch anzeigen (GET /random)
randomSpruchBtn.addEventListener('click', async () => {
    const response = await fetch(`${API_URL}/random`);
    const spruch = await response.json();
    spruchAnzeige.innerHTML = `
        <p>"${spruch.text}"</p>
        <footer class="blockquote-footer">${spruch.autor}</footer>
    `;
});

// 🔚 D: Alles starten (Initialisierung)
ladeSprueche();



