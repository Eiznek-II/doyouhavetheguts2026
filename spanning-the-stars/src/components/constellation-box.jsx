import { useState, useRef, useEffect } from "react";
import "../assets/styles/constellation-box.css";

const padding = 30; // room for the glow around the outer stars
const MIN_ZOOM = 1;
const MAX_ZOOM = 100;
const DRAG_THRESHOLD = 5; // pixels the pointer has to move before it counts as a drag, not a click
const EASING = 0.2; // how much of the way to the target the camera moves each frame (higher = snappier)

const KEY_PAN_SPEED = 10; // pixels the view moves each frame while a WASD key is held

// which way each key moves the constellation on screen
const PAN_KEYS = {
    w: { x: 0, y: 1 },  // look up    -> stars move down
    a: { x: 1, y: 0 },  // look left  -> stars move right
    s: { x: 0, y: -1 }, // look down  -> stars move up
    d: { x: -1, y: 0 }, // look right -> stars move left
};

// keep the zoom in range (panning is unlimited - the reset button brings it back)
function clampView({ zoom, x, y }) {
    return { zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom)), x, y };
}

// glide the camera to a new position
// camera = { viewRef, targetRef, frameRef, setView } - it lives out here (not inside the component)
// so the keyboard code below can use it from inside a useEffect
function glideCamera(camera, target) {
    const { viewRef, targetRef, frameRef, setView } = camera;
    targetRef.current = clampView(target);
    if (frameRef.current) return; // already animating - it'll pick up the new target

    function step() {
        const v = viewRef.current;
        const t = targetRef.current;
        const next = {
            zoom: v.zoom + (t.zoom - v.zoom) * EASING,
            x: v.x + (t.x - v.x) * EASING,
            y: v.y + (t.y - v.y) * EASING,
        };
        const done =
            Math.abs(t.zoom - next.zoom) < 0.001 &&
            Math.abs(t.x - next.x) < 0.5 &&
            Math.abs(t.y - next.y) < 0.5;

        viewRef.current = done ? t : next;
        setView(viewRef.current);
        frameRef.current = done ? null : requestAnimationFrame(step);
    }
    frameRef.current = requestAnimationFrame(step);
}

const solution = [4, 0, 1, 2]



export default function ConstellationBox({onCheckReady, stars}){

    // the star the player starts from (null = not picked yet)
    const [startNode, setStartNode] = useState(null);

    // the edges the player has clicked (golden)
    const [chosenEdges, setChosenEdges] = useState([]);

    //animation state
    // const [animation, setAnimation] = useState(0)

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

    //get size of box - measured from the page, so the graph fills all the space it has
    const containerRef = useRef(null);
    const sizeRef = useRef({ width: 400, height: 400 });
    const [size, setSize] = useState({ width: 400, height: 400 });

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            const boxWidth = entry.contentRect.width;
            // as wide as the space allows, but never taller than 75% of the screen
            const newSize = { width: boxWidth, height: Math.min(boxWidth, window.innerHeight * 0.75) };
            sizeRef.current = newSize;
            setSize(newSize);
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const { width, height } = size;

    // ---------- camera (zoom + pan) ----------
    // view   = what's drawn right now
    // target = where the camera is heading - every frame, view moves a bit closer to target,
    //          which is what makes zooming and panning glide instead of jump
    const svgRef = useRef(null);
    const [view, setView] = useState({ zoom: 1, x: 0, y: 0 });
    const viewRef = useRef({ zoom: 1, x: 0, y: 0 });
    const targetRef = useRef({ zoom: 1, x: 0, y: 0 });
    const frameRef = useRef(null);

    const dragRef = useRef(null);      // info about the drag in progress (null = not dragging)
    const wasDragRef = useRef(false);  // true if the last press was a drag, so it shouldn't count as a click
    const [dragging, setDragging] = useState(false);

    // glide the camera to a new position
    function animateTo(target) {
        glideCamera({ viewRef, targetRef, frameRef, setView }, target);
    }

    // WASD to pan - holding a key keeps moving, and it glides to a stop when you let go
    useEffect(() => {
        const camera = { viewRef, targetRef, frameRef, setView };
        const keysHeld = new Set();
        let keyFrame = null;

        function moveWhileHeld() {
            if (keysHeld.size === 0) {
                keyFrame = null;
                return;
            }
            let dx = 0;
            let dy = 0;
            keysHeld.forEach((key) => {
                dx += PAN_KEYS[key].x;
                dy += PAN_KEYS[key].y;
            });
            const t = targetRef.current;
            glideCamera(camera, { ...t, x: t.x + dx * KEY_PAN_SPEED, y: t.y + dy * KEY_PAN_SPEED });
            keyFrame = requestAnimationFrame(moveWhileHeld);
        }

        function handleKeyDown(e) {
            // don't pan while typing in a box, or for shortcuts like ctrl+s / cmd+a
            const tag = e.target.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.target.isContentEditable) return;
            if (e.ctrlKey || e.metaKey || e.altKey) return;

            const key = e.key.toLowerCase();
            if (!PAN_KEYS[key]) return;
            e.preventDefault();
            keysHeld.add(key);
            if (!keyFrame) keyFrame = requestAnimationFrame(moveWhileHeld);
        }

        function handleKeyUp(e) {
            keysHeld.delete(e.key.toLowerCase());
        }

        // if the window loses focus while a key is held, the key-up never arrives - so let go of everything
        function handleBlur() {
            keysHeld.clear();
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("blur", handleBlur);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("blur", handleBlur);
            cancelAnimationFrame(keyFrame);
        };
    }, []);

    // stop any animation when leaving the page
    useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

    // zoom by a factor, keeping the point (mouseX, mouseY) in the same place on screen
    function zoomAt(factor, mouseX, mouseY) {
        const t = targetRef.current;
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, t.zoom * factor));
        const ux = mouseX - padding;
        const uy = mouseY - padding;
        animateTo({
            zoom: newZoom,
            x: ux - (ux - t.x) * (newZoom / t.zoom),
            y: uy - (uy - t.y) * (newZoom / t.zoom),
        });
    }

    function zoomButton(factor) {
        zoomAt(factor, width / 2, height / 2);
    }

    function resetView() {
        animateTo({ zoom: 1, x: 0, y: 0 });
    }

    // mouse wheel / trackpad zoom
    // added by hand (not onWheel) because React's onWheel can't stop the page scrolling at the same time
    useEffect(() => {
        const svg = svgRef.current;
        function handleWheel(e) {
            e.preventDefault();
            const rect = svg.getBoundingClientRect();
            zoomAt(Math.exp(-e.deltaY * 0.002), e.clientX - rect.left, e.clientY - rect.top);
        }
        svg.addEventListener("wheel", handleWheel, { passive: false });
        return () => svg.removeEventListener("wheel", handleWheel);
    });

    // ---------- dragging to pan ----------
    function handlePointerDown(e) {
        if (e.button !== 0) return; // left mouse button / finger only
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            panX: targetRef.current.x,
            panY: targetRef.current.y,
            moved: false,
            lastX: e.clientX,
            lastY: e.clientY,
            lastTime: e.timeStamp,
            speedX: 0,
            speedY: 0,
        };
        wasDragRef.current = false;
    }

    function handlePointerMove(e) {
        const drag = dragRef.current;
        if (!drag) return;

        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;

        // don't start dragging until the pointer has moved a bit - otherwise every click is a tiny drag
        if (!drag.moved) {
            if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
            drag.moved = true;
            wasDragRef.current = true;
            e.currentTarget.setPointerCapture(e.pointerId); // keep dragging even if the pointer leaves the box
            setDragging(true);
        }

        // remember how fast it's moving, for the glide when you let go
        const dt = Math.max(1, e.timeStamp - drag.lastTime);
        drag.speedX = (e.clientX - drag.lastX) / dt;
        drag.speedY = (e.clientY - drag.lastY) / dt;
        drag.lastX = e.clientX;
        drag.lastY = e.clientY;
        drag.lastTime = e.timeStamp;

        // while dragging, the view follows the pointer exactly (no lag)
        const next = clampView({ zoom: targetRef.current.zoom, x: drag.panX + dx, y: drag.panY + dy });
        targetRef.current = next;
        viewRef.current = { ...viewRef.current, x: next.x, y: next.y };
        setView(viewRef.current);
    }

    function handlePointerUp() {
        const drag = dragRef.current;
        dragRef.current = null;
        if (!drag || !drag.moved) return;

        setDragging(false);
        // keep gliding a little in the direction it was thrown
        const t = targetRef.current;
        animateTo({ zoom: t.zoom, x: t.x + drag.speedX * 150, y: t.y + drag.speedY * 150 });
    }

    //scale nodes to position in box
    const nodes = stars.points.map(([x,y],id)=> ({
        id,
        x: padding + x * (width-padding*2) * view.zoom + view.x,
        y: padding + y * (height-padding*2) * view.zoom + view.y,
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
        if (wasDragRef.current) return; // that was a drag, not a click
        if (canChooseEdge(index)) {
            toggleEdge(index);
        }
    }

    // return function
    function resetConstellation() {
        setStartNode(null);
        setChosenEdges([]);
    }

    // click a star to start from it - only works before a start is picked
    function pickStart(nodeIndex) {
        if (wasDragRef.current) return; // that was a drag, not a click
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
        // setAnimation(run => run +1)

    }

    let svgClass = "constellation";
    if (pickingStart) svgClass += " picking-start";
    if (dragging) svgClass += " dragging";
    if (result) svgClass += result;

    useEffect(() => {onCheckReady(()=>check);
    },[onCheckReady,chosenEdges])

    return(
        <div ref={containerRef} className="constellation-viewport">
            <svg
                ref={svgRef}
                className={svgClass}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
            >
                {edgeElements}
                {nodeElements}
            </svg>

            <div className="constellation-controls">
                <button onClick={() => zoomButton(1.5)} aria-label="Zoom in">+</button>
                <button onClick={() => zoomButton(1 / 1.5)} aria-label="Zoom out">−</button>
                <button onClick={resetView} aria-label="Reset view">⟲</button>
            </div>
        </div>

    )
}