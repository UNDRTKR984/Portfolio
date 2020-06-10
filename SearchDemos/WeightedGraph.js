class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
    this.visited = [];
    this.heuristic = [];
  }

  /////////////////accessors/////////////////

  //depth first search of all the verticeies using recursion --- not ready yet to use
  DFTr(vertex) {
    var result = [];
    var visited = {};
    var adjacencyList = this.adjacencyList;

    //to write a function in here need to use this syntax
    function DepthFirstSearch(vertex) {
      if (!adjacencyList[vertex]) {
        return;
      }
      visited[vertex] = adjacencyList[vertex];
      result.push(vertex);

      for (let i = 0; i < adjacencyList[vertex].length; i++) {
        if (!visited[adjacencyList[vertex][i]]) {
          DepthFirstSearch(adjacencyList[vertex][i]);
        }
      }
    }

    //function call to what is written above
    DepthFirstSearch(vertex);

    return result;
  }

  // Depth first search of the nodes using Iteration  --- not ready yet to use
  async DFTi(start) {
    var stack = [];
    var result = [];
    var seen = {};

    this.visited = [];
    stack.push(start);

    seen[start] = true;

    while (stack.length > 0) {
      var vertex = stack.pop();
      result.push(vertex);
      this.visited.push(vertex);
      if (!instant) {
        await this.sleep(1);
      }

      for (let i = 0; i < this.adjacencyList[vertex].length; i++) {
        if (!seen[this.adjacencyList[vertex][i].node]) {
          seen[this.adjacencyList[vertex][i].node] = true;
          stack.push(this.adjacencyList[vertex][i].node);
        }
      }
    }

    return result;
  }

  // Breadth First search of the nodes  ---- node ready yet to use
  async BFT(index) {
    var queue = [index];
    var result = [];
    var seen = {};

    seen[index] = true;

    while (queue.length > 0) {
      var vertex = queue.shift();
      this.visited.push(vertex);
      result.push(vertex);
      vertex = this.adjacencyList[vertex];
      if (!instant) {
        await this.sleep(1);
      }
      for (let i = 0; i < vertex.length; i++) {
        if (!seen[vertex[i].node]) {
          seen[vertex[i].node] = true;
          queue.push(vertex[i].node);
        }
      }
    }

    return result;
  }

  // Dijsktra Algorithm to find shortest path between 2 nodes
  async Dijkstra(start, end) {
    // make a copy of adjacency list
    var list = this.adjacencyList;

    // resets the visited array
    this.visited = [];

    // create a record of all nodes and their distance from the starting node
    var distances = {};
    distances[start] = 0;

    // obteain the keys of all the vertexes in the adjacency list copy and set each to infinity
    let keys = Object.keys(list);
    for (let key of keys) {
      if (key == start) {} else {
        distances[key] = Infinity;
      }
    }

    // create a priority queue and start the first vertex with priority of 0
    var queue = new PriorityQueue();
    queue.enqueue(start, 0);

    // for each key, queue the vertex with prioirity of infinity
    for (let key of keys) {
      if (key != start) {
        queue.enqueue(key, Infinity);
      }
    }

    // create a previous "chart" to trace each node visited back to the starting node ("ie, I got here from this node")
    var previous = {};
    for (let key of keys) {
      previous[key] = null;
    }

    // this stores all the visited nodes for optional display

    // variables declared outside while loop to be used within the loop
    var vertex;
    var nodes;
    var distance;

    while (queue.values.length > 0) {
      vertex = queue.dequeue();

      // this is used to store all the visited vertexes for display
      this.visited.push(vertex.val);
      // if dynamic search is enabled, slow down the search so user can see in real time
      if (!instant) {
        await this.sleep(1);
      }


      //if the end node is found
      if (vertex.val == end) {
        let path = [];
        let name = end;

        // trace the path all the way back to the start
        while (name != null) {
          path.push(name);
          name = previous[name];
        }
        //store the path into answer
        var answer = path.reverse();

        // iterate through the answer (index of each vertex) to highlight the path back to the starting node
        for (let i = 0; i < answer.length; i++) {
          if (vertexGrid[answer[i]] != RED) {
            vertexGrid[answer[i]] = PATH;
          }
        }
        // return the path to the console for the user to look at with debugging toos
        return answer;
      }

      // iterate through all the nodes connected to the vertex
      nodes = list[vertex.val];

      // below is a feature to show all the nodes visited before answer is calculated
      //vertexGrid[vertex.val] = VISITED;

      // find the distance from the starting node for each vertex
      for (let i = 0; i < nodes.length; i++) {
        // calculate the distance of this particular node by adding it's weight plus the distance away from start of the node it came from, to find it's distance from start.
        distance = distances[vertex.val] + nodes[i].weight;

        // if this path is shorter than what the distance was given previously from this node, update it with the shorter distance
        if (distance < distances[nodes[i].node]) {
          distances[nodes[i].node] = distance;
          previous[nodes[i].node] = vertex.val;

          // place this new vertex into the priority queue with it's reduced distance (therefore given higher priority in the queue)
          queue.enqueue(nodes[i].node, distance);
        }
      }
    }
  }

  // A* Algorithm to find shortest path between 2 nodes
  async aStar(start, end) {
    // make a copy of adjacency list
    var list = this.adjacencyList;

    // resets the visited array and heuristic
    this.visited = [];
    this.heuristic = [];

    this.assignHeuristic(end);

    // create a record of all nodes and their distance from the starting node
    var distances = {};
    distances[start] = 0;

    // obteain the keys of all the vertexes in the adjacency list copy and set each to infinity
    let keys = Object.keys(list);
    for (let key of keys) {
      if (key == start) {} else {
        distances[key] = Infinity;
      }
    }

    // create a priority queue and start the first vertex with priority of 0
    var queue = new PriorityQueue();
    queue.enqueue(start, 0);

    // for each key, queue the vertex with prioirity of infinity
    for (let key of keys) {
      if (key != start) {
        queue.enqueue(key, Infinity);
      }
    }

    // create a previous "chart" to trace each node visited back to the starting node ("ie, I got here from this node")
    var previous = {};
    for (let key of keys) {
      previous[key] = null;
    }

    // this stores all the visited nodes for optional display

    // variables declared outside while loop to be used within the loop
    var vertex;
    var nodes;
    var distance;

    var name;

    while (queue.values.length > 0) {
      vertex = queue.dequeue();

      // this is used to store all the visited vertexes for display
      this.visited.push(vertex.val);

      // if dynamic search is enabled, slow down the search so user can see in real time
      if (!instant) {
        await this.sleep(1);
      }

      //if the end node is found
      if (vertex.val == end) {
        let path = [];
        let name = end;

        // trace the path all the way back to the start
        while (name != null) {
          path.push(name);
          name = previous[name];
        }

        //store the path into answer
        var answer = path.reverse();

        // iterate through the answer (index of each vertex) to highlight the path back to the starting node
        for (let i = 0; i < answer.length; i++) {
          if (vertexGrid[answer[i]] != RED) {
            vertexGrid[answer[i]] = PATH;
          }
        }
        // return the path to the console for the user to look at with debugging toos
        return answer;
      }

      // iterate through all the nodes connected to the vertex
      nodes = list[vertex.val];

      // below is a feature to show all the nodes visited before answer is calculated
      //vertexGrid[vertex.val] = VISITED;

      // find the distance from the starting node for each vertex
      for (let i = 0; i < nodes.length; i++) {
        // calculate the distance of this particular node by adding it's weight plus the distance away from start of the node it came from, to find it's distance from start.
        distance = distances[vertex.val] + nodes[i].weight;

        // if this path is shorter than what the distance was given previously from this node, update it with the shorter distance
        if (distance < distances[nodes[i].node]) {
          distances[nodes[i].node] = distance;
          previous[nodes[i].node] = vertex.val;

          // place this new vertex into the priority queue with it's reduced distance (therefore given higher priority in the queue)
          queue.enqueue(
            nodes[i].node,
            distance + this.heuristic[nodes[i].node]
          );
        }
      }
    }
  }



  async greedy(start, end) {
    // make a copy of adjacency list
    var list = this.adjacencyList;

    // resets the visited array and heuristic
    this.visited = [];
    this.heuristic = [];

    this.assignHeuristic(end);

    // create a record of all nodes and their distance from the starting node
    var distances = {};
    distances[start] = 0;

    // obteain the keys of all the vertexes in the adjacency list copy and set each to infinity
    let keys = Object.keys(list);
    for (let key of keys) {
      if (key == start) {} else {
        distances[key] = Infinity;
      }
    }

    // create a priority queue and start the first vertex with priority of 0
    var queue = new PriorityQueue();
    queue.enqueue(start, 0);

    // for each key, queue the vertex with prioirity of infinity
    for (let key of keys) {
      if (key != start) {
        queue.enqueue(key, Infinity);
      }
    }

    // create a previous "chart" to trace each node visited back to the starting node ("ie, I got here from this node")
    var previous = {};
    for (let key of keys) {
      previous[key] = null;
    }

    // this stores all the visited nodes for optional display

    // variables declared outside while loop to be used within the loop
    var vertex;
    var nodes;
    var distance;

    var name;
    var h;

    while (queue.values.length > 0) {
      vertex = queue.dequeue();

      // this is used to store all the visited vertexes for display
      this.visited.push(vertex.val);

      // if dynamic search is enabled, slow down the search so user can see in real time
      if (!instant) {
        await this.sleep(1);
      }

      //if the end node is found
      if (vertex.val == end) {
        let path = [];
        let name = end;

        // trace the path all the way back to the start
        while (name != null) {
          path.push(name);
          name = previous[name];
        }
        //store the path into answer
        var answer = path.reverse();

        // iterate through the answer (index of each vertex) to highlight the path back to the starting node
        for (let i = 0; i < answer.length; i++) {
          if (vertexGrid[answer[i]] != RED) {
            vertexGrid[answer[i]] = PATH;
          }
        }
        // return the path to the console for the user to look at with debugging toos
        return answer;
      }

      // iterate through all the nodes connected to the vertex
      nodes = list[vertex.val];

      // below is a feature to show all the nodes visited before answer is calculated
      //vertexGrid[vertex.val] = VISITED;

      h = Infinity;
      // find the distance from the starting node for each vertex
      for (let i = 0; i < nodes.length; i++) {
        // calculate the distance of this particular node by adding it's weight plus the distance away from start of the node it came from, to find it's distance from start.
        distance = this.heuristic[nodes[i].node];

        // if this path is shorter than what the distance was given previously from this node, update it with the shorter distance
        if (distance < distances[nodes[i].node]) {
          distances[nodes[i].node] = distance;
          previous[nodes[i].node] = vertex.val;

          // place this new vertex into the priority queue with it's reduced distance (therefore given higher priority in the queue)
          queue.enqueue(nodes[i].node, distance);
        }
      }
    }
  }


  sleep(fps) {
    return new Promise(resolve => setTimeout(resolve, fps));
  }

  /////////////////mutators//////////////////

  //adds a vertex into the graph structure
  addVertex(vertex) {
    if (this.adjacencyList[vertex]) {
      return "Already there";
    }
    this.adjacencyList[vertex] = [];
  }

  //adds and edge to edge given vertex (undirected graph)
  addEdge(vertex1, vertex2, weight) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      return false;
    }
    this.adjacencyList[vertex1].push({
      node: vertex2,
      weight: weight,
    });
    this.adjacencyList[vertex2].push({
      node: vertex1,
      weight: weight,
    });
  }

  //removes the Edge between two given verticies (undirected)
  removeEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      return false;
    }
    for (let i = 0; i < this.adjacencyList[vertex1].length; i++) {
      if (this.adjacencyList[vertex1][i] === vertex2) {
        this.adjacencyList[vertex1].splice(i, 1);
        console.log("Eliminated one");
        break;
      }
    }
    for (let i = 0; i < this.adjacencyList[vertex2].length; i++) {
      if (this.adjacencyList[vertex2][i] === vertex1) {
        this.adjacencyList[vertex2].splice(i, 1);
        console.log("Eliminated two");
        break;
      }
    }
  }

  //removes a vertex and all edges associated with it
  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      return false;
    }
    for (let i = 0; i < this.adjacencyList[vertex].length; i++) {
      this.removeEdge(this.adjacencyList[vertex][i], vertex);
    }
    delete this.adjacencyList[vertex];
    return true;
  }

  //assigns a heuristic value for each node from the end node
  assignHeuristic(start) {
    console.log("Creating Heuristic");
    var weight;
    var xDist;
    var yDist;
    var startX = start % VERTEX_COLS;
    var startY = Math.floor(start / VERTEX_ROWS);
    for (let i = 0; i < VERTEX_COLS * VERTEX_ROWS; i++) {
      xDist = Math.abs((i % VERTEX_COLS) - startX);
      yDist = Math.abs(Math.floor(i / VERTEX_ROWS) - startY);
      weight = Math.sqrt(xDist * xDist + yDist * yDist) * 1.7;
      this.heuristic.push(weight);
    }
    return;
  }

  //rebuilds and repairs the entire graph for re-use without refreshing page
  rebuild() {
    this.adjacencyList = {};
    for (let i = 0; i < VERTEX_COLS * VERTEX_ROWS; i++) {
      g.addVertex(i);
      if (i > 0 && i % VERTEX_COLS != 0) {
        g.addEdge(i, i - 1, 1);
      }
      if (i >= VERTEX_COLS) {
        g.addEdge(i, i - VERTEX_COLS, 1);
      }
    }
  }
}

//Priority Queue designed to work with the verteces and their weight from start

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({
      val,
      priority,
    });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

// declare the variable for which the vertex grid will be stored in
g = new WeightedGraph();

// initialize the grid and assign the edges while doing so
for (let i = 0; i < VERTEX_COLS * VERTEX_ROWS; i++) {
  g.addVertex(i);
  if (i > 0 && i % VERTEX_COLS != 0) {
    g.addEdge(i, i - 1, 1);
  }
  if (i >= VERTEX_COLS) {
    g.addEdge(i, i - VERTEX_COLS, 1);
  }
}