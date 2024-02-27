const { getAll,create, getOne, remove, update } = require('../controllers/productImg.controllers');
const express = require('express');
const upload = require('../utils/multer');

const routerProductImg = express.Router();

routerProductImg.route('/')
    .get(getAll)
    .post(upload.single('image'), create);

routerProductImg.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerProductImg;