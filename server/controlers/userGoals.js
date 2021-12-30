const UserGoal = require('../models/userGoal')
const { BadRequestError } = require('../errors')

const getGoals = async (req, res) => {
  try {
    const goals = await UserGoal.find({ createdBy: req.userId })
    return res.status(200).json(goals)
  } catch (error) {
    throw new BadRequestError('please report the issue "unexpected userId"')
  }
}

const createGoal = async (req, res) => {
  await UserGoal.create({ ...req.body, createdBy: req.userId })
  return res.status(201).json({ msg: 'goal has been created' })
}

const updateGoal = async (req, res) => {
  const goalId = req.params.id
  const newGoal = await UserGoal.findByIdAndUpdate({ _id: goalId }, req.body, {
    new: true,
    runValidators: true,
  })
  return res.status(200).json(newGoal)
}

const deleteGoal = async (req, res) => {
  const goalId = req.params.id
  await UserGoal.findByIdAndDelete({ _id: goalId })
  return res.status(200).json({ msg: 'Goal deleted' })
}

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
}
