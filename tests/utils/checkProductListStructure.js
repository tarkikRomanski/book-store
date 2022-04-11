const assert = require('assert')

function checkProductListStructure(product) {
    assert.ok(Object.prototype.hasOwnProperty.call(product, 'category'), `product doesn't have category property`)
    assert.ok(Object.prototype.hasOwnProperty.call(product, 'id'), `product doesn't have id property`)
    assert.ok(Object.prototype.hasOwnProperty.call(product, 'image'), `product doesn't have image property`)
    assert.ok(Object.prototype.hasOwnProperty.call(product, 'price'), `product doesn't have price property`)
    assert.ok(Object.prototype.hasOwnProperty.call(product, 'title'), `product doesn't have title property`)
}

module.exports = {
    checkProductListStructure
}
