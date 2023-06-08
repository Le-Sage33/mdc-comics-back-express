const express = require('express');
const morgan = require('morgan');
const serveFavicon = require('serve-favicon');
const sequelize = require('./db/sequelize');
const app = express();
const cors = require('cors');
const port = 3002;


// La base de données est initialisée en appelant la méthode initDb() de l'objet sequelize.

// sequelize.initDb();

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// Configuration de l'application Express
app
    // Middleware de logging des requêtes HTTP en mode développement
    .use(morgan('dev'))
    // Middleware de gestion de l'icône de favicon
    .use(serveFavicon(__dirname + '/favicon.ico'))
    // Middleware pour parser les données JSON des requêtes
    .use(express.json())
    // Middleware pour gérer les CORS (Cross-Origin Resource Sharing)
    .use(cors())

// Les routes sont importées depuis leurs fichiers correspondants (coworkingRoutes, userRoutes, reviewRoutes).
const comicsRouter = require('./routes/comicsRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')

// Utilisation des routes dans l'application
app.use('/api/users', userRouter)
app.use('/api/comics_books', comicsRouter)
app.use('/api/comics_books/reviews', reviewRouter)

// / Le serveur est démarré en écoutant sur le port spécifié (3002), et un message est affiché dans la console pour indiquer que l'application est en cours d'exécution.
app.listen(port, () => {
    console.log(`L'app sur le port ${port}`)
})
