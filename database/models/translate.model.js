const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Translate = sequelize.define(
    'Translate',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        language: {
            type: DataTypes.ENUM('ua', 'ru', 'en'),
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        originalId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        tableName: 'translates',
    },
)

module.exports = Translate
