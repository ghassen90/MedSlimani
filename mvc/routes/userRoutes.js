const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const homeController = require('../controllers/homeController');

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', homeController.homePage);
module.exports = router;
