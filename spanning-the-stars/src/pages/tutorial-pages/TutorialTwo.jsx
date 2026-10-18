import "../../assets/styles/tutorial.css"
import { Link } from "react-router-dom";

import ConstellationAnime from "../../components/contellation-animation.jsx";


export default function TutorialTwo() {
  return (
    <div>
        <h1>Tutorial Two</h1>
        <p>Cont</p>
        <br></br>

        <ConstellationAnime/>
        <Link to ="/tutorialthree" className="next-button">Next</Link>


    </div>
  );
}