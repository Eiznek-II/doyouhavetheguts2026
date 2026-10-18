import "../../assets/styles/tutorial.css"
import { Link } from "react-router-dom";

export default function TutorialThree() {
  return (
    <div>
        <h1>Instructions</h1>
        <h2>How to play the game?</h2>
        <p> 1. Pick the node (star) you want to start first</p>
        <p> 2. Use Prim-Jarnik Algorithm to find the minimum spanning tree </p>
        <br></br>
        <h2>Reminder of the Algorithm</h2>
        <p> 1. Check which edges has the shortest distance</p>
        <p> 2. Press the line to pick it</p>
        <p> 3. Then check again to see which edges from the chosen nodes have the shortest distance.</p>
        <p> 4. Repeat Instructions 1-3 until all the nodes have been visited</p>
        <br></br>
        <p> When you are done press Done and see if you are correct!</p>
        <p> If you are stuck you can press the hint button</p>
        <br></br>
        <Link to ="../game" className="next-button">Play Game</Link>
    </div>
  );
}