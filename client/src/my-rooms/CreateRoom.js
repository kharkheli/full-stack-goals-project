import React, { useState } from 'react'
import { AiOutlinePlusCircle, AiOutlineClose } from 'react-icons/ai'
import { useGlobalContext } from '../context'
import axios from 'axios'

function CreateRoom() {
  const [adding, setAdding] = useState(false)
  const [room, setRoom] = useState({ name: '', description: '', password: '' })
  const [alert, setAlert] = useState({ state: false, text: '' })
  const { token, setFetchRooms } = useGlobalContext()
  const submitHandle = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post(
          'https://goal-api-ilia.herokuapp.com/api/v1/room',
          {
            name: room.name,
            description: room.description,
            password: room.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          setRoom({ name: '', description: '', password: '' })
          setAdding(false)
          setAlert({ state: false, text: '' })
          setFetchRooms((old) => !old)
        })
    } catch (error) {
      const message = error.response.data.msg
      if (message) {
        setAlert({ state: true, text: message })
      }
    }
  }
  return (
    <div style={{ marginTop: '2vw' }}>
      {!adding ? (
        <span className="add-icon" onClick={() => setAdding(true)}>
          <AiOutlinePlusCircle />
        </span>
      ) : (
        <div className="create-cont">
          <h1 className="subheading">New Room</h1>
          <span className="close-icon" onClick={() => setAdding(false)}>
            <AiOutlineClose />
          </span>
          {alert.state ? (
            <h3
              style={{
                color: '#14a0ff',
                textAlign: 'center',
                marginTop: '1rem',
              }}
            >
              {alert.text}
            </h3>
          ) : null}
          <form onSubmit={submitHandle}>
            <h2>Name</h2>
            <input
              type="text"
              value={room.name}
              onChange={(e) => {
                const val = e.target.value
                if (val.length < 30) {
                  setRoom({ ...room, name: val })
                }
              }}
            />
            <h2>Description</h2>
            <textarea
              value={room.description}
              onChange={(e) =>
                setRoom({ ...room, description: e.target.value })
              }
            ></textarea>
            <h2>Password</h2>
            <input
              type="text"
              value={room.password}
              placeholder="set password if you want to make private room"
              onChange={(e) => {
                const val = e.target.value
                if (val.length < 30) {
                  setRoom({ ...room, password: val })
                }
              }}
            />
            <div className="btn-cont">
              <button className="btn" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default CreateRoom
