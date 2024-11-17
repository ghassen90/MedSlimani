const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const db = require('./db'); // Import the db connection
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
app.use(bodyParser.json()); // Parsing JSON-encoded bodies

// Configure CORS
app.use(cors());
const siteWeb ="http://51.68.172.30/";
const baseUrl = "../src/assets/images/images/listeMaisons";
const pathImg = "./assets/images/images/listeMaisons";
const urlview = siteWeb+"assets/images/images/listeMaisons/";
// Configure multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, baseUrl);
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});


const upload = multer({ storage });




app.post('/addMaisonJeunes', upload.single('imageMaison'), (req, res) => { // Form add maison with picture
  const { nom_maisonJeunes, tel_Fixe, adresse, gouvernorat, delegation, id_user } = req.body;
  const imageMaison = req.file ? urlview + req.file.filename : null; // Get the file path

  const query = 'INSERT INTO maisonjeunes (nom_maison_jeunes, tel_fixe, adresse, gouvernorat, delegation, image_maison, id_user) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [nom_maisonJeunes, tel_Fixe, adresse, gouvernorat, delegation, imageMaison, id_user], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/listMaisonJeunes', (req, res) => {
  const query = 'SELECT * FROM maisonjeunes  ';
  db.query(query, (error, maison) => {
    if (error) {
      res.status(500).json({ error: error });
    } else {
      if (maison.length > 0) {
        res.json(maison);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});


// Handle file upload
app.post('/addCarte', upload.single('file'), (req, res) => {
  const { nom, prenom, dateDeNaissance, matricule } = req.body;
  const imageCart = req.file ? urlview + req.file.filename : "null"; // Get the file path

  // Do something with the received data and file
  console.log('Nom:', nom);
  console.log('Prenom:', prenom);
  console.log('Date de naissance:', dateDeNaissance);
  console.log('Matricule:', matricule);
  console.log('File:', imageCart);


  res.send({ message: imageCart });
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/login', (req, res) => {
  const user = {
    id_user: '3',
    nom: 'amri',
    prenom: 'ghassen',
    tel: '25868556',
    roles: 'ROLE_ADMIN'
  };
  res.json(user);
});

app.get('/getMaisonJeunesByIdUser/:id', (req,res)=> {
  const liste = [
    { id_maisonjeunes: 1, nom_maison_jeunes: '3', tel_fixe: 'amri', adresse: 'ghassen', gouvernorat: '25868556', delegation: 'jfdc', id_user: '3' },
    { id_maisonjeunes: 2, nom_maison_jeunes: '3', tel_fixe: 'amri', adresse: 'ghassen', gouvernorat: '25868556', delegation: 'jfdc', id_user: '3' },
    { id_maisonjeunes: 3, nom_maison_jeunes: '3', tel_fixe: 'amri', adresse: 'ghassen', gouvernorat: '25868556', delegation: 'jfdc', id_user: '3' },
    { id_maisonjeunes: 4, nom_maison_jeunes: '3', tel_fixe: 'amri', adresse: 'ghassen', gouvernorat: '25868556', delegation: 'jfdc', id_user: '3' },
    { id_maisonjeunes: 5, nom_maison_jeunes: '3', tel_fixe: 'amri', adresse: 'ghassen', gouvernorat: '25868556', delegation: 'jfdc', id_user: '3' }
  ];
  res.json(liste);
});

app.get('/getMaisonJeunesByIdUsers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'SELECT * FROM maisonjeunes WHERE  id_user= ? ';
  db.query(query, [id], (error, maison) => {
    if (error) {
      res.status(500).json({ error: error });
    } else {
      if (maison.length > 0) {
        res.json({ maison });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});

app.get('/',(req,res) => {
  res.json("trye");
});


app.get('/listeCartes', (req, res) => {
  db.query('SELECT * FROM carte c  inner join user u where u.id_user = c.id_user ', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error querying the database: ' + err);
    } else {
      res.json(results);
    }
  });
});

app.get('/listGroupes', (req, res) => {
  db.query( 'SELECT * FROM groupe g INNER JOIN group_user gs on g.id_groupe = gs.id_groupe INNER JOIN maisonjeunes m on m.id_maisonjeunes = g.id_maisonjeunes ', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error querying the database: ' + err);
    } else {
      res.json(results);
    }
  });
});

app.post('/addGroupe', (req, res) => {
  const groupe = req.body.group;
  const access = req.body;

  // Validation
  if (!groupe.nom_groupe || !groupe.description || !groupe.category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (access.roles !== 'ROLE_ADMIN' || !access.idUser) {
    return res.status(403).json({ message: 'Access Denied' });
  }

  groupe.status = groupe.status || '0'; // Default status if not provided
  // Insert into the 'groupe' table
  const sql = 'INSERT INTO `groupe`(`category`, `description`, `id_maisonjeunes`, `nom_groupe`) VALUES (?, ?, ?, ?)';
  db.query(sql, [groupe.category, groupe.description, 1, groupe.nom_groupe], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Insert into the 'group_user' table
    const sqlGroupe = 'INSERT INTO `group_user`(`id_groupe`, `id_user`, `status`) VALUES (?, ?, ?)';
    db.query(sqlGroupe, [result.insertId, access.idUser, groupe.status], (err) => {
      if (err) {
        console.error('Error inserting into group_user:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Send success response after both inserts succeed
      res.status(201).json({ message: 'Group added successfully', groupId: result.insertId });
    });
  });
});
