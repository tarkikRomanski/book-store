const {
    createProductController,
    getProductListController,
} = require('../controllers/products')

function initProductRoutes(app) {
    app.post('/products', createProductController)

    app.get('/products', getProductListController)
}

module.exports = initProductRoutes
