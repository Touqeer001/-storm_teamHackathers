const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    username: String,
    department: String,
    satisfaction: String,
    enjoy: String,
    email: String,
});

module.exports = mongoose.model('FormData', formDataSchema);
