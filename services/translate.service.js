const {
    Translate,
} = require('../database/models');

async function create(translates) {
    if (typeof translates !== typeof {}) {
        const originalTranslate = await Translate.create({
            language: 'en',
            text: translates,
        })

        return {
            en: originalTranslate.id,
            ua: null,
        }
    }

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
