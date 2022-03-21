const {
    Product,
    Translate,
} = require('../../database/models')
const {
    responseService, translateService,
} = require('../../services')

async function createProductController(req, res) {
    const {
        title,
        price,
        imageUrl,
        categoryId,
    } = req.body

    try {
        const translateResult = await translateService.create(title)

        await Product.create({
            title: translateResult.en,
            price,
            image: imageUrl,
            categoryId,
        })

        res.redirect('/products')

        // responseService.sendSuccessResponse(res, result, 201)
    } catch (e) {
        responseService.sendErrorResponse(res, e.message)
    }
}

module.exports = createProductController
