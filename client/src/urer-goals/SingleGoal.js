import React, { useState, useEffect } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useGlobalContext } from '../context'
import axios from 'axios'

function SingleChalange(data) {
  const [expand, setExpand] = useState(false)
  const [chalange, setChalange] = useState({ ...data })
  const [editedChalange, setEditedChalange] = useState({ ...data })
  const [editing, setEditing] = useState(false)
  const [allert, setAlert] = useState({ state: false, text: '' })
  const { token, setFetch } = useGlobalContext()
  useEffect(() => {
    setChalange({ ...data })
    setEditedChalange({ ...data })
  }, [data])
  const save = async () => {
    await axios
      .patch(
        `https://goal-api-ilia.herokuapp.com/api/v1/user/goal/${chalange._id}`,
        {
          ...editedChalange,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setFetch((old) => !old)
        setEditing(false)
      })
      .catch((error) =>
        setAlert({ state: true, text: error.response.data.msg }),
      )
  }
  const deleteGoal = async () => {
    await axios.delete(
      `https://goal-api-ilia.herokuapp.com/api/v1/user/goal/${chalange._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setFetch((old) => !old)
  }
  // const [details, setDetails] = useState(false)
  // const [comp, setComp] = useState(completion)
  // const { chalanges, setChalanges, token, setToken } = useGlobalContext()
  // const descRef = useRef(null)
  // const [descHeight, setDescHeight] = useState(270)
  // useEffect(() => {
  //   const height = descRef.current.getBoundingClientRect().height + 80
  //   setDescHeight(height)
  // }, [])
  // const deleteChalange = async () => {
  //   const newChalanges = chalanges.filter((chalange) => chalange._id != _id)
  //   setChalanges(newChalanges)
  //   await axios.delete(`https://goal-api-ilia.herokuapp.com/api/v1/user/goal/${_id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   setToken(token)
  // }
  // const changeCompletion = async () => {
  //   const newChalanges = chalanges.map((chalange) => {
  //     if (chalange._id == _id) {
  //       return { ...chalange, completion: comp }
  //     }
  //     return chalange
  //   })
  //   setChalanges(newChalanges)
  // axios.patch(
  //   `https://goal-api-ilia.herokuapp.com/api/v1/user/goal/${_id}`,
  //   {
  //     completion: comp,
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   },
  // )
  // }
  return (
    <>
      <div
        className="goal"
        onClick={() => {
          if (!editing) {
            setExpand(!expand)
          }
        }}
        style={{
          background: 'rgb(20, 167, 108)',
          background: `linear-gradient(
    90deg,
    rgba(20, 167, 108, 1) 0%,
    rgba(20, 167, 108, 1) ${!chalange.completion ? 0 : chalange.completion}%,
    rgba(255, 101, 47, 1) ${
      !chalange.completion ? 0 : Number(chalange.completion) + 2
    }%,
    rgba(255, 101, 47, 1) 100%
  )`,
        }}
      >
        {editing ? (
          <input
            type="text"
            style={{ width: '90%' }}
            value={editedChalange.name}
            onChange={(e) => {
              if (e.target.value.length < 50) {
                setEditedChalange({ ...editedChalange, name: e.target.value })
              }
            }}
          />
        ) : (
          chalange.name
        )}
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
                value={editedChalange.description}
                onChange={(e) => {
                  if (e.target.value.length < 500) {
                    setEditedChalange({
                      ...editedChalange,
                      description: e.target.value,
                    })
                  }
                }}
              ></textarea>
            ) : (
              <p className="content" style={{ padding: '1rem' }}>
                {chalange.description}
              </p>
            )}
          </fieldset>
          <p
            className="cont-heading"
            style={{ textAlign: 'center', margin: '1rem' }}
          >
            Completion:{' '}
            <input
              type="number"
              style={{
                fontSize: '2rem',
                width: '4rem',
                textAlign: 'center',
                border: 'none',
                outline: 'none',
                backgroundColor: '#747474 ',
                color: 'white',
              }}
              value={Number(editedChalange.completion).toString()}
              onChange={(e) => {
                let value = e.target.value
                if (value >= 0 && value <= 100) {
                  setEditedChalange({ ...editedChalange, completion: value })
                }
              }}
              onBlur={() => {
                if (!editing) {
                  setChalange({
                    ...chalange,
                    completion: editedChalange.completion,
                  })
                }
              }}
            />
          </p>
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
                    setEditedChalange({ ...chalange })
                  }}
                >
                  Cancell
                </button>
              </>
            ) : (
              <>
                <button className="btn" onClick={() => setEditing(true)}>
                  Edit
                </button>
                <button className="btn" onClick={deleteGoal}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleChalange
