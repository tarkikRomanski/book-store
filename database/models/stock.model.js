const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Stock = sequelize.define(
    'Stock',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'product_id',
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        barCode: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'bar_code',
        }
    },
    {
        tableName: 'stock',
    },
)

module.exports = Stock
