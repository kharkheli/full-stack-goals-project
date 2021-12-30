const express = require('express')
const router = express.Router()

const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} = require('../controlers/userGoals')

router.route('/').get(getGoals).post(createGoal)
router.route('/:id').patch(updateGoal).delete(deleteGoal)

module.exports = router
