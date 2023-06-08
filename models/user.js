// La variable userRoles est un tableau contenant les différents rôles possibles pour un utilisateur.
const userRoles = ['user', 'admin']
// Le modèle User est défini en utilisant sequelize.define.
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      // La colonne id est définie comme une clé primaire qui s'auto-incrémente.
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // La colonne username est de type STRING (chaîne de caractères) et est requise.
      // Elle doit être unique, sinon une erreur est renvoyée avec un message spécifique.
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "Le nom d'utilisateur est déjà pris."
        }
      },
      // La colonne password est de type STRING (chaîne de caractères) et est requise.
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // La colonne roles est de type STRING (chaîne de caractères) et a une valeur par défaut 'user'.
      // Un setter est utilisé pour stocker les rôles en tant que chaîne de caractères séparée par des virgules, et un getter est utilisé pour récupérer les rôles sous forme de tableau.
      // Une validation personnalisée est ajoutée pour s'assurer que les rôles fournis sont valides.
      // Ils doivent appartenir à la liste prédéfinie userRoles.
      roles: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        set(roles) {
          this.setDataValue('roles', roles.join());
        },
        get() {
          return this.getDataValue('roles').split(',');
        },
        validate: {
          areRolesValid(roles){
            if(!roles){
              throw new Error('Un utilisateur doit avoir au moins un rôle')
            }
            roles.split(',').forEach(role => {
              if(!userRoles.includes(role)){
                throw new Error(`Les rôles d'un utilisateur doivent appartenir à la liste suivante : ${userRoles}`)
              }
            })
          }
        }
      }
    },
    // Le modèle est ensuite retourné pour être utilisé dans d'autres fichiers.
    // Il a également des options supplémentaires,telles que les horodatages de création (timestamps) et la portée (scopes) pour exclure le champ password dans certaines requêtes.
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        scopes: {
          withoutPassword: {
              attributes: { exclude: ['password'] },
          }
      }
    },
    )
  };