import jsonData from './assets/constellations.json';

export function getConstellation(starName){
  if (starName == "Tutorial 1"){
    return cleanEdges({
      points : [ [0.5, 0], [0.975,0.345],[0.794,0.904],[0.206,0.904],[0.02,0.345]],
      edges : [[0,2,12],[2,4,4], [4,1,3],[1,3,400],[3,0,1]]
    })
  }
  else{
    return cleanEdges(jsonData[starName])
  }
}

export function getRandomConstellation(){
  // jsonData is an object ({ "Andromeda": {...} }), so pick a random name first
  const names = Object.keys(jsonData);
  const name = names[Math.floor(Math.random() * names.length)];
  return { name, ...cleanEdges(jsonData[name]) };
}

// tidy up the edges:
// - round every edge weight to a whole number (12.7 -> 13)
// - remove edges from a star to itself
// - remove repeated edges (the data often has both [1, 2] and [2, 1]) - otherwise the same line
//   is drawn twice and the two weight labels sit on top of each other.
//   if the copies have different weights, keep the bigger one (the other is usually a bogus 0)
// makes a copy, so the original data isn't changed
function cleanEdges(constellation){
  if (!constellation) return constellation

  const edgesByPair = new Map()
  for (const [start, end, weight] of constellation.edges) {
    if (start === end) continue

    const pair = start < end ? `${start}-${end}` : `${end}-${start}`
    const existing = edgesByPair.get(pair)
    if (!existing || weight > existing[2]) {
      edgesByPair.set(pair, [start, end, weight])
    }
  }

  return {
    ...constellation,
    edges: [...edgesByPair.values()].map(([start, end, weight]) => [start, end, Math.round(weight)])
  }
}

export function getAllConstellationNames(){
  let names = []
  console.log(jsonData)
  Object.keys(jsonData).forEach(element => { names.push(element)});
  console.log(names)
  return names
}
