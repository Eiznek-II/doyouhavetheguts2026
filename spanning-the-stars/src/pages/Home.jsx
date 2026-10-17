import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>You are a space engineer, building an intergalactic highway for a constellation!</p>
      <p>You don't have a </p>
      <Link to="/game">Play the Game</Link>
    </div>
  );
}
