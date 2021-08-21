const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: String,
    dishId: String,
    customizationId1: String,
    customizationId2: String,
    showprice: String,
    finalprice: String,
    status: String
});

module.exports = mongoose.model('Order', OrderSchema, 'orders');