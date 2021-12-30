const { boolean } = require('joi')
const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
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
    completion: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: [true, 'you need to provide user id'],
    },
    private: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('user-goals', goalSchema)
