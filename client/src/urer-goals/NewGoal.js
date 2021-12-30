import React, { useState } from 'react'
import { AiOutlinePlusCircle, AiOutlineClose } from 'react-icons/ai'
import { useGlobalContext } from '../context'
import axios from 'axios'

function NewGoal() {
  const [adding, setAdding] = useState(false)
  const [goal, setGoal] = useState({ name: '', description: '' })
  const [alert, setAlert] = useState({ state: false, text: '' })
  const { setFetch, token } = useGlobalContext()
  const submitHandle = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post(
          'https://goal-api-ilia.herokuapp.com/api/v1/user/goal',
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
          setFetch((old) => !old)
          setAlert({ state: false, text: '' })
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
        <span className="add-icon">
          <AiOutlinePlusCircle onClick={() => setAdding(true)} />
        </span>
      ) : (
        <div className="create-cont">
          <h1 className="subheading">New Goal</h1>
          <span
            className="close-icon"
            onClick={() => {
              setGoal({ name: '', description: '' })
              setAdding(false)

              setAlert({ state: false, text: '' })
            }}
          >
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
            <h2 className="label">Name</h2>
            <input
              type="text"
              value={goal.name}
              onChange={(e) => {
                const val = e.target.value
                if (val.length < 50) {
                  setGoal({ ...goal, name: val })
                }
              }}
            />
            <h2 className="label">Description</h2>
            <textarea
              value={goal.description}
              onChange={(e) =>
                setGoal({ ...goal, description: e.target.value })
              }
            ></textarea>
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

export default NewGoal

// qveda = tu(warmateba - (100-sizuste)) > 0 mashin (warmateba - (100-sizuste)) tu ara ((warmateba - (100-sizuste))*0.2)

// zeda = tu(warmateba+100-sizuste) < 100 mashin (warmateba+100-sizuste)/2 tu ara (100/2 + (warmateba+sizuste)*0.2)

// pasuxi = qveda + zeda
