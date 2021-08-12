const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomizationSchema = new Schema({
    name: String,
    price: Number,
    customcatId: String
});

module.exports = mongoose.model('Customization', CustomizationSchema,'Customizations');