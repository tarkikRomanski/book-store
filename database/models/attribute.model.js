const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Attribute = sequelize.define(
    'Attribute',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        isPrimary: {
            type: DataTypes.BOOLEAN,
            default: false,
            field: 'is_primary',
        },
    },
    {
        tableName: 'attributes',
    },
)

module.exports = Attribute
