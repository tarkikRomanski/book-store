const {
    Translate,
} = require('../database/models');

async function create(translates) {
    const originalTranslate = await Translate.create({
        language: 'en',
        text: translates.en,
    })

    const uaResult = await Translate.create({
        language: 'ua',
        text: translates.ua,
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