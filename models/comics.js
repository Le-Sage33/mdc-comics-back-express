module.exports = (sequelize, DataTypes) => {
    // Le modèle Comics_books est défini en utilisant sequelize.define.
    return sequelize.define('Comics_books', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // Le champ name est requis, unique et ne peut pas être vide.
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le Nom est déjà pris...'
            },
            validate: {
                notEmpty: {
                  msg: 'Ce champ ne peut pas être vide!'
                }
              }
        },
        picture: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        address: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
};