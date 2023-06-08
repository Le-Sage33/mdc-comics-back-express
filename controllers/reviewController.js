const { Op, UniqueConstraintError, ValidationError } = require('../db/sequelize');
const { ReviewModel, UserModel, ComicsModel } = require('../db/sequelize')
// ReviewModel qui représente le modèle d'un avis dans la base de données. Elles utilisent également les modèles UserModel et CoworkingModel pour inclure les informations sur l'utilisateur et l'espace de coworking associés à chaque avis. Les erreurs liées aux contraintes uniques ou aux erreurs de validation sont gérées et renvoyées avec le code d'état approprié.


// Trouver tous les avis
// findAllReviews: Récupère tous les avis sur les espaces de coworking.
// Les avis incluent également les informations sur l'utilisateur qui les a laissés et sur l'espace de coworking concerné.
exports.findAllReviews = (req, res) => {
    ReviewModel.findAll({
        include: [UserModel.scope('withoutPassword'), ComicsModel]
    }) 
        .then(results => {
            const message = "La liste des avis a bien été récupérée"
            res.json({message, data: results})
        }).catch(error => {
            const message = "La liste des avis n'a pas pu être récupérée"
            res.status(500).json({message, data: error})
        })
}
// Créer un nouvel avis
// createReview: Crée un nouvel avis sur un espace de coworking.
// Les détails de l'avis, tels que le contenu, la note, l'identifiant de l'utilisateur et l'identifiant de l'espace de coworking, sont fournis dans le corps de la requête.
exports.createReview = (req, res) => {
    ReviewModel.create({
        content: req.body.content,
        rating: req.body.rating,
        UserId: req.userId,
        ComicsId: req.body.ComicsId
    }) 
        .then(result => {
            const message = "Le commentaire a bien été créé"
            res.json({message, data: result})
        }).catch(error => {
            if(error instanceof UniqueConstraintError || error instanceof ValidationError){
                return res.status(400).json({message: error.message, data: error})
            } 
            const message = "Le commentaire n'a pas pu être créé"
            res.status(500).json({message, data: error})
        })
}
// Mettre à jour un avis
// updateReview: Met à jour un avis existant sur un espace de coworking.
// Les détails de l'avis mis à jour sont fournis dans le corps de la requête, et l'avis à mettre à jour est identifié par son ID spécifié dans les paramètres de la requête.
exports.updateReview = (req, res) => {
    // Modifier l'avis du comics en base de données qui correspond à l'id spécifié dans les paramètres
    ReviewModel.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then((review) => {
        if(review === null){
            const msg = "Le comentaire demandé n'existe pas."
            res.json({message: msg})
        } else {
            const msg = "Le commentaire a bien été modifié."
            res.json({message: msg, data: review})
        }
    }).catch((error) => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        const msg = "Impossible de mettre à jour le Comics."
        res.status(500).json({message: msg})
    })
}