import {useState} from "react";

export default function ContsallationBox(){

    const [hoveredEdge, setHoveredEdge] = useState(null);
    const [hoveredNode, setHoveredNode] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    //read the constallation relevant to page


    //on node hover glow

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
    var width = 400;
    var height = 400;
    var padding =10;



    //scale nodes to position in box
    const nodes = stars.points.map(([x,y],id)=> ({
        id,
        x: padding + x * (width-padding*2),
        y:padding + y * (height-padding*2),

    }))

    //create edges and draw them
    const edges =stars.edges.map(([start,end], index)=>
    {
        //start and end nodes
        const a = nodes[start];
        const b =nodes[end];

        const edgeIsHovered = hoveredEdge === index;

        return (
            <line
                key={index}

                x1={a.x}
                y1={a.y}

                x2={b.x}
                y2={b.y}

                stroke={edgeIsHovered ? "royalblue" : "white"}
                onMouseEnter={() => setHoveredEdge(index)}
                onMouseLeave={() => setHoveredEdge(null)}
                style={{ cursor: "pointer" }}
                strokeWidth={edgeIsHovered ? 4 : 2}

            />
        )
    })

    const nodeElements = nodes.map((node,index) =>{
        const nodeIsHovered = hoveredNode === index;
        const nodeIsSelected = selectedNode === index;
        return (

            <circle
            key ={index}
            cx={node.x}
            cy={node.y}
            r={10}
            stroke={"white"}
            fill={nodeIsSelected ? "red" : nodeIsHovered ? "royalblue" : "white"}
            onMouseEnter={() => setHoveredNode(index)}
            onMouseLeave={() => setHovereddNode(null)}
            onMouseDown={() => setSelectedNode(index)}
            style={{ cursor: "pointer" }}
            strokeWidth={2}
        />)
    })


    return(
        <svg viewBox={`0 0 ${width} ${height}`}>

            {edges}
            {nodeElements}

        </svg>
    )


    //draw nodes










}