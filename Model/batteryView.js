const mongoose = require('mongoose')
const { Schema } = mongoose


var tableschema = new Schema({
    SoC: {
        type: Number,
        trim: true
    },
    voltage: {
        type: Number,
        trim: true
    },
    current: {
        type: Number,
        trim: true
    },
    temperature: {
        type: Number,
        trim: true
    },
    timestamp:
        { type: String, required: true }

});

var accessTable = mongoose.model('sensor_data', tableschema, 'sensor_data');
module.exports = accessTable;