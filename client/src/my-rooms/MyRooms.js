import React, { useState, useEffect } from 'react'
import CreateRoom from './CreateRoom'
import RoomPrev from './RoomPrev'
import { useGlobalContext } from '../context'

function Room() {
  const { token, rooms } = useGlobalContext()
  return (
    <section className="rooms-prev">
      <h2 className="subheading">My Rooms</h2>
      {rooms.map((room) => {
        return <RoomPrev key={room._id} {...room} />
      })}
      <CreateRoom />
    </section>
  )
}

export default Room
