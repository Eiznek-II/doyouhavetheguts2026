import "../assets/styles/tutorial.css"
import { Link } from "react-router-dom";


export default function Tutorial() {
  return (
    <div>
        <h1>Tutorial</h1>
        <h2>What is this minimum spanning tree I'm finding?</h2>
        <p>A spanning tree is a sub-graph that connects all vertices of an undirected graph without any loops. In practical terms, any highway that connects all stars in the constellation without going back to any of them more than once.</p>
        <p>A minimum spanning tree is a sub-graph that connects all vertices of an undirected graph without any loops, while keeping the sum of edge weights as small as possible. This is what we as the space engineers are trying to find to save money--the way to connect all the stars in the constellation using the least materials possible.</p>
        <img src='/graph.png' alt='picture of undirected graph' className='tutorial_image_left' />
        <img src='/MST-of-graph.png' alt='picture of MST of undirected graph' className='tutorial_image_right' />
        <br></br>
        <h2>How does </h2>
        <Link to ="/tutorialtwo" className="next-button">Next</Link>
    </div>
  );
}