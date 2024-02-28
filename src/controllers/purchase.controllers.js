const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async (req, res) => {
  const userId = req.user.id
  const result = await Purchase.findAll({
    where: { userId }, 
    include:  [
      // Product
      {
        model: Product,
        attributes: { exclude: ["updatedAt", "createdAt"] },
        include: [{
          model: Category,
          attributes: ['name']
        }, {
          model: ProductImg
        }]
      }
    ]
  })
  return res.json(result)
});

const create = catchError(async (req, res) => {
  const userId = req.user.id 
  const cart = await Cart.findAll({
    where: { userId },
    raw: true, //Gracias a esto trae un arreglo de objetos
    attributes: ['quantity', 'userId', 'productId']
  })

 /*  console.log(cart); */

  if (!cart) return res.sendStatus(404)
  const result = await Purchase.bulkCreate(cart)
  if (!result) return res.sendStatus(404)

  await Cart.destroy({ where: { userId } })

  return res.status(201).json(result)

})

module.exports = {
  getAll,
  create
}