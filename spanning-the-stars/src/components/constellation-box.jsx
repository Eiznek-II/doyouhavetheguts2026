"use client";

import {useEffect, useRef} from "react";

export default function ContsallationBox(){
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        ctx.strokeStyle = "#8600ee"
        ctx.fillStyle = "#ffff00";

        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, Math.PI * 2);
        ctx.fill();

    }, []);

    return (
        <div className="canvas">
            <h1>canvas here</h1>
            <canvas id="mainCanvas"
                    ref={canvasRef}
                    width={600}
                    height={600}
            />
        </div>
    )
    })



}