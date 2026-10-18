import { useState } from "react";
import {useEffect} from "react";
import "../assets/styles/constellation-box.css";

const stars = {
    points : [ [0.5, 0], [0.975,0.345],[0.794,0.904],[0.206,0.904],[0.02,0.345]],
    edges : [[0,2,12],[2,4,4], [4,1,3],[1,3,400],[3,0,1]]
}

const solution =[4,0,1,2]



export default function ConstellationBox({onCheckReady}){

    // the star the player starts from (null = not picked yet)
    const [startNode, setStartNode] = useState(null);

    // the edges the player has clicked (golden)
    const [chosenEdges, setChosenEdges] = useState([]);

    //animation state
    const [animation, setAnimation] = useState(0)

    //result state
    const[result,setResult] = useState(null)

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

    // can this edge be clicked right now?
    function canChooseEdge(index){

        //make sure is not picking node
        if (pickingStart) return false;

        //allow for deselect - only the last edge picked
        if (chosenEdges.includes(index)) {
            const topStack = chosenEdges[chosenEdges.length - 1];
            return index === topStack;
        }

        const [start, end] = stars.edges[index];

        //check if fist edge connected to first node
        if(chosenEdges.length===0){
            return start === startNode || end === startNode;
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

        return isConnected;
    }

    function chooseEdge(index){
        if (canChooseEdge(index)) {
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
    const edgeElements = stars.edges.map(([start,end,weight], index)=>
    {
        //start and end nodes
        const a = nodes[start];
        const b = nodes[end];

        const labelX = (a.x + b.x) / 2;
        const labelY = (a.y + b.y) / 2;
        const labelWidth = 10 + String(weight).length * 8;

        const length = Math.hypot(b.x - a.x, b.y - a.y);
        const gap = labelWidth / 2 + 4;
        const gapX = ((b.x - a.x) / length) * gap;
        const gapY = ((b.y - a.y) / length) * gap;

        let angle = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
        if (angle > 90) angle -= 180;
        if (angle < -90) angle += 180;

        const edgeIsChosen = chosenEdges.includes(index)
        const edgeOrder = chosenEdges.indexOf(index);
        const edgeIsChoosable = canChooseEdge(index);

        let edgeClass = "star-edge";
        if (edgeIsChosen) edgeClass += " chosen";
        if (edgeIsChoosable) edgeClass += " choosable";

        return (
            <g
                key={index}
                className={edgeClass}
                onClick={() => chooseEdge(index)}

                //depending on order will have more delay, allows for done animations
                style={{
                    "--edge-delay": `${edgeOrder*2}s`
                }}
            >
                {/* the line you see */}
                <line className="star-edge__line" x1={a.x} y1={a.y} x2={labelX - gapX} y2={labelY - gapY} />
                <line className="star-edge__line" x1={labelX + gapX} y1={labelY + gapY} x2={b.x} y2={b.y} />
                {/* a wider invisible line, so the edge is easy to hover and click */}
                <line className="star-edge__hit-area" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
                <text
                    className="star-edge__label"
                    x={labelX}
                    y={labelY}
                    transform={`rotate(${angle} ${labelX} ${labelY})`}
                >
                    {weight}
                </text>
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
            <circle
                className="star-node__halo"
                cx={node.x}
                cy={node.y}
                r={14}
                style={{ animationDelay: `${index * 0.6}s` }}
            />
            <circle className="star-node__dot" cx={node.x} cy={node.y} r={5} />
            {/* a bigger invisible circle, so the star is easy to click */}
            <circle className="star-node__hit-area" cx={node.x} cy={node.y} r={14} />
        </g>
    ))



    function check(){
        console.log("Checking...");
        console.log(chosenEdges);

        if (chosenEdges.length=== solution.length &&
            chosenEdges.every(item => solution.includes(item))){
                console.log("yay")
                setResult("true")
        }
        else{
            setResult("false")
            console.log ("nay")
        }

        //runs animations
        setAnimation(run => run +1)

    }

    useEffect(() => {onCheckReady(()=>check);
    },[onCheckReady,chosenEdges])


    return(

        <svg
            key={animation}
            className={`constellation ${
                pickingStart ? "picking-start" : ""
            } ${result ? result : ""}`}
            viewBox={`0 0 ${width} ${height}`}
        >
            {edgeElements}
            {nodeElements}
        </svg>
    )
}
