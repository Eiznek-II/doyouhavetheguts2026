import { useState } from "react";
import { Link } from "react-router-dom";
import {getConstellation} from "../get_constellation";
import "../assets/styles/constellation-box.css";



export default function ConstellationLink({starName}) {
  const width = 100;
  const height = 100;
  const padding = 20; // room for the glow around the outer stars
  const link = "/game/" + starName;

  const stars = getConstellation(starName);

  const nodes = stars.points.map(([x,y])=> ({
        x: padding + x * (width-padding*2),
        y: padding + y * (height-padding*2),
    }))

    

  const nodeElements = nodes.map((node,index) =>(
        <g
            key={index}
            className="star-node"
        >
            <circle
                className="star-node__halo"
                cx={node.x}
                cy={node.y}
                r={7}
                style={{ animationDelay: `${index * 0.6}s` }}
            />
            <circle className="star-node__dot" cx={node.x} cy={node.y} r={3} />
        </g>
    ))

    const edgeElements = stars.edges.map(([start,end,weight],index)=>
    {
        //start and end nodes
        const a = nodes[start];
        const b = nodes[end];

    
        let edgeClass = "star-edge";

        return (
            <g
                className={edgeClass}
                key={index}
            >
                {/* the line you see */}
                <line className="star-edge__line" x1={a.x} y1={a.y}  x2={b.x} y2={b.y} />
                {/* a wider invisible line, so the edge is easy to hover and click */}
            </g>
        )
    }
)

  return (
    <Link to = {link} className="constellation-link">
    <div>
        <p>{starName}</p>
        <svg width={width} height={height}>
            {edgeElements}
            {nodeElements}
        </svg>
    </div>
    </Link>
  );
}