    // just references to the canvas properties
    const WIDTH = 800;
    const HEIGHT = 600;

    // grid propertes
    const VERTEX_W = 10;
    const VERTEX_H = 10;
    const VERTEX_GAP = 1;
    const VERTEX_COLS = 60;
    const VERTEX_ROWS = 60;

    // Constants used to specify what should happen to a given vertex
    const BLUE = 1;
    const RED = 2;
    const VISITED = 3;
    const PATH = 4;
    const OFF = 0;

    // draws the canvas and all the verteces on the screen
    function drawAll() {
        drawRectangle(0, 0, canvas.width, canvas.height, "black");
        drawVerteces();
    }

    // helper function to make it easier to read.  Draws a rectangle/square on screen
    function drawRectangle(topX, topY, bottomX, bottomY, color) {
        context.fillStyle = color;
        context.fillRect(topX, topY, bottomX, bottomY);
    }

    // resets everything back to when page first loaded
    function vertexReset() {
        vertexsLeft = 0;
        numClicks = 0;
        vertex1 = null;
        vertex2 = null;
        g.rebuild();

        for (i = 0; i < VERTEX_COLS * VERTEX_ROWS; i++) {
            vertexGrid[i] = BLUE;
            vertexsLeft++;
        }
    }

    // draws all the verteces on the screen -- is called constantly so will show updates when the verteces change
    function drawVerteces() {
        for (var eachRow = 0; eachRow < VERTEX_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < VERTEX_COLS; eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                if (vertexGrid[arrayIndex] === BLUE) {
                    drawRectangle(
                        VERTEX_W * eachCol,
                        VERTEX_H * eachRow,
                        VERTEX_W - VERTEX_GAP,
                        VERTEX_H - VERTEX_GAP,
                        "blue"
                    );
                }
                if (vertexGrid[arrayIndex] === RED) {
                    drawRectangle(
                        VERTEX_W * eachCol,
                        VERTEX_H * eachRow,
                        VERTEX_W - VERTEX_GAP,
                        VERTEX_H - VERTEX_GAP,
                        "red"
                    );
                }
                if (vertexGrid[arrayIndex] === PATH) {
                    drawRectangle(
                        VERTEX_W * eachCol,
                        VERTEX_H * eachRow,
                        VERTEX_W - VERTEX_GAP,
                        VERTEX_H - VERTEX_GAP,
                        "white"
                    );
                }
                if (vertexGrid[arrayIndex] === VISITED) {
                    drawRectangle(
                        VERTEX_W * eachCol,
                        VERTEX_H * eachRow,
                        VERTEX_W - VERTEX_GAP,
                        VERTEX_H - VERTEX_GAP,
                        "green"
                    );
                }
            }
        }
    }

    // show visited nodes
    function toggleVisited() {
        for (let i = 0; i < g.visited.length; i++) {
            if (vertexGrid[g.visited[i]] == BLUE) {
                vertexGrid[g.visited[i]] = VISITED;
            }
        }
    }
    // hides visted nodes
    function hideVisited() {
        for (let i = 0; i < g.visited.length; i++) {
            if (vertexGrid[g.visited[i]] == VISITED) {
                vertexGrid[g.visited[i]] = BLUE;
            }
        }
    }

    // reset the grid
    function resetVisited() {
        for (let i = 0; i < g.visited.length; i++) {
            if (
                vertexGrid[g.visited[i]] == VISITED ||
                vertexGrid[g.visited[i]] == PATH
            ) {
                vertexGrid[g.visited[i]] = BLUE;
            }
        }
    }

    // this is a helper function used to find the coordinates of my mouse for debugging
    // colorText(mouseVertexCol + ", " + mouseVertexRow + ": index of " + vertexIndexUnderMouse, mouseX, mouseY,
    //     'white');