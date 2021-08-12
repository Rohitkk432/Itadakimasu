const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomcatSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Customcat', CustomcatSchema , 'Customcats');