const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [3, 50],
            }
        }
    },
    {
        tableName: 'users',
        timestamps: false,
    },
)

module.exports = User
