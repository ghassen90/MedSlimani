const express = require('express');
const app = express();
const port = 3006;

// Importez la connexion MySQL
const db = require('./db');

// Middleware pour parser les données JSON
app.use(express.json());

// Exemple de route pour récupérer des utilisateurs
app.get('/users', (req, res) => {
  db.query('SELECT * FROM ghassen', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur de récupération des utilisateurs' });
    }
    res.json(results);
  });
});

// Exemple de route pour ajouter un utilisateur
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur d\'ajout de l\'utilisateur' });
    }
    res.status(201).json({ id: results.insertId, name, email });
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

