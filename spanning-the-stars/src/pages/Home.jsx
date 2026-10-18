import { useState } from "react";
import "../assets/styles/home.css"
import ConstellationLinkBox from "../components/constellation-link-box";


export default function Home() {
  const [isOpen, setIsOpen] = useState(true)

  function openConstellation() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="home-page">
      <div className='container'>
        <h1>Spanning the Stars</h1>
        <button onClick={openConstellation}
                className = "collapsible">Constellation </button>
        {isOpen && (   
          <div className = "text-box">
            <div className = "text">
              <p>You are a space engineer, building an intergalactic highway across a constellation!</p>
              <p>You need to figure out how to connect all the stars in the constellation using the minimum amount of materials.</p>
              <p>Intergalactic building companies don't have much money for materials, as most of their clients don't believe in aliens and refuse to pay someone they don't believe in :/</p>
              <p>But never fear! You can find the cheapest way to build the highway by finding the minimum spanning tree of the constellation, and we're going to show you how to do this using the Prim-Jarnik Algorithm!</p>
            </div>
          </div>
        )}

        {!isOpen && (
          <ConstellationLinkBox></ConstellationLinkBox>
        )}
      </div>
  </div>
  );
}
