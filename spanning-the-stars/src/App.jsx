import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import About from './pages/About'

import './App.css'

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/game">Game</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  )
}

export default App
