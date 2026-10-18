import { useState } from "react";
import TalkingText from "./talking-text";

export default function Dialogue({ lines }) {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < lines.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div>
        {lines.slice(0, index + 1).map((line, i) => (
          <div key={i}>
            {typeof line === "string" ? (
              <TalkingText text={line} />
            ) : line.type === "h2" ? (
              <h2><TalkingText text={line.text} /></h2>
            ) : (
              <p><TalkingText text={line.text} /></p>
            )}
          </div>
        ))}



      {index < lines.length - 1 && (
        <button onClick={handleNext} className="next-dialogue-button">
          Next
        </button>
      )}
    </div>
  );
}