import { useState } from "react";
import "./info-box.css";

const sections = [
        {
          title: "History of the Prim-Jarnik Algorithm",
          content: "The algorithm was devloped in 1930 by a mathmatician called Vojtěch Jarník. Later was rediscovered by Joseph Kruskal in 1956, Robert C. Prim in 1957 and Edgar W. Dijkstra in 1959. Therefore this algorithm has a lot of names.",
        },
        {
          title: "What is a minimum spanning tree (MST)?",
          content: "A spanning tree is a subset of a graph (or constellation!) such that all the vertices are connected using the minimum possible number of edges. A minimum spanning tree is a spanning tree that has the minimum weight among all the possible spanning trees.",
        },
        {
          title: "What is the Prim-Jarnik Algorithm for MST?",
          content: "Prim-Jarnik algorithm is a Greedy algorithm, meaning it makes the locally optimal choice at each step with the hope of finding a global optimum solution. In the Prim-Jarnik Algorithm, we start with a single node and move through several adjacent nodes, in order to explore all of the connected edges."
        },
        {
          title: "Instructions",
          content: "1: Pick the node (star) you want to start. \n2: Use the Prim-Jarnik Algorithm to find the minimum spanning tree. \n3: When you are finished press Done to see if you are correct. \nReminder if you are stuck press Hint."
        },
        {
          title: "Controls",
          content: "Use the top right hand corner buttons to zoom in and out, and reset your zoom. \nClick on the vertexes and edges to select them. \nYou can click on your most recent selection again to deselect. If you want to restart, click the reset button at the bottom. \nUse the hint button for a hint, and the done button to check if you're correct!"
        },
        {
          title: "Why are the numbers like this?",
          content: "The weight on each edge is the distance between those two stars in light years - the distance light travels in a year. Sometimes the distances between stars in constellations is misleading, because a constellation is a 2-D projection of a 3-D group of stars. This is why the Prim-Jarník algorithm is so useful - minimum spanning trees can be unintuitive! "
        },
        {
          title: "Help",
          content: "You must have found the MST in the correct order by going through the algorithm, in order for your solution to be marked correct"
        }

];

export default function InfoBox() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="info-box-list">
      {sections.map((section, index) => (
        <div className="info-box" key={section.title}>
          <button
            className="info-box__button"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
            aria-expanded={openIndex === index}
          >
            {section.title}
            <span>{openIndex === index ? "−" : "+"}</span>
          </button>

          {openIndex === index && (
            <div className="info-box__content">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}