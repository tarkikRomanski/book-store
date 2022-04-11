const { checkCategoryTypes } = require("./checkCategoryTypes")
const assert = require('assert')

function checkProductListTypes(product) {
    assert.ok(product.category === null || checkCategoryTypes(product.category), 'Category field has wrong type')
    assert.ok(Number.isInteger(product.id), 'Id field has wrong type')
    assert.ok(typeof product.image === typeof '', 'Image field has wrong type')
    assert.ok(typeof product.price === typeof 0, 'Price field has wrong type')
    assert.ok(typeof product.title === typeof '', 'Title field has wrong type')
}

module.exports = {
    checkProductListTypes
}
