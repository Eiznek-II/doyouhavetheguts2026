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
