const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    originalname: {
        type: String,
        unique: true
    },
    filename: {
        type: String,
        unique: true
    },
    path: {
        type: String,
        unique: true
    }
}, { timestamps: true });

const File = mongoose.model("File", fileSchema);

module.exports = File;