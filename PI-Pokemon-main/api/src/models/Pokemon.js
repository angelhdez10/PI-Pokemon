const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
/* module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}; */


module.exports = (sequelize) => {

    sequelize.define('pokemon', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        health: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 50
        },

        strength : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 50
        },
        
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 50
        },

        speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 50
        },

        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 75
        },

        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 25
        },
        
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        created: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }

    }, {
        timestamps: false 
    })
}
