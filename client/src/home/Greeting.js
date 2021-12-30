import React from 'react'
import { Link } from 'react-router-dom'

function Greeting() {
  return (
    <section className="greeting">
      <h2 className="subheading">Welcome To XodWeb</h2>
      <div className="list-cont">
        <ul>
          <li>Create goals and record the progress</li>
          <li>Delete or renew old goals</li>
          <li>Create room where you can share goals with others</li>
          <li>Make rooms private by setting the password</li>
          <li>Copy goals you like to follow from the rooms</li>
          <li>Find all the rooms and join the one you like</li>
          <li>Add members to your room by username</li>
          <li>Make members admin so they can delete outdated goals</li>
        </ul>
      </div>
      <h3>And you can do more</h3>
      <div className="btn-cont">
        <Link to="/log-in">
          <button className="btn">Log In</button>
        </Link>
        <Link to="/sign-up">
          <button className="btn">Sign Up</button>
        </Link>
      </div>
    </section>
  )
}

export default Greeting
