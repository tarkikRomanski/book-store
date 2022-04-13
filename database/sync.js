const User = require("./models/user.model")
const Category = require("./models/category.model")
const Product = require("./models/product.model")
const Translate = require("./models/translate.model")
const Attribute = require("./models/attribute.model")
const AttributeValue = require("./models/attribute-value.model")
const Order = require("./models/order.model")
const Stock = require("./models/stock.model")

;(
    async () => {
        await User.sync()
        await Category.sync()
        await Product.sync()
        await Translate.sync()
        await Attribute.sync()
        await AttributeValue.sync()
        await Order.sync()
        await Stock.sync()
    }
)()
