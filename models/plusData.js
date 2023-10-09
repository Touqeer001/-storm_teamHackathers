const mongoose = require("mongoose");

const PlusDataSchema = new mongoose.Schema({
    plusSurvey: String,
    plusSurvey2: String,
    plusSurvey3: String,
});

module.exports = mongoose.model("PlusData", PlusDataSchema);
