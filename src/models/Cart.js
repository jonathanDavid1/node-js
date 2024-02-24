const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('cart', {
    //userId
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    }
    //productId
});

module.exports = Cart;      