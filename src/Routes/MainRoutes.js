import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import Signup from '../Pages/SignUp'
import Login from '../Pages/Login'
import { PrivateRoute } from '../Components/PrivateRoute'
import { PrivateRoute2 } from '../Components/ProvateRoute2'
import { Details } from '../Pages/Details'
import { Favorite } from '../Pages/Favourite'


const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
        <Route path='/Register' element={<Signup />} />
        <Route path='/Login' element={
          <PrivateRoute2>
            <Login />
          </PrivateRoute2>
        } />
        <Route path='/details/:id' element={
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        } />
        <Route path='/favorite' element={
          <PrivateRoute>
            <Favorite />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  )
}

export default MainRoutes