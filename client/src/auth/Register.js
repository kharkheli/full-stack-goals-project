import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context'
import CoolInput from './CoolInput'

function Register() {
  const [data, setData] = useState({ username: '', password: '', name: '' })
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState('please fill all the fields')
  const { setToken, setUser } = useGlobalContext()
  const submitHandle = async (e) => {
    e.preventDefault()
    const { username, name, password } = data
    if (!name || !password || !username) {
      setAlert(true)
      setAlertText('please fill all the fields')
      return
    }
    try {
      await axios
        .post('https://goal-api-ilia.herokuapp.com/api/v1/user/sign-up', {
          name,
          userName: username,
          password,
        })
        .then((res) => {
          setUser(res.data)
          setToken(res.data.token)
        })
    } catch (error) {
      const message = error.response.data.msg
      if (message) {
        setAlertText(message)
        setAlert(true)
      }
    }
  }
  return (
    <section className="sign-up flex-center">
      <div className="form-cont">
        <h2 className="subheading">Sign Up</h2>
        {alert ? <h3 className="allert">{alertText}</h3> : null}
        <form onSubmit={submitHandle}>
          <CoolInput
            name="name"
            label="Name"
            type="name"
            maxLength={20}
            data={data}
            setData={setData}
          />
          <CoolInput
            name="username"
            label="Username"
            type="text"
            maxLength={20}
            data={data}
            setData={setData}
          />
          <CoolInput
            name="password"
            label="Password"
            type="password"
            data={data}
            setData={setData}
            maxLength={20}
          />
          <div className="btn-cont">
            <button className="btn" type="submit">
              Sign Up
            </button>
          </div>
        </form>
        <h4 className="additional">
          Already have an account? <Link to="/log-in">Log In</Link> instead
        </h4>
      </div>
    </section>
  )
}

export default Register
