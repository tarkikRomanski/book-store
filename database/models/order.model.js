const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Order = sequelize.define(
    'Order',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
            fieldName: 'total_price',
        },
    },
    {
        tableName: 'orders',
    },
)

module.exports = Order
