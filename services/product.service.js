const translateService = require("./translate.service")
const { Product } = require("../database/models")

async function create(title, price, imageUrl, categoryId) {
    const translateResult = await translateService.create(title)

    return Product.create({
        title: translateResult.en,
        price,
        image: imageUrl,
        categoryId,
    })
}

module.exports = {
    create,
}
