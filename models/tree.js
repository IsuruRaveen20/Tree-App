const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    plantedDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    scientificName: {
        type: String,
        required: true
    },
    family: {
        type: String,
    }
}
)

module.exports = mongoose.model('Tree', treeSchema);