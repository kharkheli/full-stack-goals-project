import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context'
import CoolInput from './CoolInput'

function Login() {
  const [data, setData] = useState({ username: '', password: '' })
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState('please fill all the fields')
  const { setToken, setUser, setFetch, setFetchRooms } = useGlobalContext()
  const submitHandle = async (e) => {
    e.preventDefault()
    const { username, password } = data
    if (!username || !password) {
      setAlert(true)
      setAlertText('please fill all the fields')
      return
    }
    try {
      await axios
        .post('https://goal-api-ilia.herokuapp.com/api/v1/user/log-in', {
          userName: username,
          password,
        })
        .then((res) => {
          setToken(res.data.token)
          setUser(res.data)
          localStorage.setItem('user', JSON.stringify(res.data))
          setFetch((old) => !old)
          setFetchRooms((old) => !old)
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
    <section className="login flex-center">
      <div className="form-cont">
        <h2 className="subheading">Log In</h2>
        {alert ? <h3 className="allert">{alertText}</h3> : null}
        <form onSubmit={submitHandle}>
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
              Log In
            </button>
          </div>
        </form>
        <h4 className="additional">
          Don't have an account? <Link to="/sign-up">Sign up</Link> instead
        </h4>
      </div>
    </section>
  )
}

export default Login
