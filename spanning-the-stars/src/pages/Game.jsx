import { useState } from "react";
import { useParams } from "react-router-dom"
import CodeBox from "../components/code-box";
import InfoBox from "../components/info-box";
import ConstellationBox from '../components/constellation-box';
import "../assets/styles/game.css";
import { getConstellation, getRandomConstellation } from "../get_constellation";

// testng code lines - replace with diff algorithms
const lines = [
  'the next edge you select must connect',
  'a tree vertex (already selected)',
  'to a non-tree vertex',
  'and have the minimum possible weight'
];


export default function Game({name=null}) {
  // is the code box showing?
  const [showCode, setShowCode] = useState(false);
  let params = useParams();
  console.log(params.starName);
  console.log(params.starName == null);

  // hooks (useState etc.) have to be called every render, never inside an if -
  // so always pick a random one up front, then only use it if no name was given
  const [randomStar] = useState(() => getRandomConstellation())

  // the name in the URL (/game/Cygnus) wins, then the name prop, then the random one
  const starName = params.starName ?? name
  const starData = starName ? { name: starName, ...getConstellation(starName) } : randomStar
  console.log(starData)
  // runs when the Hint button is clicked - shows/hides the code box
  function handleHint() {
    setShowCode(!showCode);
  }


  const [check, setCheck] = useState(() => () => {});
  function checkDone() {
    console.log("what")
    check();
      return
  }



  return (
    <div className="game-layout">
      {/* left panel */}
      <aside className="game-left-panel">
        <InfoBox />
      </aside>

      {/* middle */}
      <main className="game-main">
        <h1>{starData.name}</h1>
        <p>Explore the universe...</p>

        <div className="game-constellation">
          {/* key = start the game fresh when the constellation changes (e.g. /game/Leo -> /game/Lyra) */}
          <ConstellationBox key={starData.name} stars={starData} onCheckReady={setCheck} />
        </div>

        <div className="game-buttons">
          <button onClick={handleHint}>
            Hint
          </button>
          <button onClick={checkDone}>Done</button>
        </div>
      </main>

      <CodeBox lines={lines} highlightLine={0} isOpen={showCode} />
    </div>
  );
}
