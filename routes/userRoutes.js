const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController') 

// La route principale (/) permet d'obtenir tous les utilisateurs (GET).
router
    .route('/')
    .get(userController.findAllUsers)

// La route /login permet de se connecter en appelant la méthode login du contrôleur d'authentification (authController).
router
    .route('/login')
    .post(authController.login)

// La route /signup permet de s'inscrire en appelant la méthode signup du contrôleur d'authentification (authController).
router
    .route('/signup')
    .post(authController.signup)

module.exports = router;