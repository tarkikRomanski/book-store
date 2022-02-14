const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const AttributeValue = sequelize.define(
    'AttributeValue',
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
        attributeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'attribute_id',
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: 'attribute_values',
    },
)

module.exports = AttributeValue
