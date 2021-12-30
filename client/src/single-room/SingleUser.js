import React from 'react'
import { useGlobalContext } from '../context'
import axios from 'axios'

const images = [
  'https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267_960_720.jpg',
  'https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg',
  'https://cdn.pixabay.com/photo/2014/10/01/10/44/hedgehog-468228_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/04/19/21/10/frog-1339892_960_720.jpg',
  'https://cdn.pixabay.com/photo/2017/03/13/10/31/monkey-2139295_960_720.jpg',
]

const SingleUser = React.memo(({ name, room, setFetchRoom }) => {
  const { user, token } = useGlobalContext()
  const admin = room.admins.includes(user.userName)
  const noob = !room.admins.includes(name)
  const randImg = () => {
    return images[Math.floor(Math.random() * 5)]
  }

  const remove = () => {
    axios
      .delete(
        `https://goal-api-ilia.herokuapp.com/api/v1/room/admin`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            userName: name,
            roomId: room._id,
          },
        },
      )
      .then(() => setFetchRoom((old) => !old))
  }
  const makeAdmin = () => {
    axios
      .patch(
        'https://goal-api-ilia.herokuapp.com/api/v1/room/admin',
        {
          userName: name,
          roomId: room._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => setFetchRoom((old) => !old))
  }
  return (
    <div className="single-user">
      <img className="prof-pic" src={randImg()} alt={name} />
      <h2 className="name">{name}</h2>
      <p className="status">{room.createdBy === name ? 'Creator' : null}</p>
      <p className="status">{room.admins.includes(name) ? 'Admin' : null}</p>
      <div className="btn-cont">
        {room.createdBy === name ? null : admin ? (
          <button className="btn" onClick={remove}>
            Remove
          </button>
        ) : null}
      </div>
      <div className="btn-cont">
        {admin && noob ? (
          <button className="btn" onClick={makeAdmin}>
            Make Admin
          </button>
        ) : null}
      </div>
    </div>
  )
})

export default SingleUser
