const express = require('express');
const mysql = require('mysql2'); // MariaDB/MySQL-Bibliothek
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Datenbankverbindung
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'testuser',
  password: process.env.DB_PASSWORD || 'testpassword',
  database: process.env.DB_NAME || 'testdb'
});

// Verbindung testen
db.connect(err => {
  if (err) {
    console.error('Fehler beim Verbinden zur Datenbank:', err.message);
    process.exit(1); // Server stoppen, wenn keine Verbindung hergestellt werden kann
  }
  console.log('Mit der Datenbank verbunden.');
});

// Default-Route
app.get('/', (req, res) => {
  res.send(
    'Willkommen auf der API! Ergänzen Sie die URL um "/api/users" für den Endpunkt.'
  );
});

// Route, um Benutzer aus der Datenbank abzurufen
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Fehler bei der Abfrage:', err.message);
      return res.status(500).json({ error: 'Daten konnten nicht abgerufen werden.' });
    }
    res.json(results);
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
