

export function prims_alg(edges, numPoints, firstPoint){
    let minSpanningTree = new Set();
    let minSpanningTreeEdges = [];
    minSpanningTree.add(firstPoint);
    let currentEdges = new Set();
    get_valid_edges(firstPoint, edges, currentEdges, minSpanningTree);

    while (minSpanningTree.size < numPoints){
        const index = get_min_edge(edges, currentEdges);
        if (index === null) break;

        const [a, b] = edges[index];
        if (minSpanningTree.has(a) && minSpanningTree.has(b)) continue; // old edge, would make a cycle

        const newVertex = minSpanningTree.has(a) ? b : a;
        minSpanningTree.add(newVertex);
        minSpanningTreeEdges.push(index);
        get_valid_edges(newVertex, edges, currentEdges, minSpanningTree);

    }

    return minSpanningTreeEdges
}

export function get_valid_edges(new_vertex, edges, edge_set, minSpanningTree) {
    for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        if ((a === new_vertex && !minSpanningTree.has(b)) ||
            (b === new_vertex && !minSpanningTree.has(a))) {
            edge_set.add(i);
        }
    }
}

export function get_min_edge(edges, edge_set) {
    let minIndex = null;
    for (const i of edge_set) {
        if (minIndex === null || edges[i][2] < edges[minIndex][2]) {
            minIndex = i;
        }
    }
    if (minIndex !== null) edge_set.delete(minIndex);
    return minIndex;
}