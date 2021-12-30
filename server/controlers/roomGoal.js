const RoomGoal = require('../models/roomGoal')
const { BadRequestError } = require('../errors')

const getGoals = async (req, res) => {
  try {
    const goals = await RoomGoal.find({ room: req.room })
    return res.status(200).json(goals)
  } catch (error) {
    throw new BadRequestError('please report the issue "unexpected roomId"')
  }
  res.send(id)
}

const createGoal = async (req, res) => {
  try {
    await RoomGoal.create({
      ...req.body,
      room: req.room,
      creator: req.userName,
    })
    return res.status(201).json({ msg: 'goal has been created' })
  } catch (error) {
    throw new BadRequestError('sent data was not valid for creating chalange')
  }
}

const updateGoal = async (req, res) => {
  const goal = await RoomGoal.findOneAndUpdate(
    {
      _id: req.params.goalId,
      creator: req.userName,
    },
    { ...req.body, room: req.room }, //without room: req.room one can
    //change that id andmove goal to any room by using that room id
    //one can still change gift their goal to other user but that's a
    //feature not a bag but getting user id is hard
  )
  if (goal) {
    return res.status(200).json({ msg: 'goal has been updated' })
  } else {
    return res.status(400).json({
      msg: 'request wasnt made by creator or there is no goal with that id',
    })
  }
}

const deleteGoal = async (req, res) => {
  const admin = await RoomGoal.findOneAndDelete({
    _id: req.params.goalId,
    admins: req.userName,
  })
  const creator = await RoomGoal.findOneAndDelete({
    _id: req.params.goalId,
    creator: req.userName,
  })
  if (admin || creator) {
    return res.status(200).json({ msg: 'goal has been deleted' })
  } else {
    return res.status(400).json({
      msg:
        'user dont have permission to delete the goal or goal is already deleted',
    })
  }
}

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
}
