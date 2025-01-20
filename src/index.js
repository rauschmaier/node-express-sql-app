const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Default-Route
app.get('/', (req, res) => {
  res.send('Willkommen auf der API! Ergänzen Sie die URL um "/api/users" für den Endpunkt.');
});

// Beispielroute
app.get('/api/users', (req, res) => {
  res.json({ id: 1, name: "Testuser" });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});