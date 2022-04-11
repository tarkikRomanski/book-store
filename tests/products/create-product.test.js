const request = require('supertest')
const assert = require('assert')

const { app } = require('../../app')
const { Product } = require('../../database/models')

it('createProductController: Should create a product', function (done) {
    request(app)
        .post('/products')
        .send({
            title: {
                en: "Test title",
                ua: "Тестовий"
            },
            price: 12.5,
            imageUrl: "https://nodejsdev.ru/nodejs-white.svg",
        })
        .expect(201)
        .expect(async function (response) {
            const product = await Product.findByPk(response.body.id)

            assert.notEqual(null, product, 'Product should be created')
        })
        .end(done)
  })