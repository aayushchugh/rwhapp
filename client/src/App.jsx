import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import './App.css'

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import Protected from './components/Protected';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {

  const {user, setUser} = useState(null);

  return (
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
        <ToastContainer />
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/login' element={<Login />}/>
            <Route exact path='/register' element={<Register />}/>
            <Route exact path='/resetpassword/:token' element={<ResetPassword />}/>
            <Route exact path='/forgotpassword' element={<ForgotPassword />}/>
            {/* <Route exact path='/dashboard' element={<Dashboard />}/> */}
            <Route path="/dashboard" element={
              <Protected isLoggedIn={user}>
                <Dashboard />
              </Protected>}
            />
          </Routes>
          </UserContext.Provider>
      </Router>
  )
}

export default App;