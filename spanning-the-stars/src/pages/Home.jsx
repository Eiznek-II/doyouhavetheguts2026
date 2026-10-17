import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Home page.</p>
      <Link to="/game">Play the Game</Link>
    </div>
  );
}
