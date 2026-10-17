import { useState, useEffect } from "react";
import CodeBox from "../components/code-box";
import InfoBox from "../components/info-box";
import ConstellationBox from '../components/constellation-box';
import "../assets/styles/game.css";

// testng code lines - replace with diff algorithms
const lines = [
  'the next edge you select must connect',
  'a tree vertex (already selected)',
  'to a non-tree vertex',
  'and have the minimum possible weight'
];

export default function Game() {
  useEffect(() => {
    console.log("creating stars")
    const stars = createStars();

    // remove the stars when leaving the page, so they don't pile up
    return () => stars.forEach((star) => star.remove());
  }, []);

  // is the code box showing?
  const [showCode, setShowCode] = useState(false);

  // runs when the Hint button is clicked - shows/hides the code box
  function handleHint() {
    setShowCode(!showCode);
  }

  return (
    <div className="game-layout">
      {/* left panel */}
      <aside className="game-left-panel">
        <InfoBox />
      </aside>

      {/* middle */}
      <main className="game-main">
        <h1>Spanning the Stars</h1>
        <p>Explore the universe...</p>

        <div className="game-constellation">
          <ConstellationBox />
        </div>

        <div className="game-buttons">
          <button onClick={handleHint}>
            Hint
          </button>
          <button>Done</button>
        </div>
      </main>

      <CodeBox lines={lines} highlightLine={0} isOpen={showCode} />
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
