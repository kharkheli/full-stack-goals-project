import React, { useState, useEffect } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useGlobalContext } from '../context'
import { MdContentCopy } from 'react-icons/md'

import axios from 'axios'

function SingleChalange({ data, room, setFetchGoal }) {
  const [expand, setExpand] = useState(false)
  const [goal, setGoal] = useState({ ...data })
  const [editedGoal, setEditedGoal] = useState({ ...data })
  const [editing, setEditing] = useState(false)
  const [allert, setAlert] = useState({ state: false, text: '' })
  const { token, setFetch, user } = useGlobalContext()
  const [coppied, setCoppied] = useState(false)
  useEffect(() => {
    setGoal({ ...data })
    setEditedGoal({ ...data })
  }, [data])
  const copyGoal = async () => {
    await axios.post(
      'https://goal-api-ilia.herokuapp.com/api/v1/user/goal',
      { name: goal.name, description: goal.description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setFetch((old) => !old)
  }
  const save = async () => {
    await axios
      .patch(
        `https://goal-api-ilia.herokuapp.com/api/v1/room/goal/${room._id}/${goal._id}`,
        {
          ...editedGoal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setFetchGoal((old) => !old)
        setEditing(false)
      })
      .catch((error) =>
        setAlert({ state: true, text: error.response.data.msg }),
      )
  }
  const deleteGoal = async () => {
    await axios.delete(
      `https://goal-api-ilia.herokuapp.com/api/v1/room/goal/${room._id}/${goal._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setFetchGoal((old) => !old)
  }
  return (
    <>
      <div
        className="goal"
        onClick={(e) => {
          if (!(editing || e.target.id == 'copy')) {
            setExpand(!expand)
          }
        }}
        style={{
          backgroundColor: '#ff652f',
        }}
      >
        {editing ? (
          <input
            type="text"
            style={{ width: '90%' }}
            value={editedGoal.name}
            onChange={(e) => {
              if (e.target.value.length < 50) {
                setEditedGoal({ ...editedGoal, name: e.target.value })
              }
            }}
          />
        ) : (
          goal.name
        )}
        {!editing ? (
          <i
            style={{ right: '4vw' }}
            onClick={() => {
              copyGoal()
              setCoppied(true)
              setTimeout(() => {
                setCoppied(false)
              }, 3000)
            }}
          >
            <MdContentCopy id="copy" />
          </i>
        ) : null}
        {coppied ? (
          <span
            className="allert"
            style={{ fontSize: 'inherit', position: 'absolute', right: '8vw' }}
          >
            copied..
          </span>
        ) : null}
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
          {allert.state ? (
            <h3 className="allert" style={{ color: 'orange' }}>
              {allert.text}
            </h3>
          ) : null}
          <fieldset>
            <legend className="cont-heading" style={{ margin: 'auto' }}>
              Description
            </legend>
            {editing ? (
              <textarea
                value={editedGoal.description}
                onChange={(e) => {
                  if (e.target.value.length < 500) {
                    setEditedGoal({
                      ...editedGoal,
                      description: e.target.value,
                    })
                  }
                }}
              ></textarea>
            ) : (
              <p className="content" style={{ padding: '1rem' }}>
                {goal.description}
              </p>
            )}
          </fieldset>
          <div className="btn-cont">
            {editing ? (
              <>
                <button
                  className="btn"
                  onClick={() => setEditing(false)}
                  onClick={save}
                >
                  Save
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setEditing(false)
                    setEditedGoal({ ...goal })
                  }}
                >
                  Cancell
                </button>
              </>
            ) : (
              <>
                {user.userName === goal.creator ? (
                  <button className="btn" onClick={() => setEditing(true)}>
                    Edit
                  </button>
                ) : null}
                {room.admins.includes(user.userName) ? (
                  <button className="btn" onClick={deleteGoal}>
                    Delete
                  </button>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleChalange
