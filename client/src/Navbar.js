import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from './context'

function Navbar() {
  const [active, setActive] = useState('home')
  const { setToken, setFetch } = useGlobalContext()

  useEffect(() => {
    const url = window.location.href.split('/')[3]
    setActive(url)
  }, [])

  return (
    <div className="navbar">
      <Link
        className={`nav ${active === 'home' ? 'active' : null}`}
        onClick={() => setActive('home')}
        to="/"
      >
        Home
      </Link>
      <Link
        className={`nav ${active === 'my-rooms' ? 'active' : null}`}
        onClick={() => setActive('my-rooms')}
        to="/my-rooms"
      >
        My Rooms
      </Link>
      <Link
        className={`nav ${active === 'all-rooms' ? 'active' : null}`}
        onClick={() => setActive('all-rooms')}
        to="/all-rooms"
      >
        All Rooms
      </Link>
      <Link
        className="nav"
        to="/"
        onClick={() => {
          setToken('')
          setFetch((old) => !old)
        }}
      >
        Log Out
      </Link>
    </div>
  )
}

export default Navbar
