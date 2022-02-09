const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Category = sequelize.define(
    'Category',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [3, 50],
            }
        },
        color: {
            type: DataTypes.STRING(7),
            allowNull: true,
            validate: {
                is: /#([0-9A-F]){6}/i
            }
        },
    },
    {
        tableName: 'category',
    },
)

module.exports = Category
