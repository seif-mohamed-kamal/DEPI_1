import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from "./components/shared/footer";
import Navbar from "./components/shared/navbar";
import Home from './components/pages/home';
import Create from './components/pages/create';
import Contact from './components/pages/contact';
import Details from './components/pages/details';
import Edit from './components/pages/edit';

import { Route , Routes } from 'react-router-dom';
function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path = "/" element ={<Home />}/>
        <Route path = "/Create" element ={<Create />}/>
        <Route path = "/Contact" element ={<Contact />}/>
        <Route path = "/:id" element ={<Details />}/>
        <Route path="Edit/:id" element ={<Edit/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
