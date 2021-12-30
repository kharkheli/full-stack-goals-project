const mongoose = require('mongoose')
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      require: [true, 'please provide name'],
    },
    userName: {
      type: String,
      minlength: 4,
      maxlength: 20,
      unique: true,
      require: [true, 'please provide username'],
    },
    password: {
      type: String,
      require: [true, 'please provide password'],
    },
  },
  { timestamps: true },
)

userSchema.pre('save', async function () {
  if (this.password.length < 6) {
    throw new BadRequestError('password should be longer than 5 charachters')
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, userName: this.userName },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  )
}

userSchema.methods.checkPassword = async function (pass) {
  const result = await bcrypt.compare(pass, this.password)
  return result
}

module.exports = mongoose.model('User', userSchema)
