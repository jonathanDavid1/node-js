const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");


Product.belongsTo(Category)
Category.hasMany(Product)

//userId from cart
Cart.belongsTo(User)
User.hasMany(Cart)

//productId from cart

Cart.belongsTo(Product)
Product.hasMany(Cart)


//userId from purchase
Purchase.belongsTo(User)
User.hasMany(Purchase)

//productId from purchase
Purchase.belongsTo(Product)
Product.hasMany(Purchase)


