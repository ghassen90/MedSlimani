// user.js

var connection = require('./db.js');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userRoutes = require('./user'); // Import the user.js module

const multer = require('multer');
const path = require('path');
const cors = require('cors');

const router = express.Router();

// Route to get a list of users
router.get('/users', (req, res) => {
    res.send([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]);
});

// Route to create a new user
router.post('/signup_admin', (req, res) => {
    const newUser = req.body;
    const { nom, prenom, password, tel, id_pointCadeaux } = req.body;


    const query = 'INSERT INTO `user`(  `nom`, `prenom`, `password`, `tel`, `id_pointcadeaux`) VALUES(   ? , ? , ? , ? , ?   ) ';

    connection.query(query, [nom, prenom, password, tel, id_pointCadeaux], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const iduser = result.insertId;

            // Query to insert into the user_roles table
            const roleQuery = 'INSERT INTO `user_roles`(`id_user`, `id_role`) VALUES(?, ?)';
            connection.query(roleQuery, [iduser, 2], (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send({ message: 'User and role added successfully', userId: iduser });
                }
            });
        }
    });

});

// Export the router
module.exports = router;