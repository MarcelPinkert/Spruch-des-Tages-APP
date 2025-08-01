// server.js
const express = require('express');
const cors = require('cors');
const { pool } = require('./db'); 

const app = express();
const port = 3000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // oder gezielt z.B. 'http://127.0.0.1:5500'
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json()); // statt body-parser

// Alle Sprüche abrufen
app.get('/api/sprueche', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM sprueche ORDER BY erstellt_am DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Fehler beim Laden der Sprüche:', error);
        res.status(500).json({ error: 'Fehler beim Laden der Sprüche' });
    }
});

// Zufälligen Spruch abrufen
app.get('/api/sprueche/random', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM sprueche ORDER BY RAND() LIMIT 1');
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Keine Sprüche vorhanden' });
        }
    } catch (error) {
        console.error('Fehler beim Abrufen des Zufallsspruchs:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen des Spruchs' });
    }
});

// Neuen Spruch erstellen
app.post('/api/sprueche', async (req, res) => {
    const { text, autor } = req.body;

    if (!text || !autor) {
        return res.status(400).json({ error: 'Text und Autor sind erforderlich' });
    }

    try {
        const [result] = await pool.execute(
            'INSERT INTO sprueche (text, autor) VALUES (?, ?)',
            [text, autor]
        );
        const [newSpruch] = await pool.execute(
            'SELECT * FROM sprueche WHERE id = ?',
            [result.insertId]
        );
        res.status(201).json(newSpruch[0]);
    } catch (error) {
        console.error('Fehler beim Erstellen des Spruchs:', error);
        res.status(500).json({ error: 'Fehler beim Erstellen des Spruchs' });
    }
});

// Spruch bearbeiten (PUT)
app.put('/api/sprueche/:id', async (req, res) => {
    const { id } = req.params;
    const { text, autor } = req.body;

    if (!text || !autor) {
        return res.status(400).json({ error: 'Text und Autor sind erforderlich' });
    }

    try {
        const [result] = await pool.execute(
            'UPDATE sprueche SET text = ?, autor = ? WHERE id = ?',
            [text, autor, id]
        );
        if (result.affectedRows > 0) {
            const [updatedSpruch] = await pool.execute(
                'SELECT * FROM sprueche WHERE id = ?',
                [id]
            );
            res.status(200).json(updatedSpruch[0]);
        } else {
            res.status(404).json({ error: 'Spruch nicht gefunden' });
        }
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Spruchs:', error);
        res.status(500).json({ error: 'Fehler beim Aktualisieren des Spruchs' });
    }
});

// Spruch löschen
app.delete('/api/sprueche/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.execute('DELETE FROM sprueche WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Spruch nicht gefunden' });
        }
    } catch (error) {
        console.error('Fehler beim Löschen des Spruchs:', error);
        res.status(500).json({ error: 'Fehler beim Löschen des Spruchs' });
    }
});

// Server starten
app.listen(port, () => {
    console.log(`✅ Server läuft auf http://localhost:${port}`);
});



