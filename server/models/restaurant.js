const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: String,
    location: String,
    rating: String,
    pricing: String
});

module.exports = mongoose.model('Restaurant', RestaurantSchema,'restaurants');