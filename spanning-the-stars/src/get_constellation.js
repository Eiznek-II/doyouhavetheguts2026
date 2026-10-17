import jsonData from './assets/constellations.json';

export function getConstellation(starName){
  if (starName == "Tutorial 1"){
    return roundEdges({
      points : [ [0.5, 0], [0.975,0.345],[0.794,0.904],[0.206,0.904],[0.02,0.345]],
      edges : [[0,2,12],[2,4,4], [4,1,3],[1,3,400],[3,0,1]]
    })
  }
  else{
    return roundEdges(jsonData[starName])
  }
}

export function getRandomConstellation(){
  // jsonData is an object ({ "Andromeda": {...} }), so pick a random name first
  const names = Object.keys(jsonData);
  const name = names[Math.floor(Math.random() * names.length)];
  return { name, ...roundEdges(jsonData[name]) };
}

// round every edge weight to a whole number (12.7 -> 13)
// makes a copy, so the original data isn't changed
function roundEdges(constellation){
  if (!constellation) return constellation

  return {
    ...constellation,
    edges: constellation.edges.map(([start, end, weight]) => [start, end, Math.round(weight)])
  }
}
