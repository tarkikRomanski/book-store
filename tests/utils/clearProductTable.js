const {Product, Translate} = require("../../database/models")

function clearProductTable() {
    const removingProducts = Product.destroy({ truncate: true })
    const removingTranslates = Translate.destroy({ truncate: true })

    return Promise.all([removingProducts, removingTranslates])
}

module.exports = {
    clearProductTable
}
