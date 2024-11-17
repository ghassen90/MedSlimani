const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/dbConfig');

app.use(express.json());
app.use('/api', userRoutes);

// Synchroniser la base de données
sequelize.sync().then(() => {
  console.log('Base de données synchronisée');
});

// Lancer le serveur
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
