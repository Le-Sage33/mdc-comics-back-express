const { Op, UniqueConstraintError, ValidationError } = require('../db/sequelize');
const { UserModel } = require('../db/sequelize')

// Trouver tous les utilisateurs

// findAllUsers: Récupère tous les utilisateurs de la base de données en utilisant le modèle UserModel.
exports.findAllUsers = (req, res) => {
    // Le scope 'withoutPassword' est utilisé pour exclure le mot de passe des utilisateurs lors de la récupération.
    UserModel.scope('withoutPassword').findAll()
        .then((elements)=>{
            // Les utilisateurs sont renvoyés en tant que données de réponse dans un objet JSON avec un message indiquant le succès de l'opération.
            const msg = 'La liste des utilisateurs a bien été récupérée en base de données.'
            res.json({message: msg, data: elements})
        })
        // Les erreurs sont gérées et renvoyées avec un code d'état 500 en cas de problème lors de la récupération des utilisateurs.
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({message: msg})
        })
}
