const mongoose = require('mongoose');

// define Flower schema
const flowerSchema = new mongoose.Schema({
    flowerId: {
        type: Number,
        required: true
    },
    flowerName: {
      type: String,
      required: true,
      maxlength: 20
    },
    pricePerStem: {
      type: Number,
      required: true,
      min: 1,
      max: 10000
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 10000
    },
  },
{collection:"Flowers"}
);

const Flowers = mongoose.model('Flowers', flowerSchema);

module.exports = Flowers;