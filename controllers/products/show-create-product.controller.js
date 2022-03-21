const {Translate, Category} = require("../../database/models");
const {categoryModelToListItemDtoMapper} = require("../../mappers");

async function showCreateProductController(req, res) {
    const categories = await Category.findAll({
        include: [
            {
                model: Translate,
                include: Translate,
            },
        ],
    })

    res.render(
        'create-product',
        {
            categories: categories.map((category) => categoryModelToListItemDtoMapper(category, req.language))
        }
    )
}

module.exports = showCreateProductController

