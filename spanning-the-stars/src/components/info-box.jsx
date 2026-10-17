import { useState } from "react";
import "./info-box.css";

const sections = [
        {
          title: "History of the Prim-Jarnik Algorithm",
          content: "history...",
        },
        {
          title: "What is a minimum spanning tree (MST)?",
          content: "A spanning tree is a subset of a graph (or constellation!) such that all the vertices are connected using the minimum possible number of edges. A minimum spanning tree is a spanning tree that has the minimum weight among all the possible spanning trees.",
        },
        {
          title: "What is the Prim-Jarnik Algorithm for MST?",
          content: "Prim-Jarnik algorithm is a Greedy algorithm, meaning it makes the locally optimal choice at each step with the hope of finding a global optimum solution. In the Prim-Jarnik Algorithm, we start with a single node and move through several adjacent nodes, in order to explore all of the connected edges."
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