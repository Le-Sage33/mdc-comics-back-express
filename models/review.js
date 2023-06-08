// ce modèle Review permet de représenter les avis avec leur contenu et leur évaluation numérique.
module.exports = (sequelize, DataTypes) => {
    // Le modèle Review est défini en utilisant sequelize.define
    return sequelize.define('Review', {
        // La colonne id est définie comme une clé primaire qui s'auto-incrémente.
        id: {type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // La colonne content est de type STRING (chaîne de caractères) et est requise (non nulle).
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // La colonne rating est de type INTEGER (nombre entier) et est requise.
        // Elle est également soumise à une validation qui vérifie si la valeur se situe entre 1 et 5 (inclus).
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            }
        }
    })
}
// Le modèle est ensuite retourné pour être utilisé dans d'autres fichiers.