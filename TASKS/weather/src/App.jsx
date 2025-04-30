import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Us from './components/pagess/us'; 
import Egy from './components/pagess/egy'; 
import Weather from './components/pagess/weather';
import Navbar from "./components/nav&footer/nav"; 
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/Us' element={<Us />} />
        <Route path='/Egy' element={<Egy />} />
        <Route path='/Weather' element={<Weather />} />

      </Routes>
    </>
  );
}

export default App;