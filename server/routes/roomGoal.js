const express = require('express')
const router = express.Router()

const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} = require('../controlers/roomGoal')

router.route('/').post(createGoal).get(getGoals)
router.route('/:goalId').delete(deleteGoal).patch(updateGoal)

module.exports = router
