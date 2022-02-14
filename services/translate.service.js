const {
    Translate
} = require('../../database/models');

async function create(text) {
    const originalTranslate = await Translate.create({
        language: 'en',
        text: text.en,
    })

    const uaResult = await Translate.create({
        language: 'ua',
        text: text.ua,
        originalId: originalTranslate.id,
    })

    return {
        en: originalTranslate.id,
        ua: uaResult.id,
    }
}

module.exports = {
    create,
}