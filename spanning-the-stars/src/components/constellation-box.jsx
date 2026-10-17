import { useState } from "react";
import "../assets/styles/constellation-box.css";

export default function ConstellationBox(){

    // the edges the player has clicked (golden)
    const [chosenEdges, setChosenEdges] = useState([]);

    //read the constallation relevant to page


    //edges can be inactive or active

    //add and remove active edges and apply correct styling

    // have weight viable, and have hover effect

    //we need an alien friend

    //we need the teaching alien


    //start up animation showing the original

    //animate teaching alien along with psudocode

    const stars = {
        points : [ [0.5, 0], [0.975,0.345],[0.794,0.904],[0.206,0.904],[0.02,0.345]],
        edges : [[0,2,12],[2,4,4], [4,1,3],[1,3,400],[3,0,1]]
    }

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

    // a node is golden if any chosen edge touches it
    function nodeIsChosen(nodeIndex) {
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
                onClick={() => toggleEdge(index)}
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
        <circle
            key={index}
            className={nodeIsChosen(index) ? "star-node chosen" : "star-node"}
            cx={node.x}
            cy={node.y}
            r={5}
        />
    ))

    return(
        <svg className="constellation" viewBox={`0 0 ${width} ${height}`}>
            {edgeElements}
            {nodeElements}
        </svg>
    )
}
