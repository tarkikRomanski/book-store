const {
    responseService, productService,
} = require('../../services')

async function createProductController(req, res) {
    const {
        title,
        price,
        imageUrl,
        categoryId,
    } = req.body

    try {
        const result = await productService.create(title, price, imageUrl, categoryId)

        // res.redirect('/products')

        responseService.sendSuccessResponse(res, result, 201)
    } catch (e) {
        responseService.sendErrorResponse(res, e.message)
    }
}

module.exports = createProductController
