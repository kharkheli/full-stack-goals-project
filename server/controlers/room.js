const Room = require('../models/room')
const User = require('../models/user')
const { UnauthenticatedError } = require('../errors')
const { BadRequestError } = require('../errors')

const createRoom = async (req, res) => {
  const room = {
    createdBy: req.userName,
    admins: [req.userName],
    members: [req.userName],
  }
  room.name = req.body.name
  room.description = req.body.description || 'room has no description'
  room.password = req.body.password
  const newRoom = await Room.create({ ...room })
  return res.status(200).json({ msg: 'room has been created' })
}

const addMember = async (req, res) => {
  const { userName, roomId, password } = req.body
  const user = await User.findOne({ userName: userName })
  if (user) {
    const room = await Room.findById({ _id: roomId })
    if (
      room.members.includes(req.userName) ||
      !room.password ||
      room.password === password
    ) {
      await Room.findOneAndUpdate(
        { _id: roomId },
        {
          $addToSet: { members: userName },
        },
      )
      return res.status(200).json({ msg: 'member has been added' })
    } else {
      throw new BadRequestError('wrong password')
    }
  } else {
    throw new BadRequestError('wrong username')
  }
}

const addAdmin = async (req, res) => {
  const { userName, roomId, roomName } = req.body
  const { admins } = await Room.findById({ _id: roomId }).select('admins')
  if (admins.includes(req.userName)) {
    await Room.findByIdAndUpdate(
      { _id: roomId },
      {
        $addToSet: { admins: userName },
      },
    )
    return res.status(200).json({ msg: 'admin has been added' })
  } else {
    throw new UnauthenticatedError('Only admin can add amins')
  }
}

const removeMember = async (req, res) => {
  const { userName, roomId } = req.body
  console.log(req.body)
  const room = await Room.findById({ _id: roomId }).select(
    'createdBy admins members',
  )
  if (userName === room.createdBy) {
    throw new BadRequestError(
      'Owner Cannot be removed from the room but he can delete the room',
    )
  } else if (userName === req.userName) {
    await Room.findByIdAndUpdate(
      { _id: roomId },
      { $pull: { admins: userName, members: userName } },
    )
    return res.status(200).json({ msg: 'you have been removed from the room' })
  } else if (room.admins.includes(req.userName)) {
    await Room.findByIdAndUpdate(
      { _id: roomId },
      { $pull: { admins: userName, members: userName } },
    )
    return res.status(200).json({ msg: 'member has been removed' })
  } else if (!room.admins.includes(req.userName)) {
    throw new UnauthenticatedError('only admins can remove member')
  }
  throw new BadRequestError('something went wrong please try again')
}

const deleteRoom = async (req, res) => {
  const { id: roomId } = req.params
  const room = await Room.findOneAndDelete({
    _id: roomId,
    createdBy: req.userName,
  }).select('members')
  if (room) {
    return res.status(200).json({ msg: 'room has been deleted' })
  }
  //if room doesn't exist this error will also pop up
  //main goal is to restrict unautorized actions otherwise correct
  // room id will be provided
  throw new UnauthenticatedError('Only room owner can delete the room')
}

const getAllUserRooms = async (req, res) => {
  let rooms = await Room.find({ members: req.userName }).select(
    'createdBy name',
  )
  rooms = rooms.map((room) => {
    if (room.createdBy === req.userName) {
      room.createdBy = true
      return room
    } else {
      room.createdBy = false
      return room
    }
  })
  return res.status(200).json(rooms)
}

const getAllRooms = async (req, res) => {
  const limit = Number(req.query.limit) || 10
  const skip = ((Number(req.query.page) || 1) - 1) * limit
  let rooms = await Room.find({})
    .limit(limit)
    .skip(skip)
    .select('name password members createdBy description')

  rooms = rooms.map((room) => {
    if (room.password) {
      room.password = true
      return room
    }
    return room
  })
  return res.status(200).json(rooms)
}

const getRoom = async (req, res) => {
  const { id } = req.params
  let room = await Room.findById({ _id: id })
  if (room.password) {
    room.password = true
  }
  return res.status(200).json(room)
}

module.exports = {
  createRoom,
  addAdmin,
  addMember,
  removeMember,
  deleteRoom,
  getAllRooms,
  getAllUserRooms,
  getRoom,
}
