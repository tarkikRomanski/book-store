const {ProductListItemDto} = require("../../dto");

function productModelToListItemDtoMapper(product, language = null) {
    if (product.Translate === undefined) {
        throw new Error('Product model should contain `Translate` field. Maybe you forgot to add `include: [Translate]` to request')
    }

    let title = product.Translate.text

    if (language && language !== 'en') {
        const translate = product.Translate.Translates.find((item) => item.language === language)

        if (translate) {
            title = `title: ${translate.text}`
        }
    }

    return new ProductListItemDto(
        product.id,
        product.price,
        title,
        product.image,
    )
}

module.exports = productModelToListItemDtoMapper
