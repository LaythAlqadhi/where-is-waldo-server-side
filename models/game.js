const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  startTime: {
    type: Number,
    default: () => Date.now()
  },
  elapsedTime: String,
  name: String,
  characters: [
    {
      name: {
        type: String,
        required: true
      },
      coordinates: {
        x: {
          type: Number,
          required: true
        },
        y: {
          type: Number,
          required: true
        }
      },
    }
  ]
});

gameSchema.pre('save', function (next) {
  if (this.characters && this.characters.length === 0) {
    const elapsedTime = Date.now() - this.startTime;

    this.elapsedTime = new Date(elapsedTime).toISOString().substr(11, 8);
  }

  next();
})

module.exports = mongoose.model('Game', gameSchema);