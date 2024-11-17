const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const db = require('./db'); // Import the db connection
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
require('dotenv').config(); // Charger les variables d'environnement
const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');


app.use(bodyParser.json()); // Parsing JSON-encoded bodies
// Configure CORS
app.use(cors());
const baseUrlpPRod = "/home/ubuntu/maison/src/assets/images/images/maisonJeunes/";
const baseUrl = "../src/assets/images/images/maisonJeunes/";
const pathImg = "./assets/images/images/maisonJeunes/";
const urlview = "/assets/images/images/maisonJeunes/";
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

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Get the Authorization header
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token (Bearer <token>)

    if (!token) {
        return res.status(401).json({ message: 'Token missing' }); // If no token, return 401
    }

    // Verify the token
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token', toke: token }); // Token is invalid
        }

        req.user = user; // Attach the decoded user info to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

app.get('/listeUsers', authenticateToken, (req, res) => {
    const role = req.user.userRole;
    if (role !== "ROLE_ADMIN_GENERAL") {
        res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
    }
    const query = `SELECT * FROM user 
                    inner join user_roles on user_roles.id_user = user.id_user 
                   inner join roles on user_roles.id_role= roles.id_role 
                   inner join pointcadeaux as p on p.id_pointcadeaux = user.id_pointcadeaux
                   WHERE name = "ROLE_ADMIN"`;
    db.query(query, (error, user) => {
        if (error) {
            res.status(500).json({ error: error });
        } else {
            if (user.length > 0) {
                res.status(200).json(user);
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
    });
});

// Exemple de route pour récupérer des utilisateurs
app.get('/users', (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
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
app.post('/addEvents', authenticateToken, upload.single('imageFile'), (req, res) => {
    const role = req.user.userRole;
    const UserId = req.user.UserId;
    let id_maisonjeunes = '';
    if (role !== "ROLE_ADMIN") {
        res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
    }
    const getMaison = `SELECT id_maisonjeunes FROM maisonjeunes WHERE id_user = ? limit 1`;

    db.query(getMaison, [UserId], (error, results) => {
        res.status(200).send({ error });
        if (error) {
            res.status(500).send('Error executing query:', error);
            return;
        }
        if (results.length > 0) {
            // Assuming you want the first result
            id_maisonjeunes = results[0].id_maisonjeunes;
            console.log('Maison ID:', id_maisonjeunes);
        } else {
            console.log('No maison found for the specified user.');
        }
    });
    res.status(200).send('getMaisons' + id_maisonjeunes);
    const { description, titre } = req.body;
    const imageFile = req.file ? urlview + req.file.filename : null; // Get the file path
    const query = 'INSERT INTO event (description,id_maisonjeunes, image, titre ) VALUES (?, ?, ?, ? )';

    db.query(query, [description, id_maisonjeunes, imageFile, titre], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });

});

app.post('/addEvent', authenticateToken, upload.single('imageFile'), (req, res) => {
    const role = req.user.userRole;
    const UserId = req.user.UserId;
    let id_maisonjeunes = ''; // Use let to allow reassignment

    // Check user role
    if (role !== "ROLE_ADMIN") {
        return res.status(403).json({ error: 'Insufficient permissions of the authenticated account: ' + role });
    }

    const getMaison = `SELECT id_maisonjeunes FROM maisonjeunes WHERE id_user = ? LIMIT 1`;

    // Query for the maison ID
    db.query(getMaison, [UserId], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).send('Error executing query: ' + error.message);
        }

        if (results.length > 0) {
            id_maisonjeunes = results[0].id_maisonjeunes;
            console.log('Maison ID:', id_maisonjeunes);
        } else {
            console.log('No maison found for the specified user.');
            return res.status(404).send({ message: 'No maison found for the specified user.' });
        }

        const { description, titre } = req.body;
        const imageFile = req.file ? urlview + req.file.filename : null; // Get the file path
        const query = 'INSERT INTO event (description, id_maisonjeunes, image, titre) VALUES (?, ?, ?, ?)';

        // Insert event
        db.query(query, [description, id_maisonjeunes, imageFile, titre], (err, result) => {
            if (err) {
                console.error('Error inserting event:', err);
                return res.status(500).send(err);
            } else {
                return res.status(200).send(result);
            }
        });
    });
});

app.post('/addMaisonJeunes', upload.single('imageMaison'), authenticateToken, (req, res) => {
    const role = req.user.userRole;
    const id_user = 0;
    if (role !== "ROLE_ADMIN_GENERAL") {
        res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
    }
    const { nom_maisonJeunes, tel_fixe, adresse, gouvernorat, delegation } = req.body;
    const imageMaison = req.file ? urlview + req.file.filename : null; // Get the file path

    const query = 'INSERT INTO maisonjeunes (nom_maison_jeunes, tel_fixe, adresse, gouvernorat, delegation, image_maison, id_user) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [nom_maisonJeunes, tel_fixe, adresse, gouvernorat, delegation, imageMaison, id_user], (err, result) => {
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



app.post('/signup_admin', authenticateToken, upload.single('imageMaison'), (req, res) => { // Form add maison with picture
    const role = req.user.userRole;
    if (role !== "ROLE_ADMIN_GENERAL") {
        res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
    }
    const { nom, prenom, password, tel, id_pointCadeaux } = req.body;
    /* const imageMaison = req.file ? urlview + req.file.filename : null; // Get the file path*/
    const query = `insert into user(nom, prenom, password, tel, id_pointCadeaux) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [nom, prenom, password, tel, id_pointCadeaux], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).send({
                    message: 'The phone number already exists. Please use a different phone number.',
                    error: err
                });
            } else {
                res.status(500).send({
                    message: 'An internal server error occurred.',
                    error: err
                });
            }
        } else {
            const sqlGroupe = 'INSERT INTO `user_roles`(`id_user`, `id_role` ) VALUES (?, ?)';
            db.query(sqlGroupe, [result.insertId, 2], (err) => {
                if (err) {
                    console.error('Error inserting into user_roles:', err);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                // Send success response after both inserts succeed
                res.status(201).json({ message: 'User added successfully' });
            });
            //res.status(200).send(result);
        }
    });

});

app.post('/addMaisonsToUser', authenticateToken, (req, res) => { // Add user to MaisonAddby Admin
    const role = req.user.userRole;
    if (role !== "ROLE_ADMIN_GENERAL") {
        res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
    }
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


app.get('/listMaisonJeunes', authenticateToken, (req, res) => {
    const role = req.user.userRole;
    if (role !== "ROLE_ADMIN_GENERAL" || role !== "ROLE_ADMIN_GENERAL") {
        res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
    }

    const query = 'SELECT maisonjeunes.*, user.nom, user.prenom FROM maisonjeunes LEFT join user on maisonjeunes.id_user= user.id_user  ';
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

app.post('/login1', (req, res) => {
    const user = {
        id_user: '3',
        nom: 'amri',
        prenom: 'ghassen',
        tel: '25868556',
        roles: 'ROLE_ADMIN'
    };
    res.json(user);
});





app.post('/login', (req, res) => {
    const { tel, password } = req.body;

    if (!tel || !password) {
        return res.status(400).json({ error: 'Missing phone number or password' });
    }

    const query = `SELECT * FROM user inner join user_roles on user_roles.id_user = user.id_user inner join roles on user_roles.id_role= roles.id_role WHERE user.tel = ?`;

    const values = [tel];

    db.query(query, values, (error, result) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.length > 0) {
            const user = result[0];
            if (user.password === password) {
                // Compare the provided password with the hashed password  
                const id_user = user.id_user;
                const userRole = user.name;
                const token = jwt.sign({ UserId: id_user, userRole: userRole }, jwtSecret, { expiresIn: '6h' });
                const userData = {
                    id_user: user.id_user,
                    nom: user.nom,
                    prenom: user.prenom,
                    roles: user.name,
                    tel: user.tel,
                    token: token
                };

                res.json(userData);
            } else {
                res.status(400).json({ error: 'Error phone number or password' });
            }

        } else {
            res.status(401).json({ error: 'Invalid credentials' });
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
app.get('/getMaisonJeunesByIdUser/:id', authenticateToken, (req, res) => {


    const role = req.user.userRole;
    const UserId = req.user.UserId;

    // if (role !== "ROLE_JEUNES") {
    //     res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
    //     return;
    // }
    const query = 'SELECT * FROM maisonjeunes inner join algeria_cities on algeria_cities.id= maisonjeunes.delegation WHERE  id_user= ? ';
    db.query(query, [UserId], (error, maison) => {
        if (error) {
            res.status(500).json({ error: error });
            return;
        } else {
            if (maison.length > 0) {
                res.json({ maison });
                return;
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }
        }
    });
});

app.get('/', (req, res) => {
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

app.get('/listGroupes', authenticateToken, (req, res) => {
    /*'SELECT * FROM groupe g 
    INNER JOIN group_user gs on g.id_groupe = gs.id_groupe 
    INNER JOIN maisonjeunes m on m.id_maisonjeunes = g.id_maisonjeunes*/

    const role = req.user.userRole;
    const UserId = req.user.UserId;
    const query = `SELECT * FROM groupe g 
    INNER JOIN group_user gs on g.id_groupe = gs.id_groupe 
    WHERE gs.id_user = ? `;
    //INNER JOIN maisonjeunes m on m.id_maisonjeunes = g.id_maisonjeunes`;
    db.query(query, [UserId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error querying the database: ' + err);
        } else {
            res.json(results);
        }
    });
});

app.get('/getGouvernerat', authenticateToken, (req, res) => {
    const query = `SELECT wilaya_name , wilaya_code FROM algeria_cities GROUP BY wilaya_code`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error querying the database: ' + err);
        } else {
            res.json(results);
        }
    });
});
app.get('/getDelgation/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const query = `SELECT daira_name , id FROM algeria_cities  where wilaya_code = ?  `;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error querying the database: ' + err);
        } else {
            res.json(results);
        }
    });
});

app.get('/listGroupeUserbyId', authenticateToken, (req, res) => {
    /* SELECT * FROM groupe g 
    INNER JOIN group_user gs on g.id_groupe = gs.id_groupe 
    INNER JOIN maisonjeunes m on m.id_maisonjeunes = g.id_maisonjeunes*/
    const role = req.user.userRole;
    const UserId = req.user.UserId;
    if (role !== "ROLE_ADMIN") {
        res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
        return;
    }

    const query = `SELECT g.*, gs.id_user,gs.status FROM groupe g 
                    LEFT JOIN group_user gs on gs.id_groupe = g.id_groupe 
                    WHERE gs.id_user = ? `;
    db.query(query, [UserId], (err, results) => {
        if (err) {
            res.status(500).send('Error querying the database: ' + err);
            return;
        } else {
            if (results.length > 0) {
                res.json(results);
                return;
            } else {
                res.status(401).json({ message: 'No events found for the specified user.' + UserId });
                return;
            }

        }
    });

});
app.get('/listGroupeAdminbyId', authenticateToken, (req, res) => {
    /* SELECT * FROM groupe g 
    INNER JOIN group_user gs on g.id_groupe = gs.id_groupe 
    INNER JOIN maisonjeunes m on m.id_maisonjeunes = g.id_maisonjeunes*/
    const role = req.user.userRole;
    const UserId = req.user.UserId;
    if (role !== "ROLE_ADMIN") {
        res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
        return;
    }

    const query = `SELECT * FROM groupe WHERE user_id =  ? `;
    db.query(query, [UserId], (err, results) => {
        if (err) {
            res.status(500).send('Error querying the database: ' + err);
            return;
        } else {
            if (results.length > 0) {
                res.json(results);
                return;
            } else {
                res.status(401).json({ message: 'No events found for the specified user.' + UserId });
                return;
            }

        }
    });

});
app.get('/listGroupeUser', authenticateToken, (req, res) => {

    const role = req.user.userRole;
    const UserId = req.user.UserId;
    if (role !== "ROLE_JEUNES") {
        return res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
    }

    const query = `SELECT g.*, gs.id_user,gs.status FROM groupe g 
                    LEFT JOIN group_user gs on gs.id_groupe = g.id_groupe 
                 `;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error querying the database: ' + err);
        } else {
            if (results.length > 0) {
                return res.json(results);
            } else {
                return res.status(401).json({ message: 'No events found for the specified user.' });
            }

        }
    });

});
app.get('/listMaisonUser', authenticateToken, (req, res) => {

    const role = req.user.userRole;
    const UserId = req.user.UserId;
    if (role !== "ROLE_JEUNES") {
        return res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
    }

    const query = ` SELECT m.id_maisonjeunes, m.adresse, m.nom_maison_jeunes,
                    m.tel_fixe, m.image_maison, a.commune_name, a.wilaya_name 
                    FROM maisonjeunes m 
                    LEFT join algeria_cities a on a.id= m.gouvernorat`;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error querying the database: ' + err);
        } else {
            if (results.length > 0) {
                return res.json(results);
            } else {
                return res.status(401).json({ message: 'No events found for the specified user.' });
            }

        }
    });

});
app.get('/event/list', authenticateToken, (req, res) => {
    const role = req.user.userRole;
    const UserId = req.user.UserId;
    if (role !== "ROLE_ADMIN") {
        res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
        return;
    }
    const query = `SELECT
  e.id_event,
  e.titre,
  e.description,
  e.time,
  e.image,
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
  FROM event e where e.id_maisonjeunes=(select id_maisonjeunes from maisonjeunes where id_user = ? limit 1)`;
    db.query(query, [UserId], (error, evennement) => {
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


app.get('/event/list/:id', authenticateToken, (req, res) => {
    const role = req.user.userRole;
    const id = parseInt(req.params.id);


    if (role !== "ROLE_JEUNES") {
        res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
        return;
    }
    const query = `SELECT
  e.id_event,
  e.titre,
  e.description,
  e.time,
  e.image,
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
  FROM event e WHERE e.id_maisonjeunes= ?`;
    db.query(query, [id], (error, evennement) => {
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

app.post('/add-comment', authenticateToken, (req, res) => {
    const role = req.user.userRole;
    const UserId = req.user.UserId;
    const description = req.body.description
    const id_event = req.body.id_event
    if (role !== "ROLE_JEUNES") {
        res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
        return;
    }
    const query = 'INSERT INTO comment ( `description`, `id_event`, `id_user` ) VALUES (?, ?, ? )';
    db.query(query, [description, id_event, UserId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});



app.post('/addGroupe', authenticateToken, (req, res) => {
    const groupe = req.body.group;

    const role = req.user.userRole;
    const UserId = req.user.UserId;
    if (role !== "ROLE_ADMIN") {
        res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
    }
    // Validation
    if (!groupe.nom_groupe || !groupe.description || !groupe.category) {
        return res.status(400).json({ message: 'Missing required fields' });
    }


    groupe.status = groupe.status || '0'; // Default status if not provided
    // Insert into the 'groupe' table
    const sql = 'INSERT INTO `groupe`(`category`, `description`, `id_maisonjeunes`, `nom_groupe`, user_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [groupe.category, groupe.description, null, groupe.nom_groupe, UserId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Insert into the 'group_user' table
        const sqlGroupe = 'INSERT INTO `group_user`(`id_groupe`, `id_user`, `status`) VALUES (?, ?, ?)';
        db.query(sqlGroupe, [result.insertId, UserId, groupe.status], (err) => {
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
    res.status(200).send({ message: req.body });
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

app.post('/rejoindre', (req, res) => { // Form add maison with picture


    const { id_groupe, id_user, status } = req.body;

    const query = 'INSERT INTO group_user (id_groupe, id_user, status ) VALUES (?, ?, ? )';

    db.query(query, [id_groupe, id_user, status], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});


app.post('/updatePointCadeaux', (req, res) => { // Form add maison with picture
    res.status(200).send(req.body);

    /*const { nom, tel_Fixe, password, prenom, tel, id_pointCadeaux } = req.body;
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

app.get('/pointCadeaux/:id', upload.single('imageMaison'), (req, res) => { // Form add maison with picture
    const id = parseInt(req.params.id);
    const query = 'SELECT   u.id_pointCadeaux,point_cadeaux FROM user u inner join pointcadeaux p on u.id_pointcadeaux = p.id_pointcadeaux where u.id_user = ? ';
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

    /*const { nom, tel_Fixe, password, prenom, tel, id_pointCadeaux } = req.body;
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





app.get('/listGroupUser/:id', authenticateToken, (req, res) => {
    const groupe = req.body.group;

    const role = req.user.userRole;
    const UserId = req.user.UserId;
    if (role !== "ROLE_ADMIN") {
        res.status(403).json({ error: 'Insufficient permissions of the authenticated account : ' + role });
    } // Form add maison with picture
    const id = parseInt(req.params.id);
    const query = 'SELECT  *  FROM group_user id_user = ? ';
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








// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});