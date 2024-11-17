const mysql = require('mysql2');

// Créez une connexion à la base de données
const db = mysql.createConnection({
  host: 'sql7.freesqldatabase.com',       // Adresse du serveur MySQL
  user: 'sql7727976',            // Nom d'utilisateur MySQL
  password: 'zTUGi9BY7E',            // Mot de passe MySQL
  database: 'sql7727976'       // Nom de la base de données
});

// Connectez-vous à la base de données
db.connect((err,res) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err);
    return;
  }
  console.log('Connecté à MySQL!');
});

module.exports = db;

