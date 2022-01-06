const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('type', {
        /* id: {
            
            primaryKey: true  
        },
 */
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}