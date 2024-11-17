const { Sequelize } = require('sequelize');

// Configurer la connexion à MySQL
const sequelize = new Sequelize('sql7727976', 'sql7727976', 'zTUGi9BY7E', {
  host: 'sql7.freesqldatabase.com',  // Adresse du serveur MySQL
  dialect: 'mysql',                  // Spécifiez que MySQL est utilisé
  port: 3306,                        // Port par défaut pour MySQL
  logging: false,                    // Désactiver les logs de Sequelize
  pool: {                            // Gestion du pool de connexions
    max: 5,                          // Nombre max de connexions simultanées
    min: 0,                          // Nombre min de connexions simultanées
    acquire: 30000,                  // Temps maximum pour obtenir une connexion (ms)
    idle: 10000                      // Temps avant déconnexion d'une connexion inactive (ms)
  }
});

// Tester la connexion
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données MySQL réussie avec Sequelize!');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
  });

module.exports = sequelize;
