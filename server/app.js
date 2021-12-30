require('dotenv').config()
const cors = require('cors')
require('express-async-errors')

const express = require('express')
const app = express()
const connectDb = require('./db/connect')
const errorHandler = require('./middlewares/errorHandler')
const roomMember = require('./middlewares/roomMember')

const userRoute = require('./routes/user')
const userGoalRoute = require('./routes/userGoal')
const roomRoute = require('./routes/room')
const authorization = require('./middlewares/authorization')
const roomGoalRoute = require('./routes/roomGoal')

app.use(express.json())
app.use(cors())

app.use('https://goal-api-ilia.herokuapp.com/api/v1/user', userRoute)
app.use(
  'https://goal-api-ilia.herokuapp.com/api/v1/user/goal',
  authorization,
  userGoalRoute,
)
app.use(
  'https://goal-api-ilia.herokuapp.com/api/v1/room',
  authorization,
  roomRoute,
)
app.use(
  'https://goal-api-ilia.herokuapp.com/api/v1/room/goal/:id',
  authorization,
  roomMember,
  roomGoalRoute,
)
app.use(errorHandler)

const port = process.env.PORT || 3001

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`server is listening on port ${port}...`),
    )
  } catch (error) {
    console.log(error)
  }
}

start()
