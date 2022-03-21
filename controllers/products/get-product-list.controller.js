const {
    Product,
    Translate, Category,
} = require('../../database/models')
const {
    responseService,
} = require('../../services')
const {
    productModelToListItemDtoMapper,
} = require('../../mappers/products')

async function getProductListController(req, res) {
    try {
        const productList = await Product.findAll({
            include: [
                {
                    model: Translate,
                    include: Translate,
                },
                {
                    model: Category,
                    include: {
                        model: Translate,
                        include: Translate,
                    }
                },
            ],
        })

        res.render(
          'product-list',
          {
              productList: productList.map((product) => productModelToListItemDtoMapper(product, req.language))
          },
      )
    } catch (e) {
        responseService.sendErrorResponse(
            res,
            e.message,
        )
    }
}

module.exports = getProductListController
