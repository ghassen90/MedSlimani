const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const db = require('./db'); // Import the db connection
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json()); // Parsing JSON-encoded bodies

// Configure CORS
app.use(cors());
const baseUrl = "../src/assets/images/images/listeMaisons";
const pathImg = "./assets/images/images/listeMaisons";
const urlview = "http://localhost:4200/assets/images/images/listeMaisons/";
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


app.get('/listeUsers', (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'SELECT * FROM user inner join user_roles on user_roles.id_user = user.id_user inner join roles on user_roles.id_role= roles.id_role WHERE name = "ROLE_JEUNES"';
  db.query(query, [id], (error, user) => {
    if (error) {
      res.status(500).json({ error: error });
    } else {
      if (user.length > 0) {
        res.json(user);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});

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
app.use(baseUrl, express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/signup_admin', upload.single('imageMaison'), (req, res) => { // Form add maison with picture
  res.status(200).send(req.body);

  const { nom, tel_Fixe, password, prenom, tel, id_pointCadeaux } = req.body;
  /* const imageMaison = req.file ? urlview + req.file.filename : null; // Get the file path

  const query = 'INSERT INTO maisonjeunes (nom_maison_jeunes, tel_fixe, adresse, gouvernorat, delegation, image_maison, id_user) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [nom_maisonJeunes, tel_Fixe, adresse, gouvernorat, delegation, imageMaison, id_user], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });*/
});

app.post('/addMaisonsToUser', (req, res) => { // Add user to MaisonAddby Admin
  const { idUser, idMaison } = req.body;
  const query = 'UPDATE `maisonjeunes` SET `id_user` = ? WHERE `maisonjeunes`.`id_maisonjeunes` = ?';

  db.query(query, [idUser, idMaison], (err, result) => {
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
app.get('/event/list', (req, res) => {
  const query = `SELECT
  e.id_event,
  e.titre,
  e.description,
  e.time,
  e.titre,
  (
    SELECT
    CONCAT(  GROUP_CONCAT(
      CONCAT('{"id_userComment":', uc.id_comment, ',"nameUser":', us.nom, ',"description":"', uc.description, '"}')
    ) )
    FROM comment uc  inner join user as us on us.id_user = uc.id_user
    WHERE uc.id_event = e.id_event
  ) AS userComments
 ,
  (
    SELECT  count(li.id_user)
    FROM lik li
    WHERE li.id_event = e.id_event
  ) AS userLikes
  ,
  (
    SELECT  count(uc.id_user)
    FROM comment uc
    WHERE uc.id_event = e.id_event
  ) AS usercommentsCount
  FROM event e `;
  db.query(query, (error, evennement) => {
    if (error) {
      res.status(500).json({ error: error });
    } else {
      if (evennement.length > 0) {
        res.json(evennement);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });const express = require('express');
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
        const baseUrl = "../src/assets/images/images/listeMaisons";
        const pathImg = "./assets/images/images/listeMaisons";
        const urlview = "http://localhost:4200/assets/images/images/listeMaisons/";
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


        app.get('/listeUsers', (req, res) => {
          const id = parseInt(req.params.id);
          const query = 'SELECT * FROM user inner join user_roles on user_roles.id_user = user.id_user inner join roles on user_roles.id_role= roles.id_role WHERE name = "ROLE_JEUNES"';
          db.query(query, [id], (error, user) => {
            if (error) {
              res.status(500).json({ error: error });
            } else {
              if (user.length > 0) {
                res.json(user);
              } else {
                res.status(401).json({ error: 'Invalid credentials' });
              }
            }
          });
        });

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
        app.use(baseUrl, express.static('uploads'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());


        app.post('/signup_admin', upload.single('imageMaison'), (req, res) => { // Form add maison with picture
          res.status(200).send(req.body);

          const { nom, tel_Fixe, password, prenom, tel, id_pointCadeaux } = req.body;
          /* const imageMaison = req.file ? urlview + req.file.filename : null; // Get the file path

          const query = 'INSERT INTO maisonjeunes (nom_maison_jeunes, tel_fixe, adresse, gouvernorat, delegation, image_maison, id_user) VALUES (?, ?, ?, ?, ?, ?, ?)';

          db.query(query, [nom_maisonJeunes, tel_Fixe, adresse, gouvernorat, delegation, imageMaison, id_user], (err, result) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).send(result);
            }
          });*/
        });

        app.post('/addMaisonsToUser', (req, res) => { // Add user to MaisonAddby Admin
          const { idUser, idMaison } = req.body;
          const query = 'UPDATE `maisonjeunes` SET `id_user` = ? WHERE `maisonjeunes`.`id_maisonjeunes` = ?';

          db.query(query, [idUser, idMaison], (err, result) => {
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
        app.get('/event/list', (req, res) => {
          const query = `SELECT
  e.id_event,
  e.titre,
  e.description,
  e.time,
  e.titre,
  (
    SELECT
    CONCAT(  GROUP_CONCAT(
      CONCAT('{"id_userComment":', uc.id_comment, ',"nameUser":', us.nom, ',"description":"', uc.description, '"}')
    ) )
    FROM comment uc  inner join user as us on us.id_user = uc.id_user
    WHERE uc.id_event = e.id_event
  ) AS userComments
 ,
  (
    SELECT  count(li.id_user)
    FROM lik li
    WHERE li.id_event = e.id_event
  ) AS userLikes
  ,
  (
    SELECT  count(uc.id_user)
    FROM comment uc
    WHERE uc.id_event = e.id_event
  ) AS usercommentsCount
  FROM event e `;
          db.query(query, (error, evennement) => {
            if (error) {
              res.status(500).json({ error: error });
            } else {
              if (evennement.length > 0) {
                res.json(evennement);
              } else {
                res.status(401).json({ error: 'Invalid credentials' });
              }
            }
          });
        });

// Handle file upload

// Serve static files from the 'uploads' directory
        app.use('/uploads', express.static('uploads'));

        app.listen(port, () => {
          console.log(`Server is running on http://localhost:${port}`);
        });


        app.post('/login1', (req, res) => {
          const { tel, password } = req.body;
          const query = 'SELECT * FROM user inner join user_roles on user_roles.id_user = user.id_user inner join roles on user_roles.id_role= roles.id_role WHERE user.tel = ? ';
          //const query = 'SELECT * FROM user inner join user_roles on user_roles.id_user = user.id_user inner join roles on user_roles.id_role= roles.id_role WHERE user.tel = ? AND user.password = ? ';
          const values = [tel, password];
          db.query(query, values, (error, result) => {
            if (error) {
              res.status(500).json({ error: error });
            } else {
              if (result.length > 0) {
                //  const token = jwt.sign({ tel: tel }, JWT_SECRET, { expiresIn: '1h' });
                const id_user = result[0].id_user;
                const token = jwt.sign({ UserId: id_user }, 'MaisonDeJeune', { expiresIn: '1h' });
                const value = {
                  id_user: result[0].id_user,
                  nom: result[0].nom,
                  prenom: result[0].prenom,
                  roles: result[0].name,
                  tel: result[0].tel,
                  token: token
                };
                console.log(value);
                res.json(value);
              } else {
                // res.status(401).json({ error: 'Invalid credentials' });
                console.log(query);
              }
            }
          });
        });

        app.get('/listeAdministrateur', (req, res) => {
          const id = parseInt(req.params.id);
          const query = 'SELECT user.id_user ,user.nom, user.prenom, user.tel, user.password, roles.name as roles  FROM user inner join user_roles on user_roles.id_user = user.id_user inner join roles on user_roles.id_role= roles.id_role WHERE name = "ROLE_ADMIN"';
          db.query(query, [id], (error, user) => {
            if (error) {
              res.status(500).json({ error: error });
            } else {
              if (user.length > 0) {
                res.json(user);
              } else {
                res.status(401).json({ error: 'Invalid credentials' });
              }
            }
          });
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
        app.get('/getUserByid/:id', (req, res) => {
          const id = parseInt(req.params.id);
          const query = 'SELECT * FROM user inner join user_roles on user_roles.id_user = user.id_user inner join roles on user_roles.id_role= roles.id_role WHERE  user.id_user= ? ';
          db.query(query, [id], (error, user) => {
            if (error) {
              res.status(500).json({ error: error });
            } else {
              if (user.length > 0) {
                res.json(user);
              } else {
                res.status(401).json({ error: 'Invalid credentials' });
              }
            }
          });
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

      }
    }
  });
});

// Handle file upload
app.post('/addCarte', upload.single('imageCart'), (req, res) => {
  const { nom, prenom, dateDeNaissance, matricule } = req.body;
  const imageCart = req.file ? urlview + req.file.filename : "null"; // Get the file path

 /* const sql = 'INSERT INTO `groupe`(`category`, `description`, `id_maisonjeunes`, `nom_groupe`) VALUES (?, ?, ?, ?)';
  db.query(sql, [groupe.category, groupe.description, 1, groupe.nom_groupe], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }*/


    /*const sqlGroupe = 'INSERT INTO `carte`(  `date_naissance`, `etat`, `id_maisonjeunes`, `id_user`, `matrucile`, `photo_user`) VALUES (?,?,?,?,?,?)';
  db.query(sqlGroupe, [result.insertId, access.idUser, groupe.status], (err) => {
    if (err) {
      console.error('Error inserting into group_user:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    // Send success response after both inserts succeed
    res.status(201).json({ message: 'Group added successfully', groupId: result.insertId });
  });*/
  res.send({ message: nom });
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
    roles: 'ROLE_ADMIN_GENERAL'
  };
  res.json(user);
});

app.post('/login1', (req, res) => {
  const { tel, password } = req.body;
  const query = 'SELECT * FROM user inner join user_roles on user_roles.id_user = user.id_user inner join roles on user_roles.id_role= roles.id_role WHERE user.tel = ? ';
  //const query = 'SELECT * FROM user inner join user_roles on user_roles.id_user = user.id_user inner join roles on user_roles.id_role= roles.id_role WHERE user.tel = ? AND user.password = ? ';
  const values = [tel, password];
  db.query(query, values, (error, result) => {
    if (error) {
      res.status(500).json({ error: error });
    } else {
      if (result.length > 0) {
        //  const token = jwt.sign({ tel: tel }, JWT_SECRET, { expiresIn: '1h' });
        const id_user = result[0].id_user;
        const token = jwt.sign({ UserId: id_user }, 'MaisonDeJeune', { expiresIn: '1h' });
        const value = {
          id_user: result[0].id_user,
          nom: result[0].nom,
          prenom: result[0].prenom,
          roles: result[0].name,
          tel: result[0].tel,
          token: token
        };
        console.log(value);
        res.json(value);
      } else {
        // res.status(401).json({ error: 'Invalid credentials' });
        console.log(query);
      }
    }
  });
});

app.get('/listeAdministrateur', (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'SELECT user.id_user ,user.nom, user.prenom, user.tel, user.password, roles.name as roles  FROM user inner join user_roles on user_roles.id_user = user.id_user inner join roles on user_roles.id_role= roles.id_role WHERE name = "ROLE_ADMIN"';
  db.query(query, [id], (error, user) => {
    if (error) {
      res.status(500).json({ error: error });
    } else {
      if (user.length > 0) {
        res.json(user);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
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
app.get('/getUserByid/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'SELECT * FROM user inner join user_roles on user_roles.id_user = user.id_user inner join roles on user_roles.id_role= roles.id_role WHERE  user.id_user= ? ';
  db.query(query, [id], (error, user) => {
    if (error) {
      res.status(500).json({ error: error });
    } else {
      if (user.length > 0) {
        res.json(user);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
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


app.put('/updateGroupe', (req, res) => {
  res.status(200).send({ message: req.body});
});
app.delete('/deleteGroupe/:id', (req, res) => {
  const groupId = parseInt(req.params.id, 10);

  // Start a transaction
  db.beginTransaction(err => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).send({ error: 'Transaction error' });
    }

    // First, delete from the `group_user` table
    const deleteGroupUserQuery = 'DELETE FROM group_user WHERE id_groupe = ?';
    db.query(deleteGroupUserQuery, [groupId], (err, result) => {
      if (err) {
        return db.rollback(() => {
          console.error('Error deleting from group_user:', err);
          res.status(500).send({ error: 'Error deleting from group_user' });
        });
      }

      // Then, delete from the `groupe` table
      const deleteGroupeQuery = 'DELETE FROM groupe WHERE id_groupe = ?';
      db.query(deleteGroupeQuery, [groupId], (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.error('Error deleting from groupe:', err);
            res.status(500).send({ error: 'Error deleting from groupe' });
          });
        }

        // Commit the transaction
        db.commit(err => {
          if (err) {
            return db.rollback(() => {
              console.error('Transaction commit error:', err);
              res.status(500).send({ error: 'Transaction commit error' });
            });
          }

          res.status(200).send({ message: 'Group and related users deleted successfully' });
        });
      });
    });
  });
});

