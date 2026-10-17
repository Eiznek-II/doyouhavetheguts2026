


export function prims_animated(edges, numPoints, firstPoint){
    let minSpanningTree = new Set();
    let minSpanningTreeEdges = [];

    //dont know
    let edgeStack =[];
    let nodeStack=[]

    minSpanningTree.add(firstPoint);


    let currentEdges = new Set();
    currentEdges = get_valid_edges(firstPoint, currentEdges, minSpanningTree);
    while (minSpanningTree.size < numPoints){

        let newEdge = get_min_edge(edge_set);
        edgeStack.push(newEdge);
        minSpanningTreeEdges.push(newEdge);

        if(minSpanningTree.has(newEdge[0])){
            minSpanningTree.add(newEdge[1]);
            currentEdges = get_valid_edges(newEdge[1], currentEdges, minSpanningTree);
        }
        else{
            minSpanningTree.add(newEdge[0]);
            currentEdges = get_valid_edges(newEdge[0], currentEdges, minSpanningTree);
        }

    }

    return minSpanningTreeEdges
}

export function get_valid_edges(new_vertex, edges, edge_set, minSpanningTree){

    for (let i = 0; i<edges.length; i++){

        if ((edges[i][0] == new_vertex && !minSpanningTree.has(edges[i][1]) || (edges[i][0] == new_vertex && !minSpanningTree.has(edges[i][1])))){
            edge_set.add(edges[i]);
        }
    }
}

export function get_min_edge(edge_set){
    let minEdge = edge_set[0];
    for (const edge of edge_set) {
        if (edge[2] < minEdge[2]){
            minEdge = edge
        }
    }
    edge_set.delete(minEdge);
    return minEdge
}