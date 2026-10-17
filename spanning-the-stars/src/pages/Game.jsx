import { useState } from "react";
import CodeBox from "../components/code-box";

// testng code lines - replace with diff algorithms
const lines = [
  'Line 1',
  'Line 2',
  'Line 3',
  'Line 4',
  'Test',
];

export default function Game() {
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

      <button onClick={handleNext} disabled={isLastLine}>
        ↓ Hint
      </button>

      <CodeBox lines={lines} highlightLine={highlightLine} />
    </div>
  );
}
