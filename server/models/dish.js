const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
    name: String,
    showprice: Number,
    baseprice: Number,
    description: String,
    category: String,
    subcategory: String,
    restaurantId: String,
    customcatId1: String,
    customcatId2: String,
});

module.exports = mongoose.model('Dish', DishSchema,"dishs");