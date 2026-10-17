function prims_alg(edges, numPoints, firstPoint){
    let minSpanningTree = new Set();
    let minSpanningTreeArr = [];
    let keys = new Array(numPoints).fill(Infinity);
    let currentEdges = new Array(numPoints).fill(null);
    let finalEdges = []
    keys[firstPoint] = 0
    while (minSpanningTree.size < numPoints){
        minVertex = 0
        for (let i = 1;i<numPoints;i++){
            if (keys[i] < keys[minVertex] && ! (minSpanningTree.has(keys[i]))){
                minVertex = i
            }
        }
        minSpanningTreeArr.push(minVertex)
        minSpanningTree.add(minVertex)
        finalEdges.push(edges[minVertex])
        for (let i = 0; i < edges.length; i++){
            if (edges[i][0] == minVertex ){
                if(keys[edges[i][1]]<edges[i][2]){
                   keys[edges[i][1]] =  keys[edges[i][1]]
                   currentEdges[edges[i][1]] = edges[i]
                }
            }
            else if (edges[i][1] == minVertex ){
                if(keys[edges[i][0]]<edges[i][2]){
                   keys[edges[i][0]] =  edges[i][2]
                   currentEdges[edges[i][0]] = edges[i]
                }
            }
        }

    }
    return minSpanningTreeArr, finalEdges
}