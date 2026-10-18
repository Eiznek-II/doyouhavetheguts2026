import './code-box.css'

// every line is the same height, so we know where to slide the green bar
const LINE_HEIGHT = 22

// the area holding the lines
const linesStyle = {
  height: '100%',
  overflowY: 'auto', // scroll if there are too many lines
  position: 'relative', // so the green bar is placed inside this area
}

// each line of text
const lineStyle = {
  position: 'relative', // keeps the text on top of the green bar
  height: `${LINE_HEIGHT}px`,
  lineHeight: `${LINE_HEIGHT}px`,
  padding: '0 16px',
  whiteSpace: 'pre', // keep spaces exactly as written
}


// lines:         the text to show, one string per line
// highlightLine: which line is green (0 = first line)
// isOpen:        true = slid in, false = hidden off the right side of the screen
export default function CodeBox({ lines, highlightLine, isOpen }) {
  return (
    <div className={isOpen ? 'code-box code-box--open' : 'code-box'}>
      <div style={linesStyle}>
        {/* move the bar down one line height per line */}
        <div
          style={{
            transform: `translateY(${highlightLine * LINE_HEIGHT}px)`,
          }}
        />

        {lines.map((line, index) => (
          <div key={index} style={lineStyle}>
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}
