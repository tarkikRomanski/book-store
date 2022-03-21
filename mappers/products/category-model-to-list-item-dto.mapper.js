const {CategoryListItemDto} = require("../../dto");

function categoryModelToListItemDtoMapper(category, language = null) {
    if (category.Translate === undefined) {
        throw new Error('Product model should contain `Translates` field. Maybe you forgot to add `include: [Translate]` to request')
    }

    const basicTranslate = category.Translate

    let title = basicTranslate.text

    if (language && language !== 'en') {
        const translate = basicTranslate.Translate.find((item) => item.language === language)

        if (translate) {
            title = translate.text
        }
    }

    return new CategoryListItemDto(
        category.id,
        title,
        category.color,
    )
}

module.exports = categoryModelToListItemDtoMapper
