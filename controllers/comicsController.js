let comics_books = require('../mock-comics_books');
const { Op, UniqueConstraintError, ValidationError, QueryTypes } = require('../db/sequelize');
const { ComicsModel, ReviewModel, sequelize } = require('../db/sequelize')

// Trouver tous les comics
exports.findAllComics_books = (req, res) => {
    if(req.query.search){
        // Effectuer une recherche avec des paramètres
        ComicsModel.findAll({ where: { name: {[Op.like] : `%${req.query.search}%`} } })
        .then((elements)=>{
            if(!elements.length){
                return res.json({message: "Aucun comics ne correspond à votre recherche"})    
            }
            const msg = 'La liste des comics_books a bien été récupérée en base de données.'
            res.json({message: msg, data: elements})
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({message: msg})
        })
    } else {
        // Récupérer tous les comics
        ComicsModel.findAll()
        .then((elements)=>{
            const msg = 'La liste des comics_books a bien été récupérée en base de données.'
            res.json({message: msg, data: elements})
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({message: msg})
        })
    }
}
// Trouver un comics par son ID
exports.findComicsByPk = (req, res) => {
    // Afficher comics correspondant à l'ID spécifié dans les paramètres, en le récupérant dans la base de données
    ComicsModel.findByPk(req.params.id, {
        include: ReviewModel
    })
        .then(comics => {
            if (comics === null) {
                const message = `Le comics demandé n'existe pas.`
                res.status(404).json({ message })
            } else {
                const message = "Un comics a bien été trouvé."
                res.json({ message, data: comics });
            }
        })
        .catch(error => {
            const message = `La liste des comics_books n'a pas pu se charger. Reessayez ulterieurement.`
            res.status(500).json({ message, data: error })
        })
}
// Trouver tous les comics ayant des évaluations d'un certain niveau de notation ou plus
exports.findAllComics_booksByReview = (req, res) => {
    const minRate = req.query.minRate || 4
    ComicsModel.findAll({
        include: {
            model: ReviewModel,
            where: {
                rating: { [Op.gte]: 4 }
            }
        }
    })
    .then((elements)=>{
        const msg = 'La liste des comics_books a bien été récupérée en base de données.'
        res.json({message: msg, data: elements})
    })
    .catch((error) => {
        const msg = 'Une erreur est survenue.'
        res.status(500).json({message: msg})
    })
}
// Trouver tous les comics en utilisant une requête SQL pure
exports.findAllComics_booksByReviewSQL = (req, res) => {
    return sequelize.query('SELECT name, rating FROM `comics_books` LEFT JOIN `reviews` ON `comics_books`.`id` = `reviews`.`comicsId`',
        {
            type: QueryTypes.SELECT
        }
    )
        .then(comics_books => {
            const message = `Il y a ${comics_books.length} comics_books comme résultat de la requête en SQL pur.`
            res.json({ message, data: comics_books })
        })
        .catch(error => {
            const message = `La liste des comics_books n'a pas pu se charger. Reessayez ulterieurement.`
            res.status(500).json({ message, data: error })
        })
}
// Mettre à jour un comics
exports.updateComics = (req, res) => {
    // Modifier le comics en base de données correspondant à l'ID spécifié dans les paramètres
    ComicsModel.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then((comics) => {
        if(comics === null){
            const msg = "Le comics demandé n'existe pas."
            res.json({message: msg})
        } else {
            const msg = "Le comics a bien été modifié."
            res.json({message: msg, data: comics})
        }
    }).catch((error) => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        const msg = "Impossible de mettre à jour le comics."
        res.status(500).json({message: msg})
    })
}
// Supprimer un comics
exports.deleteComics = (req, res) => {
    ComicsModel.findByPk(req.params.id)
        .then(comics => {
            if (comics === null) {
                const message = `Le comics demandé n'existe pas.`
                return res.status(404).json({ message })
            }
            return ComicsModel.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    const message = `Le comics ${comics.name} a bien été supprimé.`
                    res.json({ message, data: comics });
                })
        })
        .catch(error => {
            const message = `Impossible de supprimer le comics.`
            res.status(500).json({ message, data: error })
        })
}
// Créer un comics
exports.createComics = (req, res) => {
    let newComics = req.body;

    ComicsModel.create({
        picture: newComics.picture,
        name: newComics.name,
        description: newComics.description,
        address: newComics.address,
        
    }).then((el) => {
        const msg = 'Un comics a bien été ajouté.'
        res.json({ message: msg, data: el })
    }).catch(error => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        res.status(500).json(error)
    })
}