const request = require('supertest')
const assert = require('assert')

const {app} = require('../../app')
const {checkProductListStructure} = require('../utils/checkProductListStructure')
const {RESPONSE_TYPE_SUCCESS} = require('../../configs/response-types')
const {checkProductListTypes} = require('../utils/checkProductListTypes')
const {productService} = require("../../services");
const {clearProductTable} = require("../utils/clearProductTable")

const PRODUCT_TITLE = {
    en: 'Test product',
    ua: 'Тестовий продукт'
}
const PRODUCT_PRICE = 42.14
const PRODUCT_IMAGE = 'https://images-na.ssl-images-amazon.com/images/I/51UlKuVWViL._SX324_BO1,204,203,200_.jpg'
const PRODUCT_CATEGORY = undefined

describe('Test of getProductListController:', () => {
    before(async () => {
        await clearProductTable()
        await productService.create(PRODUCT_TITLE, PRODUCT_PRICE, PRODUCT_IMAGE, PRODUCT_CATEGORY)
        await productService.create(PRODUCT_TITLE, PRODUCT_PRICE, PRODUCT_IMAGE, PRODUCT_CATEGORY)
    })

    after(async () => {
        await clearProductTable()
    })

    it('should contain right response', function (done) {
        request(app)
            .get('/products')
            .expect(200)
            .expect(function (response) {
                assert.notEqual(undefined, response.body.data.productList, 'productList property is not exist')
                assert.equal(RESPONSE_TYPE_SUCCESS, response.body.type, `response type should be ${RESPONSE_TYPE_SUCCESS}`)
            })
            .end(done)
    })

    it('should contain right the product list structure', function (done) {
        request(app)
            .get('/products')
            .expect(200)
            .expect(function (response) {
                const {productList} = response.body.data

                assert.ok(Array.isArray(productList), 'productList should be array')

                for (let i = 0; i < productList.length; i++) {
                    checkProductListStructure(productList[i])
                }
            })
            .end(done)
    })

    it('should contain right the product list type of the values', function (done) {
        request(app)
            .get('/products')
            .expect(200)
            .expect(function (response) {
                const {productList} = response.body.data

                for (let i = 0; i < productList.length; i++) {
                    checkProductListTypes(productList[i])
                }
            })
            .end(done)
    })

    it('should translation work correct', function (done) {
        request(app)
            .get('/products')
            .expect(200)
            .expect(function (response) {
                const {productList} = response.body.data

                for (let i = 0; i < productList.length; i++) {
                    assert.equal(productList[i].title, PRODUCT_TITLE.en, `Wrong localisation. el: ${i}`)
                }
            })

        request(app)
            .get('/products')
            .set('Local', 'ua')
            .expect(200)
            .expect(function (response) {
                const {productList} = response.body.data

                for (let i = 0; i < productList.length; i++) {
                    assert.equal(productList[i].title, PRODUCT_TITLE.ua, `Wrong localisation. el: ${i}`)
                }
            })
            .end(done)
    })
})
