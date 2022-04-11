const request = require('supertest')
const assert = require('assert')

const { app } = require('../../app')
const { checkProductListStructure } = require('../utils/checkProductListStructure')
const { RESPONSE_TYPE_SUCCESS } = require('../../configs/response-types')
const { checkProductListTypes } = require('../utils/checkProductListTypes')

it('getProductListController: Should contain right response', function (done) {
  request(app)
    .get('/products')
    .expect(200)
    .expect(function (response) {
        assert.notEqual(undefined, response.body.data.productList, 'productList property is not exist')
        assert.equal(RESPONSE_TYPE_SUCCESS, response.body.type, `response type should be ${RESPONSE_TYPE_SUCCESS}`)
      })
    .end(done)
})

it('getProductListController: Should contain right the product list structure', function (done) {
    request(app)
      .get('/products')
      .expect(200)
      .expect(function (response) {
            const { productList } = response.body.data

            assert.ok(Array.isArray(productList), 'productList should be array')

            for (let i = 0; i < productList.length; i++) {
                checkProductListStructure(productList[i])
            }
        })
      .end(done)
  })

  it('getProductListController: Should contain right the product list type of the values', function (done) {
    request(app)
      .get('/products')
      .expect(200)
      .expect(function (response) {
            const { productList } = response.body.data

            for (let i = 0; i < productList.length; i++) {
                checkProductListTypes(productList[i])
            }
        })
      .end(done)
  })