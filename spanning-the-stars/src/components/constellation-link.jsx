import { useState } from "react";
import { Link } from "react-router-dom";
import {getConstellation} from "../get_constellation";



export default function ConstellationLink(starName) {
  const width = 400;
  const height = 400;
  const padding = 20; // room for the glow around the outer stars
  const link = "/" + starName;

  const nodeElements = nodes.map((node,index) =>(
        <g
            key={index}
        >
            <circle
                className="star-node__halo"
                cx={node.x}
                cy={node.y}
                r={14}
                style={{ animationDelay: `${index * 0.6}s` }}
            />
        </g>
    ))

  return (
    <Link to = {link} className="constellation-link">
    <div className="constellation-link">
        <p>{starName}</p>
        <svg>
            {edgeElements}
            {nodeElements}
        </svg>
    </div>
    </Link>
  );
}