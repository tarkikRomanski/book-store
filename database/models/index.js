const Attribute = require('./attribute.model')
const AttributeValue = require('./attribute-value.model')
const Category = require('./category.model')
const Order = require('./order.model')
const Product = require('./product.model')
const Stock = require('./stock.model')
const Translate = require('./translate.model')
const User = require('./user.model')

// attribute-values - product M2O
Product.hasMany(AttributeValue, { foreignKey: 'product_id' })
AttributeValue.belongsTo(Product, { foreignKey: 'product_id' })
//

// product - stock O2O
Product.hasOne(Stock, { foreignKey: 'product_id' })
Stock.belongsTo(Product, { foreignKey: 'product_id' })
//

// product - translate O2M
Product.hasMany(Translate, { foreignKey: 'id', sourceKey: 'title' })
Translate.belongsTo(Product, { foreignKey: 'id' })
//

// translate - translate O2M
Translate.hasMany(Translate, { foreignKey: 'original_id' })
//

// category - product O2M
Category.hasMany(Product, { foreignKey: 'category_id' })
Product.belongsTo(Category, { foreignKey: 'category_id' })
//

// product - orders M2M
Product.hasMany(Order)
Order.belongsTo(Product)
//

// category - translate M2O
Translate.hasMany(Category, { foreignKey: 'name' })
Category.belongsTo(Translate, { foreignKey: 'name' })
//

// attribute - translate M2O
Translate.hasMany(Attribute, { foreignKey: 'title' })
Attribute.belongsTo(Translate, { foreignKey: 'title' })
//

// attribute - attribute-value O2M
Attribute.hasMany(AttributeValue, { foreignKey: 'attribute_id' })
AttributeValue.belongsTo(Attribute, { foreignKey: 'attribute_id' })
//

// orders - users M2O
User.hasMany(Order, { foreignKey: 'user_id' })
Order.belongsTo(User, { foreignKey: 'user_id' })
//

module.exports = {
    Attribute,
    AttributeValue,
    Category,
    Order,
    Product,
    Stock,
    Translate,
    User,
}
