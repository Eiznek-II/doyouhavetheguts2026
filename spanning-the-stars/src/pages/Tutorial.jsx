import "../assets/styles/tutorial.css"
import { Link } from "react-router-dom";


export default function Tutorial() {
  return (
    <div>
        <h1>Tutorial</h1>
        <p>Intro to what a spanning tree is</p>
        <br></br>
        <Link to ="/tutorialtwo" className="next-button">Next</Link>
    </div>
  );
}