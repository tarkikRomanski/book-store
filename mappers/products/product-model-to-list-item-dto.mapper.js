const {ProductListItemDto} = require("../../dto");
const categoryModelToListItemDtoMapper = require("./category-model-to-list-item-dto.mapper");

function productModelToListItemDtoMapper(product, language = null) {
    if (product.Translates === undefined || !product.Translates.length) {
        throw new Error('Product model should contain `Translates` field. Maybe you forgot to add `include: [Translate]` to request')
    }

    const basicTranslate = product.Translates[0]

    let title = basicTranslate.text

    if (language && language !== 'en') {
        const translate = basicTranslate.Translates.find((item) => item.language === language)

        if (translate) {
            title = translate.text
        }
    }

    return new ProductListItemDto(
        product.id,
        product.price,
        title,
        product.image,
        product.Category ? categoryModelToListItemDtoMapper(product.Category, language) : null
    )
}

module.exports = productModelToListItemDtoMapper
