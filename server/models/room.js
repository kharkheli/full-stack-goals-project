const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 4,
      maxlength: 50,
      required: [true, 'please provide name'],
    },
    description: {
      type: String,
      maxlength: 300,
      default: 'room has no description',
    },
    createdBy: {
      type: String,
    },
    admins: {
      type: Array,
    },
    members: {
      type: Array,
    },
    // this password is not hashed because it's meant to be shared anyway
    // and it is not too private
    password: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('room', RoomSchema)
