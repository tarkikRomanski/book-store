const {productModelToListItemDtoMapper, categoryModelToListItemDtoMapper} = require("../mappers")
const {ProductListItemDto} = require('../dto')

const languages = {
    en: 'en',
    ua: 'ua',
    pl: 'pl'
}

const productMock = {
    id: 6,
    title: 13,
    price: 14,
    categoryId: 2,
    image: 'https://images-na.ssl-images-amazon.com/images/I/418TUrZc0HL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
    createdAt: '2022-03-16T18:30:14.278Z',
    updatedAt: '2022-03-16T18:30:14.278Z',
    category_id: 2,
    Translates: [
        {
            id: 3,
            language: 'en',
            text: 'Atomic Habits',
            originalId: null,
            createdAt: '2022-02-14T18:27:49.418Z',
            updatedAt: '2022-02-14T18:27:49.418Z',
            original_id: null,
            Translates: [
                {
                    id: 4,
                    language: 'ua',
                    text: 'Роздільні звички',
                    originalId: 3,
                    createdAt: '2022-02-14T18:27:49.430Z',
                    updatedAt: '2022-02-14T18:27:49.430Z',
                    original_id: 3
                },
                {
                    id: 5,
                    language: 'pl',
                    text: 'Nawyki atomowe',
                    originalId: 3,
                    createdAt: '2022-02-14T18:27:49.430Z',
                    updatedAt: '2022-02-14T18:27:49.430Z',
                    original_id: 3
                }
            ]
        }
    ],
    Category: {
        id: 2,
        name: 9,
        color: '#903366',
        createdAt: '2022-03-16T20:00:36.658Z',
        updatedAt: '2022-03-16T20:00:39.142Z',
        Translate: {
            id: 9,
            language: 'en',
            text: 'Fiction',
            originalId: null,
            createdAt: '2022-02-14T18:27:49.430Z',
            updatedAt: '2022-02-14T18:27:49.430Z',
            original_id: null,
            Translates: []
        }
    }
}

const expectedCategoryObject = {
    id: 2,
    title: 'Fiction',
    color: '#903366',
}
const expectedEnProductObject = new ProductListItemDto(productMock.id, productMock.price, productMock.Translates[0].text, productMock.image, expectedCategoryObject)
const expectedUaProductObject = new ProductListItemDto(productMock.id, productMock.price, productMock.Translates[0].Translates[0].text, productMock.image, expectedCategoryObject)
const expectedUaProductWithoutCategoryObject = new ProductListItemDto(productMock.id, productMock.price, productMock.Translates[0].Translates[0].text, productMock.image)
const expectedPlProductObject = new ProductListItemDto(productMock.id, productMock.price, productMock.Translates[0].Translates[1].text, productMock.image, expectedCategoryObject)

jest.mock('../mappers/products/category-model-to-list-item-dto.mapper', () => {
    return jest.fn(() => expectedCategoryObject)
})

describe('Test productModelToListItemDtoMapper', () => {
    test('should return en version by default', () => {
        const result = productModelToListItemDtoMapper(productMock)

        expect(result).toStrictEqual(expectedEnProductObject)
        expect(categoryModelToListItemDtoMapper).toBeCalledWith(productMock.Category, null)
    })

    test('should return en version', () => {
        const result = productModelToListItemDtoMapper(productMock, languages.en)

        expect(result).toStrictEqual(expectedEnProductObject)
        expect(categoryModelToListItemDtoMapper).toBeCalledWith(productMock.Category, languages.en)
    })

    test('should return ua version', () => {
        const result = productModelToListItemDtoMapper(productMock, languages.ua)

        expect(result).toStrictEqual(expectedUaProductObject)
        expect(categoryModelToListItemDtoMapper).toBeCalledWith(productMock.Category, languages.ua)
    })

    test('should return ua version without category', () => {
        const result = productModelToListItemDtoMapper({
            ...productMock,
            Category: null
        }, languages.ua)

        expect(result).toStrictEqual(expectedUaProductWithoutCategoryObject)
        expect(categoryModelToListItemDtoMapper).not.toBeCalledWith(productMock.Category, languages.ua)
    })

    test('should return pl version', () => {
        const result = productModelToListItemDtoMapper(productMock, languages.pl)

        expect(result).toStrictEqual(expectedPlProductObject)
        expect(categoryModelToListItemDtoMapper).toBeCalledWith(productMock.Category, languages.pl)
    })

    test('should return default version because right version is not exist', () => {
        const result = productModelToListItemDtoMapper(productMock, 'fail')

        expect(result).toStrictEqual(expectedEnProductObject)
        expect(categoryModelToListItemDtoMapper).toBeCalledWith(productMock.Category, 'fail')
    })

    test('should throw error about Translates', () => {
        try {
            productModelToListItemDtoMapper({
                ...productMock,
                Translates: []
            })
        } catch (e) {
            expect(e).toStrictEqual(new Error('Product model should contain `Translates` field. Maybe you forgot to add `include: [Translate]` to request'))
        }
    })
})
