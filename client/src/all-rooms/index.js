import React, { useState, useEffect } from 'react'
// import CreateRoom from './CreateRoom'
import RoomPrev from './RoomPrev'
import { useGlobalContext } from '../context'
import axios from 'axios'

function Rooms() {
  const { token } = useGlobalContext()
  const [rooms, setRooms] = useState([])
  const [page, setPage] = useState(1)
  const [all, setAll] = useState(false)
  const scroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setPage((oldpage) => oldpage + 1)
    }
  }
  useEffect(() => {
    if (!all) {
      window.addEventListener('scroll', scroll)
    }
    return () => window.removeEventListener('scroll', scroll)
  }, [all])
  useEffect(async () => {
    await axios
      .get(
        `https://goal-api-ilia.herokuapp.com/api/v1/room?page=${page}&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.data.length === 0) {
          setAll(true)
        }
        setRooms([...rooms, ...res.data])
      })
  }, [page])
  return (
    <section className="rooms-prev">
      <h2 className="subheading">All Rooms</h2>
      {rooms.map((room) => {
        return <RoomPrev key={room._id} {...room} />
      })}
      {/*
      <CreateRoom /> */}
    </section>
  )
}

export default Rooms
