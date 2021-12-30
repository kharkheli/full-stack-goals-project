import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import GoalCont from './urer-goals/GoalCont'
import { useGlobalContext } from './context'
import Navbar from './Navbar'
import MyRooms from './my-rooms/MyRooms'
import SingleRoom from './single-room'
import AllRooms from './all-rooms'
import Greeting from './home/Greeting'

// import Home from './home/Home'
// import { useGlobalContext } from './context'

// import Friends from './friends/Friends'
// import SinglePublicRoom from './room/SingleRoom'
// import SinglePrivateRoom from './room/SinglePrivateRoom'

function App() {
  const { token } = useGlobalContext()
  return (
    <Router>
      {token ? <Navbar /> : null}
      <Routes>
        <Route exact path="/" element={token ? <GoalCont /> : <Greeting />} />
        <Route
          exact
          path="/log-in"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/sign-up"
          element={!token ? <Register /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/my-rooms"
          element={token ? <MyRooms /> : <Navigate to="/" />}
        />
        <Route exact path="/rooms/:id" element={<SingleRoom />} />
        <Route
          exact
          path="/all-rooms"
          element={token ? <AllRooms /> : <Navigate to="/" />}
        />
        {/* {token ? (
          <>
            <Route exact path="/rooms" element={<MyRooms />} />,{' '}
            <Route exact path="/friends" element={<Friends />} />
            <Route
              exact
              path="/rooms/public/:id"
              element={<SinglePublicRoom />}
            />
            <Route
              exact
              path="/rooms/private/:id"
              element={<SinglePrivateRoom />}
            />
          </>
        ) : null}
        <Route
          exact
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        ></Route>
        <Route
          exact
          path="/signup"
          element={!token ? <Register /> : <Navigate to="/" />}
        />
        <Route path="*" element={<h1>oh maybe baybe</h1>} /> */}
      </Routes>
    </Router>
  )
}

export default App
