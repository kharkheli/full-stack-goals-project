const User = require('../models/user')
const { UnauthenticatedError } = require('../errors')

const logIn = async (req, res) => {
  const { userName, password } = req.body
  const user = await User.findOne({ userName })
  if (!user) {
    throw new UnauthenticatedError('Username is not Registered')
  }
  const corectPas = await user.checkPassword(password)
  if (corectPas) {
    return res.status(200).json({
      name: user.name,
      userName: user.userName,
      token: user.createJWT(),
    })
  } else {
    throw new UnauthenticatedError('Wrong password please try again')
  }
}

const signUp = async (req, res) => {
  const user = await User.create({ ...req.body })
  return res.status(200).json({
    name: user.name,
    userName: user.userName,
    token: user.createJWT(),
  })
}

// const getAcount = async (req, res) => {
//   try {
//     const { name, userName, rooms } = await User.findById({
//       _id: req.userId,
//     }).select('name userName rooms')
//     res.status(200).json({ name, userName, rooms })
//   } catch (error) {
//     throw new UnauthenticatedError('there is no acount with the given id')
//   }
// }

module.exports = { signUp, logIn }
