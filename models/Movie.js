const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: {
        type: Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: [true, 'Title alanı zorunludur.'],
        maxlength: 15,
        minlength:1
    },
    category: {
        type: String,
        maxlength: 30,
        minlength: 1
    },
    country: {
        type: String
    },
    year: {
        type: Number,
        max: 2040,
        min: 1900
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);