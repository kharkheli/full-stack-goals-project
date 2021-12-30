import React from 'react'
import { Link } from 'react-router-dom'
import { ImExit } from 'react-icons/im'
import axios from 'axios'
import { useGlobalContext } from '../context'

function RoomPrev({ _id: roomId, name: roomName, createdBy }) {
  const { user, token, setFetchRooms } = useGlobalContext()
  const leaveRoom = async () => {
    await axios
      .delete(
        `https://goal-api-ilia.herokuapp.com/api/v1/room/admin`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            userName: user.userName,
            roomId: roomId,
          },
        },
      )
      .then(() => setFetchRooms((old) => !old))
  }
  return (
    <>
      <div className="room-prev">
        <Link to={`/rooms/${roomId}`}>
          <div>{roomName} </div>
        </Link>
        {createdBy === 'true' ? null : (
          <abbr title="Leave Room">
            {' '}
            <i
              onClick={leaveRoom}
              style={{
                position: 'absolute',
                right: '0.5em',
                top: '0.3em',
                display: 'block',
              }}
            >
              <ImExit style={{ transform: 'rotateY(180deg)' }} />
            </i>
          </abbr>
        )}
      </div>
    </>
  )
}

export default RoomPrev
