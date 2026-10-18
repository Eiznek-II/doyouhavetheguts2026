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
            <TalkingText key={i} text={line} />
        ))}


      {index < lines.length - 1 && (
        <button onClick={handleNext} className="next-dialogue-button">
          Next
        </button>
      )}
    </div>
  );
}