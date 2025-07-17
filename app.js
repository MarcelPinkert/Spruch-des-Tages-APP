const spruchAnzeige = document.getElementById('spruch-anzeige');
const randomSpruchBtn = document.getElementById('random-spruch-btn');
const neuesSpruchForm = document.getElementById('neuer-spruch-form');
const spruchInput = document.getElementById('spruch-input');
const autorInput = document.getElementById('autor-input');
const spruchListe = document.getElementById('spruch-liste');

const API_URL = 'http://localhost:3000/api/sprueche';

function renderSprueche() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            spruchListe.innerHTML = '';
            data.forEach(spruch => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `
                    <div>
                        <p class="mb-1">"${spruch.text}"</p>
                        <small class="text-muted fst-italic">- ${spruch.autor}</small>
                    </div>
                    <button class="btn btn-sm btn-danger" onclick="loescheSpruch(${spruch.id})">🗑</button>
                `;
                spruchListe.appendChild(li);
            });
        });
}

neuesSpruchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const neuerSpruch = { text: spruchInput.value, autor: autorInput.value };

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(neuerSpruch)
    })
    .then(() => {
        renderSprueche();
        neuesSpruchForm.reset();
    });
});

function loescheSpruch(id) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => renderSprueche());
}

randomSpruchBtn.addEventListener('click', () => {
    fetch(`${API_URL}/random`)
        .then(res => res.json())
        .then(spruch => {
            spruchAnzeige.innerHTML = `
                <p>"${spruch.text}"</p>
                <footer class="blockquote-footer">${spruch.autor}</footer>
            `;
        });
});

// Beim Start
renderSprueche();



