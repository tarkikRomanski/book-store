const {
    signUpController,
    signInController,
} = require('../controllers/users')

function initUserRoutes(app) {
    app.post('/sign-up', signUpController)

    app.get('/sign-in', signInController)
}

module.exports = initUserRoutes
