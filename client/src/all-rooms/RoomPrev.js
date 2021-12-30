import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useGlobalContext } from '../context'
import { AiOutlineClose } from 'react-icons/ai'
import { MdLock, MdPublic } from 'react-icons/md'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

function RoomPrev(room) {
  const { user, setFetchRooms, token } = useGlobalContext()
  const [expand, setExpand] = useState(false)
  const [password, setPassword] = useState('')
  const [reqPassword, setReqPassword] = useState(false)
  const [alert, setAlert] = useState({ state: false, text: '' })
  const [redirect, setRedirect] = useState(false)

  const sendPassword = () => {
    axios
      .patch(
        `https://goal-api-ilia.herokuapp.com/api/v1/room/member/`,
        { userName: user.userName, roomId: room._id, password },
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
      .catch((error) =>
        setAlert({ state: true, text: error.response.data.msg }),
      )
  }

  const join = () => {
    if (room.members.includes(user.userName)) {
      setRedirect(true)
    } else if (room.password) {
      setReqPassword(true)
    } else {
      axios
        .patch(
          `https://goal-api-ilia.herokuapp.com/api/v1/room/member/`,
          { userName: user.userName, roomId: room._id },
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
  }
  return (
    <>
      {redirect ? (
        <Navigate to={`/rooms/${room._id}`} />
      ) : (
        <>
          {reqPassword ? (
            <div className="modal">
              <div className="req-password">
                <i onClick={() => setReqPassword(false)}>
                  <AiOutlineClose />
                </i>
                <h1 style={{ fontSize: '3em', color: 'white' }}>{room.name}</h1>
                <h2 className="label">Enter Password For the Room</h2>
                <h2 className="allert" style={{ color: 'yellow' }}>
                  {alert.state ? alert.text : null}
                </h2>
                <input
                  type="text"
                  value={password}
                  style={{ fontSize: '2em', marginTop: '2vw' }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="btn-cont">
                  <button className="btn" onClick={sendPassword}>
                    Join
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          <div
            className="goal"
            onClick={(e) => {
              setExpand(!expand)
            }}
            style={{
              backgroundColor: '#ff652f',
            }}
          >
            {room.name}
            <em style={{ position: 'absolute', right: '2em' }}>
              {room.password ? <MdLock /> : <MdPublic />}
            </em>

            <i>
              <IoIosArrowDown
                style={{
                  transform: `rotateZ(${expand ? '180deg' : '0deg'})`,
                  transition: 'all 0.5s',
                }}
              />
            </i>
          </div>
          <div
            className="expand-goal"
            style={{
              maxHeight: !expand ? '0px' : '30vw',
            }}
          >
            <div className="padding-box">
              <fieldset>
                <legend className="cont-heading" style={{ margin: 'auto' }}>
                  Description
                </legend>
                <p className="content" style={{ padding: '1rem' }}>
                  {room.description}
                </p>
              </fieldset>
              <div className="btn-cont">
                <button className="btn" onClick={join}>
                  join
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default RoomPrev
