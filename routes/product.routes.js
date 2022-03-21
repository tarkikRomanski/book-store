const {
    createProductController,
    getProductListController,
    showCreateProductController,
} = require('../controllers/products')

function initProductRoutes(app) {
    app.post('/products', createProductController)

    app.get('/products', getProductListController)

    app.get('/create-product', showCreateProductController)
}

module.exports = initProductRoutes
