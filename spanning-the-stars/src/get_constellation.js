export function getConstellation(starName){
  if (starName == "tutorial1"){
    return {
      points : [ [0.5, 0], [0.975,0.345],[0.794,0.904],[0.206,0.904],[0.02,0.345]],
      edges : [[0,2,12],[2,4,4], [4,1,3],[1,3,400],[3,0,1]]
    }
  }
}
