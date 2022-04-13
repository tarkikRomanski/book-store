const { productService, translateService } = require("../services")

const title = {
        en: 'Test title',
        ua: 'Тестовий заголок'
    },
    price = 42.14,
    imageUrl = 'https://images-na.ssl-images-amazon.com/images/I/51UlKuVWViL._SX324_BO1,204,203,200_.jpg',
    categoryId = undefined

jest.mock('../services/translate.service', () => {
    return {
        create: jest.fn(() => ({
            en: 0,
            ua: 1,
        })
        )
    }
})

jest.mock('../database/models/product.model', () => {
    const originalModule = jest.requireActual('../database/models/product.model')

    return {
        ...originalModule,
        create: jest.fn(() => {
            return {
                id: 0,
                title: 0,
                price,
                image: imageUrl,
                categoryId: null,
                updatedAt: '2022-04-13T17:38:04.478Z',
                createdAt: '2022-04-13T17:38:04.478Z'
            }
        })
    }
})

describe('Product service tests:', () => {
    test('create an ew product', async () => {
        const result = await productService.create(title, price, imageUrl, categoryId)

        expect(translateService.create).toBeCalledTimes(1)
        expect(translateService.create).toBeCalledWith(title)
    })
})
