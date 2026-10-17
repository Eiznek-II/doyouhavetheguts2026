import { useState, useEffect } from "react";
import CodeBox from "../components/code-box";
import InfoBox from "../components/info-box";
import ConstellationBox from '../components/constellation-box';
import "../assets/styles/game.css";

// testng code lines - replace with diff algorithms
const lines = [
  'Line 1',
  'Line 2',
  'Line 3',
  'Line 4',
  'Test',
];

export default function Game() {
  useEffect(() => {
    console.log("creating stars")
    const stars = createStars();

    // remove the stars when leaving the page, so they don't pile up
    return () => stars.forEach((star) => star.remove());
  }, []);

  // which line is green right now (0 = first line)
  const [highlightLine, setHighlightLine] = useState(0);

  const isLastLine = highlightLine === lines.length - 1;

  // runs when the Next button is clicked
  function handleNext() {
    setHighlightLine(highlightLine + 1);
  }

  return (
    <div>
      <h1>Game Page</h1>
      <p>a game will be here soon!.</p>

      <CodeBox lines={lines} highlightLine={highlightLine} />
      <InfoBox />
      <h1>Spanning the Stars</h1>
      <p>Explore the universe...</p>
      <button onClick={handleNext} disabled={isLastLine}>
        Hint
      </button>
      <button>Done</button>

      <ConstellationBox />
    </div>
  );
}

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
