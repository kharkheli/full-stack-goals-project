const { UnauthenticatedError } = require('../errors')
const Room = require('../models/room')

const roomMember = async (req, res, next) => {
  const room = await Room.findOne({ _id: req.params.id, members: req.userName })
  if (room) {
    req.room = req.params.id
    next()
  } else {
    throw new UnauthenticatedError("you aren't member of this group")
  }
}

module.exports = roomMember
