const { getAll, create, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');



const routerUser = express.Router();

//Estatic Routes
routerUser.route('/')
  .get(verifyJWT, getAll)
  .get(getAll)
  .post(create);

  //Dinamic Routes
routerUser.route('/login')
  .post(login)

routerUser.route('/:id')
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = routerUser;