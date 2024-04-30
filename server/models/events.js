const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    Organization: { type: String, required: true},
    Date: { type: String, required: true },
    Time: { type: String, required: true },
    Location: { type: String, required: true },
    Description: { type: String, required: true }
});
const Event = mongoose.model('Events', eventSchema);
module.exports = Event;