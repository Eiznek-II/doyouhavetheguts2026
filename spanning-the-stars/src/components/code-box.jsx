// code box stile
const boxStyle = {
  position: 'fixed',
  bottom: '5px',
  right: '5px',
  width: '320px',
  height: '180px',
  padding: '12px 0',
  boxSizing: 'border-box',
  background: '#0d0d0d',
  color: '#e6e6e6',
  borderRadius: '10px',
  fontFamily: 'var(--mono)', // the code font from index.css
  fontSize: '13px',
  textAlign: 'left',
}

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

// the green bar that slides behind the highlighted line
const highlightBarStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: `${LINE_HEIGHT}px`,
  background: 'rgba(46, 204, 113, 0.2)',
  borderLeft: '3px solid #2ecc71',
  transition: 'transform 0.25s ease-out', // the slide animation
}

// lines:         the text to show, one string per line
// highlightLine: which line is green (0 = first line)
export default function CodeBox({ lines, highlightLine }) {
  return (
    <div style={boxStyle}>
      <div style={linesStyle}>
        {/* move the bar down one line height per line */}
        <div
          style={{
            ...highlightBarStyle,
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
