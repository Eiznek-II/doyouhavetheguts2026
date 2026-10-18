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

import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
      console.log("creating stars")
      const stars = createStars();
  
      // remove the stars when leaving the page, so they don't pile up
      return () => stars.forEach((star) => star.remove());
    }, []);

  return (

    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/game" element={<Game/>} />
        <Route path="/tutorialtwo" element={<TutorialTwo />} />
        <Route path="/tutorialthree" element={<TutorialThree />} />
      </Routes>
    </>
  )
}

export default App

function createStars(){
  const numStars = 100
  const stars = [];
  for (let i=0; i < numStars; i++){
    const star = document.createElement('div');
    star.classList.add('star');

    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.animationDuration = `${Math.random() * 2 + 1}s`;

    document.body.appendChild(star);
    stars.push(star);
  }
  return stars;
}
