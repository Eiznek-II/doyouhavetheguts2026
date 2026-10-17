import "../assets/styles/home.css"

export default function Home() {
  return (
    <div className='home-page'>
      <h1>Home</h1>
      <div className = "text-box">
        <div className = "text">
          <p>You are a space engineer, building an intergalactic highway across a constellation!</p>
          <p>You need to figure out how to connect all the stars in the constellation using the minimum amount of materials.</p>
          <p>Intergalactic building companies don't have much money for materials, as most of their clients don't believe in aliens and refuse to pay someone they don't believe in :/</p>
          <p>But never fear! You can find the cheapest way to build the highway by finding the minimum spanning tree of the constellation, and we're going to show you how to do this using the Prim-Jarnik Algorithm!</p>
        </div>
      </div>
    </div>
  );
}
