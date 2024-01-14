const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    countWords: {
        type: Number
    },
    countUniqueWords: {
        type: Number
    },
    getTopKWords: {
        type: Number,
    }
}, { timestamps: true });

const Analysis = mongoose.model("Analysis", analysisSchema);

module.exports = Analysis;