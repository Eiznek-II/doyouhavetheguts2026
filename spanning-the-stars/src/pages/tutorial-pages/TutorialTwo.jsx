import "../../assets/styles/tutorial.css"
import { Link } from "react-router-dom";


export default function TutorialTwo() {
  return (
    <div>
        <h1>Tutorial Two</h1>
        <p>Cont</p>
        <br></br>
        <div className="tutorialContent">
            <h1>lets show you how it works</h1>
            <p>
                We select a start node,
                it doesn't matter witch node we pick,
                we will still end up with a minimum spanning tree
            </p>

            <p>
                find cheapest connected edge
            </p>

            <p>
                connect vertex, and repeat until all vertexes are visites
            </p>

            <p>
                now we've looked at this lets take a look at the coden
            </p>


        </div>

        <Link to ="/tutorialthree" className="next-button">Next</Link>
    </div>
  );
}