const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PSHSchema = new Schema({
    marque: {
        type: String,
        required: true,
        unique: true,
    },
    modele: {
        type: String,
    },
    moteur: {
        type: String,
    },
    date1: {
        type: String,
    },
    date2: {
        type: String,
    },
    ref: {
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

module.exports = PSH = mongoose.model("psh", PSHSchema);
