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
            unique: true,
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
        },
        password: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        timestamps: false,
    },
)

module.exports = User
