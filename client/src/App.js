import React from 'react'
import NavBar from './components/Navbar';
import "./App.css"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'

function App() {
  return (
    <BrowserRouter>
    <NavBar></NavBar>

    <Routes>

    <Route exact path='/' element={<Home></Home>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/profile' element={<Profile></Profile>}></Route>
    <Route path='/signup' element={<Signup></Signup>}></Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
