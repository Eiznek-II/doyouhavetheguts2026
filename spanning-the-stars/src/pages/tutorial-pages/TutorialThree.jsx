import "../../assets/styles/tutorial.css"
import { Link } from "react-router-dom";

export default function TutorialThree() {
  return (
    <div>
        <h1>Tutorial Three</h1>
        <p>Cont</p>
        <br></br>
        <Link to ="/" className="next-button">Back to Home</Link>
    </div>
  );
}