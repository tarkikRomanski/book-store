const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DATABASE_URL,
)

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error))

module.exports = {
    sequelize,
}
