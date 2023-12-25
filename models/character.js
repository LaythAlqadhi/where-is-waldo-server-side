const mongoose = require('mongoose');

const { Schema } = mongoose;

const characterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  coordinates: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
});

module.exports = mongoose.model('Character', characterSchema);
