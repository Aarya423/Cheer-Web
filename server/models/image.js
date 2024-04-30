const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    URL:{type: String, required: true}
});
const Image = mongoose.model('Image', imageSchema);
module.exports = Image;