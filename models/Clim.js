const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClimSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true,
    },
    marque: {
        type: String,
        required: true,
        unique: true,
    },
    modele: {
        type: String,
    },
    date1: {
        type: String,
    },
    _ref: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
    },
});

module.exports = Clim = mongoose.model("clim", ClimSchema);
