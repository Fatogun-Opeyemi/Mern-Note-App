import React from 'react'
import { Routes, Route } from 'react-router-dom'

import CreateBooks from './pages/CreateBooks'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import Home from './pages/Home'
import ShowBook from './pages/ShowBook'
// import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
// 1. Import the ProtectedRoute
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div className="container">
      {/* <Header /> */}

      <Routes>
        {/* PUBLIC ROUTES - Anyone can access these */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* PROTECTED ROUTES - Only logged-in users can access these */}
        <Route
          path='/'
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />
        <Route
          path='/books/create'
          element={<ProtectedRoute><CreateBooks /></ProtectedRoute>}
        />
        <Route
          path='/books/delete/:id'
          element={<ProtectedRoute><DeleteBook /></ProtectedRoute>}
        />
        <Route
          path='/books/edit/:id'
          element={<ProtectedRoute><EditBook /></ProtectedRoute>}
        />
        <Route
          path='/books/details/:id'
          element={<ProtectedRoute><ShowBook /></ProtectedRoute>}
        />
      </Routes>
    </div>
  )
}

export default App;