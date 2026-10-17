import InfoBox from "../components/info-box";

import "../assets/styles/game.css";
import { useEffect } from "react";

export default function Game() {
  useEffect(() => {
    console.log("creating stars")
    createStars();
  }, []);
  
  return (
    <div>
      <h1>Game Page</h1>
      <p>a game will be here soon!.</p>
      <InfoBox />
      <h1>Spanning the Stars</h1>
      <p>Explore the universe...</p>
      <button>Hint</button>
      <button>Done</button>
    </div>
  
  );
}

function createStars(){
  const numStars = 100
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
  }
}


