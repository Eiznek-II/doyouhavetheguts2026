import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>You are a space engineer, building an intergalactic highway across a constellation!</p>
      <p>You need to figure out how to connect all the stars in the constellation using the minimum amount of materials.</p>
      <p>Intergalactic building companies don't have much money for materials, as most of their clients don't believe in aliens and refuse to pay someone they don't believe in :/</p>
      <p>But never fear! You can find the cheapest way to build the highway by finding the minimum spanning tree of the constellation, and we're going to show you how to do this using the Pimm-Jarnik Algorithm!</p>
      <Link to="/game">Play the Game</Link>
    </div>
  );
}
