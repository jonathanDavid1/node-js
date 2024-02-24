//Get post delete put
const request = require("supertest")
const app = require("../app")
const User = require("../models/User")
const Product = require("../models/Product")



const product = {
    userId: User.id,
    quantity: 1,
    productId: Product.id
}
const URL_BASE_USERS = '/users/login'
const URL_BASE = '/cart'





