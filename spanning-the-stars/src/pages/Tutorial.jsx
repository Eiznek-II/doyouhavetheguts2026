import "../assets/styles/tutorial.css"
import { Link } from "react-router-dom"
import TalkingText from "../components/talking-text"
import Dialogue from "../components/dialogue";



export default function Tutorial() {
  return (
    <div>
        <h1>Tutorial</h1>
        <div className='tutorial_info'>
            <div className="character-box">
            <img src="/alien.png" alt="Guide" className="character" />
            <Dialogue
                lines={[
                "Hi! I'm your alien engineer friend. Let's go through this together!",
                "What is this minimum spanning tree I'm finding?",
                "A spanning tree is a sub-graph that connects all vertices of an undirected graph without any loops. In practical terms, any highway that connects all stars in the constellation without going back to any of them more than once. A minimum spanning tree is a sub-graph that connects all vertices of an undirected graph without any loops, while keeping the sum of edge weights as small as possible. This is what we as the space engineers are trying to find to save money--the way to connect all the stars in the constellation using the least materials possible.",
                "How does the Prim-Jarnik Algorithm help me find the MST?",
                "This is a 'greedy' algorithm which means it chooses the best, in this case the cheapest, option at each step. If the cheapest option is chosen at each step, the overall spanning tree will be the cheapest possible option. Very helpful for our intergalactic engineers!",
                "What is the pseudocode for the Prim-Jarnik Algorithm?",
                "We'll go through this one step-by-step!",
                "First, set an arbitrary vertex u to be a tree-vertex (tv) and set all other vertices to be non-tree-vertices (ntv)",
                "then, while the number of ntv is less than 0:",
                "find edge e = (v,w) of graph such that v is a tv, w is an ntv, and weight(e) is minimised over all such edges",
                "adjoin edge e to the (spanning) tree",
                "make w a tv",
                "continue while until done",
                "Hope this tutorial was helpful! :)"
                ]}
            />
            </div>
        </div>
        <Link to ="/tutorialtwo" className="next-button">Now try it yourself!</Link>
    </div>
  );
}