import "../assets/styles/tutorial.css"
import { Link } from "react-router-dom";


export default function Tutorial() {
  return (
    <div>
        <h1>Tutorial</h1>
        <div className='tutorial_info'>
        <h2>What is this minimum spanning tree I'm finding?</h2>
        <p>A spanning tree is a sub-graph that connects all vertices of an undirected graph without any loops. In practical terms, any highway that connects all stars in the constellation without going back to any of them more than once.</p>
        <p>A minimum spanning tree is a sub-graph that connects all vertices of an undirected graph without any loops, while keeping the sum of edge weights as small as possible. This is what we as the space engineers are trying to find to save money--the way to connect all the stars in the constellation using the least materials possible.</p>
        <br></br>
        <h2>How does the Prim-Jarnik Algorithm help me find the MST?</h2>
        <p>This is a 'greedy' algorithm which means it chooses the best, in this case the cheapest, option at each step. If the cheapest option is chosen at each step, the overall spanning tree will be the cheapest possible option. Very helpful for our intergalactic engineers!</p>
        <br></br>
        <h2>What is the pseudocode for the Prim-Jarnik Algorithm?</h2>
        <p>set an arbitrary vertex u to be a tree-vertex (tv)</p>
        <p>set all other vertices to be non-tree-vertices (ntv)</p>
        <p>while (number of ntv is less than 0):</p>
        <p>find edge e = (v,w) of graph such that v is a tv, w is an ntv, and weight(e) is minimised over all such edges</p>
        <p>adjoin edge e to the (spanning) tree</p>
        <p>make w a tv</p>
        <p>end while</p>
        <br></br>
        </div>
        <Link to ="/tutorialtwo" className="next-button">Now try it yourself!</Link>
    </div>
  );
}