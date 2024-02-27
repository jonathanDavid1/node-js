const request = require("supertest")
const app = require("../app")
const Category = require("../models/Category")

require("../models")

const URL_BASE = '/products'
const URL_BASE_USER = '/users/login'
let TOKEN
let product
let category
let productId

beforeAll(async () => {
  const user = {
    email: "fernando@gmail.com",
    password: 'fernando1234',
  }
  const res = await request(app)
    .post(URL_BASE_USER)
    .send(user)

  TOKEN = res.body.token

  const categoryBody = {
    name: "smartphones"
  }

  category = await Category.create(categoryBody)

  product = {
    title: "pixel 7A",
    description: "lroem10",
    price: 20.30,
    categoryId: category.id
  }

})

test("POST -> 'URL_BASE', should resturn status code 201 and res.body.title = product.title", async () => {

  const res = await request(app)
    .post(URL_BASE)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`)

  productId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(product.title)

})

test("GET -> 'URL_BASE', should resturn status code 200 and res.body.legnth = 1", async () => {

  const res = await request(app)
    .get(URL_BASE)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].category).toBeDefined()
  expect(res.body[0].category.id).toBe(category.id)
})

test("GET ONE -> 'URL_BASE/:id', should resturn status code 200 and res.body.title = product.title", async () => {

  const res = await request(app)
    .get(`${URL_BASE}/${productId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(product.title)
  expect(res.body.category).toBeDefined()
  expect(res.body.category.id).toBe(category.id)
})


test("PUT -> 'URL_BASE/:id', should resturn status code 200 and res.body.title = productUpdate.title", async () => {

  const productUpdate = {
    title: "Samsung Qled",
  }

  const res = await request(app)
    .put(`${URL_BASE}/${productId}`)
    .send(productUpdate)
    .set("Authorization", `Bearer ${TOKEN}`)


  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(productUpdate.title)

})


test("DELETE -> 'URL_BASE/:id', should resturn status code 204", async () => {

  const res = await request(app)
    .delete(`${URL_BASE}/${productId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

  expect(res.status).toBe(204)

  await category.destroy()
})
