import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import About from './pages/About'

import './App.css'
import Navbar from './components/nav-bar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  )
}

export default App
