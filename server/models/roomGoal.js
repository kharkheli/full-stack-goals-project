const mongoose = require('mongoose')

const roomGoalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: [true, 'please provide name'],
    },
    description: {
      type: String,
      maxlength: 300,
      default: 'Goal has no description',
    },
    creator: {
      type: String,
      required: [true, 'you need to provide user id'],
    },
    room: {
      type: mongoose.Types.ObjectId,
      ref: 'room',
      required: [true, 'you need to provide room id'],
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('room-goal', roomGoalSchema)
