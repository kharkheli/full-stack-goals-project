const express = require('express')
const router = express.Router()
const {
  createRoom,
  addAdmin,
  addMember,
  removeMember,
  deleteRoom,
  getAllRooms,
  getAllUserRooms,
  getRoom,
} = require('../controlers/room')

router.route('/member').patch(addMember).get(getAllUserRooms)
router.route('/admin').patch(addAdmin).delete(removeMember)
router.route('/').post(createRoom).get(getAllRooms)
router.route('/:id').delete(deleteRoom).get(getRoom)

module.exports = router
