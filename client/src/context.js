import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

const UserContext = React.createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [chalanges, setChalanges] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [fetch, setFetch] = useState(true)
  const [fetchRooms, setFetchRooms] = useState(true)
  const [rooms, setRooms] = useState([])
  // const [rooms, setRooms] = useState([])
  useEffect(() => {
    if (token) {
      axios
        .get('https://goal-api-ilia.herokuapp.com/api/v1/user/goal', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setChalanges(res.data))
    }
  }, [fetch])
  useEffect(() => {
    if (token) {
      axios
        .get('https://goal-api-ilia.herokuapp.com/api/v1/room/member', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setRooms(res.data))
    }
  }, [fetchRooms])

  useEffect(async () => {
    if (!token) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      setUser({})
      setChalanges([])
    } else {
      localStorage.setItem('token', token)
    }
  }, [token])
  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        chalanges,
        rooms,
        setFetchRooms,
        // setChalanges,
        setFetch,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(UserContext)
}

export { UserContext, UserProvider }
