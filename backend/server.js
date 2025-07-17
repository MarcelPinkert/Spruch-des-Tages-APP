const express = require("express");
const app = express();
const port = 3000;

// Middleware für JSON + CORS
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Daten auf dem Server
let sprueche = [
  { "id": 1, "text": "Träume nicht dein Leben, sondern lebe deinen Traum.", "autor": "Unbekannt" },
  { "id": 2, "text": "Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.", "autor": "Bertolt Brecht" },
  { "id": 3, "text": "Gib jedem Tag die Chance, der schönste deines Lebens zu werden.", "autor": "Mark Twain" },
  { "id": 4, "text": "Nicht weil es schwer ist, wagen wir es nicht, sondern weil wir es nicht wagen, ist es schwer.", "autor": "Seneca" },
  { "id": 5, "text": "Tu jeden Tag eine Sache, die dir Angst macht.", "autor": "Eleanor Roosevelt" },
  { "id": 6, "text": "Erfolg ist kein Glück, sondern das Ergebnis von Ausdauer, Lernen und harter Arbeit.", "autor": "Albert Einstein" },
  { "id": 7, "text": "Es ist nie zu spät, das zu werden, was man hätte sein können.", "autor": "George Eliot" },
  { "id": 8, "text": "Der beste Weg, die Zukunft vorherzusagen, ist, sie zu gestalten.", "autor": "Willy Brandt" },
  { "id": 9, "text": "Der Sinn des Lebens ist, ihm einen Sinn zu geben.", "autor": "Victor Frankl" },
  { "id": 10, "text": "Mut steht am Anfang des Handelns, Glück am Ende.", "autor": "Demokrit" },
  { "id": 11, "text": "Ziele sind Träume mit einer Deadline.", "autor": "Napoleon Hill" },
  { "id": 12, "text": "Die einzige Grenze ist die, die du dir selbst setzt.", "autor": "Unbekannt" },
  { "id": 13, "text": "Auch aus Steinen, die dir in den Weg gelegt werden, kannst du etwas Schönes bauen.", "autor": "Erich Kästner" },
  { "id": 14, "text": "Der Mensch braucht Ziele – und zwar große.", "autor": "Herbert von Karajan" },
  { "id": 15, "text": "Warte nicht. Der richtige Moment ist jetzt.", "autor": "Unbekannt" },
  { "id": 16, "text": "Denke nicht so oft an das, was dir fehlt, sondern an das, was du hast.", "autor": "Marc Aurel" },
  { "id": 17, "text": "Träume nicht dein Leben, sondern lebe deinen Traum.", "autor": "Tommaso Campanella" },
  { "id": 18, "text": "Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.", "autor": "Bertolt Brecht" },
  { "id": 19, "text": "Verändere die Welt, indem du bei dir selbst anfängst.", "autor": "Mahatma Gandhi" },
  { "id": 20, "text": "Die größten Abenteuer beginnen oft mit einem kleinen Schritt.", "autor": "Unbekannt" },
  { "id": 21, "text": "Man entdeckt keine neuen Erdteile, ohne den Mut zu haben, alte Küsten aus den Augen zu verlieren.", "autor": "André Gide" },
  { "id": 22, "text": "Das Leben ist wie Fahrradfahren: Um die Balance zu halten, musst du in Bewegung bleiben.", "autor": "Albert Einstein" }
];
let nextId = 3;

// GET: Alle Sprüche
app.get("/api/sprueche", (req, res) => {
  res.json(sprueche);
});

// GET: Zufalls-Spruch
app.get("/api/sprueche/random", (req, res) => {
  const zufallsSpruch = sprueche[Math.floor(Math.random() * sprueche.length)];
  res.json(zufallsSpruch);
});

// POST: Neuen Spruch hinzufügen
app.post("/api/sprueche", (req, res) => {
  const neuerSpruch = {
    id: nextId++,
    text: req.body.text,
    autor: req.body.autor,
  };
  sprueche.push(neuerSpruch);
  res.status(201).json(neuerSpruch);
});

// DELETE: Spruch löschen
app.delete("/api/sprueche/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = sprueche.findIndex((s) => s.id === id);
  if (index !== -1) {
    sprueche.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Spruch nicht gefunden" });
  }
});

// Server starten
app.listen(port, () => {
  console.log(`✅ Server läuft auf http://localhost:${port}`);
});
