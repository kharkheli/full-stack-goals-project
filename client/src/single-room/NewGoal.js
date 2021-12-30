import React, { useState } from 'react'
import { AiOutlinePlusCircle, AiOutlineClose } from 'react-icons/ai'
import { MdContentCopy } from 'react-icons/md'
import { useGlobalContext } from '../context'
import axios from 'axios'

function CreateRoom({ room, setFetchGoal }) {
  const [adding, setAdding] = useState(false)
  const [goal, setGoal] = useState({ name: '', description: '' })
  const [alert, setAlert] = useState({ state: false, text: '' })
  const { token, chalanges } = useGlobalContext()
  const [search, setSearch] = useState('')
  const [own, setOwn] = useState(false)
  const submitHandle = async () => {
    try {
      console.log(goal)
      await axios
        .post(
          `https://goal-api-ilia.herokuapp.com/api/v1/room/goal/${room._id}`,
          { name: goal.name, description: goal.description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          setGoal({ name: '', description: '' })
          setAdding(false)
          setAlert({ state: false, text: '' })
          setFetchGoal((old) => !old)
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
          <h1 className="subheading">New Goal</h1>
          <span className="close-icon" onClick={() => setAdding(false)}>
            <AiOutlineClose />
          </span>
          {own ? (
            <>
              <h2>Search</h2>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  const val = e.target.value
                  if (val.length < 30) {
                    setSearch(val)
                  }
                }}
              />
              <div>
                {chalanges
                  .filter((goal) => goal.name.includes(search))
                  .map((userGoal) => {
                    return (
                      <div
                        key={userGoal._id}
                        style={{
                          position: 'relative',
                          fontSize: '2em',
                          backgroundColor: '#ff652f',
                          margin: '1vw',
                        }}
                      >
                        {userGoal.name}
                        <i
                          style={{
                            position: 'absolute',
                            right: '0.3vw',
                            top: '0.2vw',
                          }}
                          onClick={() => {
                            setGoal({
                              name: userGoal.name,
                              description: userGoal.description,
                            })
                            setOwn(false)
                          }}
                        >
                          <MdContentCopy />
                        </i>
                      </div>
                    )
                  })}
              </div>
              <div className="btn-cont">
                <button className="btn" onClick={() => setOwn(false)}>
                  Add New
                </button>
              </div>
            </>
          ) : (
            <>
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
              <h2>Name</h2>
              <input
                type="text"
                value={goal.name}
                onChange={(e) => {
                  const val = e.target.value
                  if (val.length < 30) {
                    setGoal({ ...goal, name: val })
                  }
                }}
              />
              <h2>Description</h2>
              <textarea
                value={goal.description}
                onChange={(e) =>
                  setGoal({ ...goal, description: e.target.value })
                }
              ></textarea>
              <div className="btn-cont">
                <button className="btn" type="submit" onClick={submitHandle}>
                  Save
                </button>
                <button
                  className="btn"
                  type="submit"
                  onClick={() => setOwn(true)}
                >
                  Add Your Own
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default CreateRoom
