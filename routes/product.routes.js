const {
    createProductController,
} = require('../controllers/products')

function initProductRoutes(app) {
    app.post('/products', createProductController)
}

module.exports = initProductRoutes
