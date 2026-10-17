import { useState } from "react";
import "../assets/styles/constellation-box.css";

const stars = {
    points : [ [0.5, 0], [0.975,0.345],[0.794,0.904],[0.206,0.904],[0.02,0.345]],
    edges : [[0,2,12],[2,4,4], [4,1,3],[1,3,400],[3,0,1]]
}

export default function ConstellationBox(){

    // the star the player starts from (null = not picked yet)
    const [startNode, setStartNode] = useState(null);

    // the edges the player has clicked (golden)
    const [chosenEdges, setChosenEdges] = useState([]);

    // at the beginning, the player can only pick a starting star
    const pickingStart = startNode === null;

    //read the constallation relevant to page

    //edges can be inactive or active

    //add and remove active edges and apply correct styling

    // have weight viable, and have hover effect

    //we need an alien friend

    //we need the teaching alien


    //start up animation showing the original

    //animate teaching alien along with psudocode

    //get size of box - might need to change this if we want website to be reactive, might need to update page
    const width = 400;
    const height = 400;
    const padding = 20; // room for the glow around the outer stars

    //scale nodes to position in box
    const nodes = stars.points.map(([x,y],id)=> ({
        id,
        x: padding + x * (width-padding*2),
        y: padding + y * (height-padding*2),
    }))

    // click an edge to choose it, click again to unchoose it
    function toggleEdge(index) {

       if (chosenEdges.includes(index)) {

            setChosenEdges(chosenEdges.filter((i) => i !== index));
        } else {

            setChosenEdges([...chosenEdges, index]);
        }
    }

    function chooseEdge(index){

        //make sure is not picking node
        if (pickingStart) return;

        //allow for deselect
        if (chosenEdges.includes(index)) {

            const topStack = chosenEdges[chosenEdges.length - 1];

            if(index === topStack){
                toggleEdge(index);
            }

            return;

        }

        const edge = stars.edges[index];
        const start = edge[0];
        const end = edge[1];

        //check if fist edge connected to first node
        if(chosenEdges.length===0){
            if(start ===startNode || end === startNode){
                toggleEdge(index);
            }
            return;
        }

        //check is connected

        const isConnected = chosenEdges.some((edgeIndex) =>{
            const [a,b] = stars.edges[edgeIndex];

            return(
                start === a ||
                start ===b ||
                end === a ||
                end === b
            )
        })

        if(isConnected){
            toggleEdge(index);
        }


    }

    // click a star to start from it - only works before a start is picked
    function pickStart(nodeIndex) {
        if (pickingStart) {
            setStartNode(nodeIndex);
        }
    }

    // a node is golden if it's the start, or any chosen edge touches it
    function nodeIsChosen(nodeIndex) {
        if (nodeIndex === startNode) {
            return true;
        }
        return chosenEdges.some((edgeIndex) => {
            const [start, end] = stars.edges[edgeIndex];
            return start === nodeIndex || end === nodeIndex;
        });
    }

    //create edges and draw them
    const edgeElements = stars.edges.map(([start,end], index)=>
    {
        //start and end nodes
        const a = nodes[start];
        const b = nodes[end];

        const edgeIsChosen = chosenEdges.includes(index);

        return (
            <g
                key={index}
                className={edgeIsChosen ? "star-edge chosen" : "star-edge"}
                onClick={() => chooseEdge(index)}
            >
                {/* the line you see */}
                <line className="star-edge__line" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
                {/* a wider invisible line, so the edge is easy to hover and click */}
                <line className="star-edge__hit-area" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
            </g>
        )
    })

    //draw nodes
    const nodeElements = nodes.map((node,index) =>(
        <g
            key={index}
            className={nodeIsChosen(index) ? "star-node chosen" : "star-node"}
            onClick={() => pickStart(index)}
        >
            {/* the star you see */}
            <circle className="star-node__dot" cx={node.x} cy={node.y} r={5} />
            {/* a bigger invisible circle, so the star is easy to click */}
            <circle className="star-node__hit-area" cx={node.x} cy={node.y} r={14} />
        </g>
    ))

    return(
        <svg
            className={pickingStart ? "constellation picking-start" : "constellation"}
            viewBox={`0 0 ${width} ${height}`}
        >
            {edgeElements}
            {nodeElements}
        </svg>
    )
}
