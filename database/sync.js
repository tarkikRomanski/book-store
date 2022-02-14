const models = require('./models')

;(
    async () => {
        await models.User.sync()
        await models.Translate.sync()
        await models.Attribute.sync()
        await models.Category.sync()
        await models.Product.sync()
        await models.AttributeValue.sync()
        await models.Order.sync()
        await models.Stock.sync()
    }
)()
