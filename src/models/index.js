const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");


Product.belongsTo(Category)
Category.hasMany(Product)

//userId from cart
Cart.belongsTo(User)
User.hasMany(Cart)

//productId from cart

Cart.belongsTo(Product)
Product.hasMany(Cart)
