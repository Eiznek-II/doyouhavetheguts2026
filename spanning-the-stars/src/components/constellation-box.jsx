import { useState} from "react";

export default function ContsallationBox(){

    const [selectedEdge, setSelectedEdge] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    //read the constallation relevant to page

    //create nodes

    //create edges

    //on node hover glow

    //edges can be inactive or active

    //start up animation showing the original constellation



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

        const edgeIsSelected = selectedEdge === index;

        return (
            <line
                key={index}

                x1={a.x}
                y1={a.y}

                x2={b.x}
                y2={b.y}

                stroke={edgeIsSelected ? "royalblue" : "white"}
                onMouseEnter={() => setSelectedEdge(index)}
                onMouseLeave={() => setSelectedEdge(null)}
                style={{ cursor: "pointer" }}
                strokeWidth={edgeIsSelected ? 4 : 2}

            />
        )
    })

    const nodeElements = nodes.map((node,index) =>{
        const nodeIsSelected = selectedNode === index;
        return (

            <circle
            key ={index}
            cx={node.x}
            cy={node.y}
            r={5}
            stroke={"white"}
            fill={nodeIsSelected ? "royalblue" : "white"}
            onMouseEnter={() => setSelectedNode(index)}
            onMouseLeave={() => setSelectedNode(null)}
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