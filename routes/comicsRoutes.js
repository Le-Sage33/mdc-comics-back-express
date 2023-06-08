// Le module Express est importé, et un routeur (router) est créé.
const express = require('express');
const router = express.Router();
// Les contrôleurs comicsController et authController sont importés depuis leurs fichiers correspondants.
const comicsController = require('../controllers/comicsController')
const authController = require('../controllers/authController')

// Définition des routes de l'application
// Les routes sont définies en utilisant le routeur (router) et les méthodes HTTP correspondantes (GET, POST, PUT, DELETE).

// La route principale (/) permet d'obtenir tous les comics (GET) et de créer un nouveau comics (POST).
router
    .route('/')
    .get(comicsController.findAllComics_books)
    // .post(comicsController.createComics)

    // Exemple d'utilisation d'un middleware d'authentification commenté pour protéger la création d'un comics

    .post( comicsController.createComics)

    
// La route /withReview permet d'obtenir tous les comics avec les avis associés.
router
    .route('/withReview')
    .get(comicsController.findAllComics_booksByReviewSQL)

// Route pour obtenir un comics par son identifiant
router
// La route /:id permet d'obtenir un comics spécifique par son identifiant et permet également de le mettre à jour (PUT) ou de le supprimer (DELETE).
    .route('/:id')
    .get(comicsController.findComicsByPk)
    // .put(comicsController.updateComics)
    // .delete(comicsController.deleteComics)

    // Des exemples d'utilisation de middlewares d'authentification et d'autorisation sont commentés pour protéger les opérations de création, de mise à jour et de suppression des comics.

    .put(authController.protect,comicsController.updateComics)
    .delete(authController.protect, comicsController.deleteComics)

module.exports = router; 