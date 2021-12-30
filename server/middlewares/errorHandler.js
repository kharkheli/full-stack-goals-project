const { StatusCodes } = require('http-status-codes')
const errorHandeler = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }
  if (err.code === 11000) {
    customError.statusCode = StatusCodes.UNAUTHORIZED
    customError.msg = 'username is already registered'
  } else if (err.name == 'ValidationError') {
    customError.statusCode = StatusCodes.BAD_REQUEST
    let message = []
    Object.keys(err.errors).map((key) => {
      const { path, type } = err.errors[key].properties
      message.push(
        `${path} can not be ${
          type === 'minlength'
            ? 'shorter than ' +
              err.errors[key].properties.minlength +
              ' characters '
            : type === 'maxlength'
            ? 'longer than ' +
              err.errors[key].properties.maxlength +
              ' chararacters '
            : null
        } charachters `,
      )
    })
    customError.msg = message.join(',')
  }
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandeler
