const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const holdingsSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        require: true
    },
    shares: {
        type: Number,
        require: true
    },
    purchase_price: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
      }
});

const Holdings = mongoose.model('holdings', holdingsSchema);

module.exports = User;