import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../context'
import SingleGoal from './SingleGoal'
import NewGoal from './NewGoal'
import SingleUser from './SingleUser'
import { Navigate } from 'react-router-dom'

function Room() {
  const { token, user, setFetchRooms } = useGlobalContext()
  const { id } = useParams()
  const [goals, setGoals] = useState([])
  const [room, setRoom] = useState({})
  const [fetchGoal, setFetchGoal] = useState(true)
  const [shmactive, setShmactive] = useState('goals')
  const [newMember, setNewMember] = useState('')
  const [fetchRoom, setFetchRoom] = useState(true)
  const [alert, setAlert] = useState({ state: 'false', text: '' })
  const [redirect, setRedirect] = useState(false)

  const deleteRoom = () => {
    axios
      .delete(
        `https://goal-api-ilia.herokuapp.com/api/v1/room/${room._id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        setFetchRooms((old) => !old)
        setRedirect(true)
      })
  }

  const addMember = () => {
    console.log(newMember)
    axios
      .patch(
        `https://goal-api-ilia.herokuapp.com/api/v1/room/member/`,
        {
          userName: newMember,
          roomId: room._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setNewMember('')
        setAlert({ state: true, text: res.data.msg })
        setFetchRoom(!fetchRoom)
      })
      .catch((error) => {
        setAlert({ state: true, text: error.response.data.msg })
      })
  }

  useEffect(() => {
    axios
      .get(`https://goal-api-ilia.herokuapp.com/api/v1/room/goal/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setGoals(res.data))
  }, [fetchGoal])
  useEffect(() => {
    axios
      .get(`https://goal-api-ilia.herokuapp.com/api/v1/room/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRoom(res.data))
  }, [id, fetchRoom])
  return (
    <>
      {redirect ? (
        <Navigate to="/my-rooms" />
      ) : (
        <section className="room">
          <h2 className="subheading">{room.name}</h2>
          <h3 className="room-desc">{room.description}</h3>
          <div className="room-subheading-cont">
            <i
              className={`room-subheading ${
                shmactive === 'goals' ? 'shmactive' : null
              }`}
              onClick={() => setShmactive('goals')}
            >
              Goals
            </i>
            <i
              className={`room-subheading ${
                shmactive === 'members' ? 'shmactive' : null
              }`}
              onClick={() => setShmactive('members')}
            >
              Members
            </i>
          </div>
          {shmactive === 'goals' ? (
            <div className="room-content">
              <div className="goal-cont">
                {goals.map((goal, index) => {
                  return (
                    <SingleGoal
                      key={goal._id}
                      data={{ ...goal }}
                      room={{ ...room }}
                      setFetchGoal={setFetchGoal}
                    />
                  )
                })}
                <NewGoal room={{ ...room }} setFetchGoal={setFetchGoal} />
              </div>
            </div>
          ) : (
            <div className="room-content">
              <div
                className="create-cont"
                style={{ margin: '1vw', textAlign: 'center' }}
              >
                <h2 className="label" style={{ color: 'black' }}>
                  enter username to add member
                </h2>
                <h2 className="allert">{alert.state ? alert.text : null}</h2>
                <input
                  type="text"
                  style={{ width: '50%', display: 'inline-block' }}
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                />
                <button className="btn" onClick={addMember}>
                  add member
                </button>
              </div>
              <div className="user-cont">
                {room.members.map((name) => {
                  return (
                    <SingleUser
                      key={name}
                      name={name}
                      room={room}
                      setFetchRoom={setFetchRoom}
                    />
                  )
                })}
              </div>
            </div>
          )}
          {user.userName === room.createdBy ? (
            <div className="btn-cont">
              <button
                className="btn"
                style={{ color: 'red', border: '2px solid red' }}
                onClick={deleteRoom}
              >
                Delete
              </button>
            </div>
          ) : null}
        </section>
      )}
    </>
  )
}

export default Room
