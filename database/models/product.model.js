const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Product = sequelize.define(
    'Product',
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
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            fieldName: 'category_id'
        },
        image: {
            type: DataTypes.STRING(150),
            allowNull: true,
        }
    },
    {
        tableName: 'products',
    },
)

module.exports = Product
