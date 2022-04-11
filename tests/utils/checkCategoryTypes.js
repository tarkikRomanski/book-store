const assert = require('assert')

function checkCategoryTypes(product) {
    assert.ok(Number.isInteger(product.id), 'Id field of the category object has wrong type')
    assert.ok(typeof product.color === typeof '', 'Color field of the category object has wrong type')
    assert.ok(typeof product.title === typeof '', 'Title field of the category object has wrong type')

    return true
}

module.exports = {
    checkCategoryTypes
}
