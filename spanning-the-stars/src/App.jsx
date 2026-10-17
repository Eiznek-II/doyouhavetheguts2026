import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Tutorial from './pages/Tutorial'
import Game from './pages/Game'
import About from './pages/About'
//tutorial pages
import TutorialTwo from './pages/tutorial-pages/TutorialTwo'
import TutorialThree from './pages/tutorial-pages/TutorialThree'

import './App.css'
import Navbar from './components/nav-bar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/game" element={<Game />} />
        <Route path="/tutorialtwo" element={<TutorialTwo />} />
        <Route path="/tutorialthree" element={<TutorialThree />} />
      </Routes>
    </>
  )
}

export default App
