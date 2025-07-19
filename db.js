// db.js
const mysql = require('mysql2/promise');

// Verbindungspool zur MySQL-Datenbank
const pool = mysql.createPool({
    host: 'localhost',            // Datenbankserver
    user: 'root',                 // MySQL-Benutzername (Standard: root)
    password: '',                 // Passwort (leer lassen, falls kein Passwort gesetzt ist)
    database: 'spruchsammlung_db',// Name der Datenbank
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportieren, damit andere Dateien (z. B. server.js) darauf zugreifen können
module.exports = { pool }
