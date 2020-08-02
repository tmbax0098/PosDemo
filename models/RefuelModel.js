const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Refuel = new Schema({
    pumpId: {type: Number, required: true, default: 0},
    date: {type: Date, default: Date.now},
    consume: {type: Number, required: true, default: 0},
    price: {type: Number, required: true, default: 0},
    unit: {type: Number, required: true, default: 0},
    finish: {type: Boolean, default: false},
    traking: {type: String, default: null},
});

module.exports = mongoose.model("RefuelModel", Refuel);