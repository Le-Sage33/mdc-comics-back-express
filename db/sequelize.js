const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const ComicsModelSequelize = require('../models/comics')
const UserModelSequelize = require('../models/user')
const ReviewModelSequelize = require('../models/review')
const comics_books = require('../mock-comics_books');
const colors = require('colors');


// Créer une instance Sequelize pour établir la connexion à la base de données
const sequelize = new Sequelize('mdc-comics', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

// Définir les modèles Comics, User et Review en utilisant les fonctions des fichiers correspondants
const ComicsModel = ComicsModelSequelize(sequelize, DataTypes)
const UserModel = UserModelSequelize(sequelize, DataTypes)
const ReviewModel = ReviewModelSequelize(sequelize, DataTypes)

// Définir les relations entre les modèles
UserModel.hasMany(ReviewModel, {
    foreignKey: {
        allowNull: false
    }
  });
ReviewModel.belongsTo(UserModel); 

ComicsModel.hasMany(ReviewModel, {
    foreignKey: {
        allowNull: false
    }
  });
ReviewModel.belongsTo(ComicsModel);
    // Fonction pour initialiser la base de données
    // const initDb = () => {
    //     return sequelize.sync({ force: true }) 
    //     .then(() => {
    //         // Création des comics_books dans la base de données en utilisant les données du tableau "mock-comics_books.js"
    //         // message à afficher en console : La liste des comics_books a bien été créée.
    //         comics_books.forEach((element) => {
    //             ComicsModel.create({
    //                 picture: element.picture,
    //                 name: element.name,
    //                 description: element.description,
    //                 address: element.address,
    //             })
    //         })
    //         // Création d'un utilisateur "administrateur" avec un mot de passe haché et les rôles "user" et "admin"
    //         bcrypt.hash('mdp', 10)
    //             .then((hash) => {
    //                 UserModel.create({
    //                     username: 'Administrateur',
    //                     password: hash,
    //                     roles: ['admin']
    //                 })
    //             })
    //             .catch(err => console.log(err))

    //         // Création d'un utilisateur "pierre" avec un mot de passe haché et le rôle "user"

    //         bcrypt.hash('mdp', 10)
    //         .then((hash) => {
    //             UserModel.create({
    //                 username: 'Guillaume',
    //                 password: hash,
    //                 roles: ['user']
    //             })
    //         })
    //         .catch(err => console.log(err))
    //     })
    //     .catch(error => console.log(error + "/message error/"))
    // }
// Vérification de la connexion à la base de données
sequelize.authenticate()
    .then(() => console.log(colors.green('La connexion à la base de données MDC Comics a bien été établie!')))
    .catch(error => console.error(colors.red(`Impossible de se connecter à la base de données MDC Comics! ${error}`)))

// Exportation des instances, modèles et fonctions nécessaires
module.exports = {
    sequelize, ComicsModel, UserModel, ReviewModel,
};


// pour envoyer le mock en BDD ajouter "  initDb  "" au module export



// Ce code initialise la base de données en créant les tables et en insérant des enregistrements de test.
// Voici ce que fait chaque partie du code :

// Les packages nécessaires sont importés.
// Une instance Sequelize est créée pour établir la connexion à la base de données.
// Les modèles Coworking, User et Review sont définis en utilisant les fonctions correspondantes.
// Les relations entre les modèles sont définies.
// La fonction initDb est définie pour initialiser la base de données en synchronisant les modèles et en créant des enregistrements de test pour les coworkings et les utilisateurs.
// La connexion à la base de données est vérifiée.
// Les instances, modèles et fonctions nécessaires sont exportés pour être utilisés dans d'autres fichiers.