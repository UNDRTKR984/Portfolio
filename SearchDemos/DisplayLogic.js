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

    // declare an array size with the amount of columns and rows
    var vertexGrid = new Array(VERTEX_COLS * VERTEX_ROWS);

    // variable used to track the number of clicks
    var numClicks = 0;

    // flagging variable used to deactivate tiles
    var isMouseDown = false;

    // these are used as the starting and ending points in the algorithm
    var vertex1 = null;
    var vertex2 = null;

    // these are used to find the x coordinate and y coordinate of the mouse
    var mouseX;
    var mouseY;

    // these are used to interact and change aspects of the the canvas
    var canvas, context;

    // used to toggle the visited vertexes
    var toggleVisitedVerteces = true;

    // used to toggle the speed of showing the visited nodes
    var instant = false;

    // this loads when the file loads up
    window.onload = function () {
        canvas = document.getElementById("searchCanvas");
        context = canvas.getContext("2d");
        canvas.addEventListener("mousedown", updateMouseDown);
        canvas.addEventListener("mousemove", updateMouseMove);
        canvas.addEventListener("mouseup", updateMouseUp);
        document.addEventListener("keydown", findPath);

        vertexReset();

        // set the refresh rate
        var framesPerSecond = 30;

        // how often do we call the upDate all function -- we use the setInterval
        setInterval(updateAll, 1000 / framesPerSecond);
    };

    // updates everything that happens on the canvas
    function updateAll() {
        drawAll();

        instructions();
    }



    function isVertexAtColRow(col, row) {
        if (col >= 0 && col < VERTEX_COLS && row >= 0 && row < VERTEX_ROWS) {
            var vertexIndexUnderCoord = rowColToArrayIndex(col, row);
            return vertexGrid[vertexIndexUnderCoord];
        } else {
            return false;
        }
    }

    // returns where on the screen this is -- it is used to help find the index of a vertex on the screen
    function rowColToArrayIndex(col, row) {
        return col + VERTEX_COLS * row;
    }

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

    // activates when mouse is clicked from the Event Listener above -- finds the position of mouse and acts accordingly
    function updateMouseDown(evt) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;

        // find mouse position
        mouseX = evt.clientX - rect.left - root.scrollLeft;
        mouseY = evt.clientY - rect.top - root.scrollTop;

        // triggers dynamic find
        if (mouseX > VERTEX_COLS * VERTEX_W + 25 &&
            mouseX < VERTEX_COLS * VERTEX_W + 175 && mouseY > 380 && mouseY < 430) {
            if (instant) {
                instant = false;
                if (!toggleVisitedVerteces) {
                    toggleVisitedVerteces = true;
                }
            } else {
                instant = true;
            }
        }

        // if visited vertex box is clicked, do this
        if (
            mouseX > VERTEX_COLS * VERTEX_W + 25 &&
            mouseX < VERTEX_COLS * VERTEX_W + 175 &&
            mouseY > 320 &&
            mouseY < 370
        ) {
            if (!toggleVisitedVerteces) {
                toggleVisitedVerteces = true;
            } else {
                toggleVisitedVerteces = false;
            }
        }


        // if reset box is clicked, do this
        if (
            mouseX > VERTEX_COLS * VERTEX_W + 25 &&
            mouseX < WIDTH - 25 &&
            mouseY > 460 &&
            mouseY < 560
        ) {
            vertexReset();
            g.visited = [];
            return;
        }

        // if the grid is clicked, do this
        if (VERTEX_W * VERTEX_COLS - mouseX > 0) {
            // if start and finish are initialized, allow the user to eliminate vertexes -- the removeVertex is function is called on each removed
            // sets isMouseDown to true until the mouse click is no longer held down.  Then upDateMouseUp is called to set it to false.
            if (numClicks >= 2) {
                callVertex();
                isMouseDown = true;
            }
            // the first two clicks determine the start and ending vertex
            else {
                numClicks++;
                makeRed();
            }
        }
    }

    // sets the isMouseDown to false
    function updateMouseUp(evt) {
        isMouseDown = false;
    }

    // this function exexcutes as long as the Mouse is held down after the start and ending vertexes are initialized
    function updateMouseMove(evt) {
        if (isMouseDown === true) {
            var rect = canvas.getBoundingClientRect();
            var root = document.documentElement;

            mouseX = evt.clientX - rect.left - root.scrollLeft;
            mouseY = evt.clientY - rect.top - root.scrollTop;
            callVertex();
        }
    }

    // this function marks the starting and ending vertexes in the grid
    function makeRed() {
        // find the index number of the block the mouse is on
        var mouseVertexCol = Math.floor(mouseX / VERTEX_W);
        var mouseVertexRow = Math.floor(mouseY / VERTEX_H);
        var vertexIndexUnderMouse = rowColToArrayIndex(
            mouseVertexCol,
            mouseVertexRow
        );

        // turn the block from blue to red
        if (
            vertexIndexUnderMouse >= 0 &&
            vertexIndexUnderMouse < VERTEX_COLS * VERTEX_ROWS &&
            vertexGrid[vertexIndexUnderMouse] == BLUE
        ) {
            vertexGrid[vertexIndexUnderMouse] = RED;
        }

        // initialize the starting and ending vertexes
        if (numClicks === 1) {
            vertex1 = vertexIndexUnderMouse;
        }
        if (numClicks === 2) {
            vertex2 = vertexIndexUnderMouse;
        }
    }

    // turns the vertex off on the grid and removes it by calling removeVertex on the adjacency list
    function callVertex() {
        var mouseVertexCol = Math.floor(mouseX / VERTEX_W);
        var mouseVertexRow = Math.floor(mouseY / VERTEX_H);
        var vertexIndexUnderMouse = rowColToArrayIndex(
            mouseVertexCol,
            mouseVertexRow
        );
        if (
            vertexIndexUnderMouse >= 0 &&
            vertexIndexUnderMouse < VERTEX_COLS * VERTEX_ROWS &&
            vertexGrid[vertexIndexUnderMouse] == BLUE
        ) {
            vertexGrid[vertexIndexUnderMouse] = false;
            g.removeVertex(vertexIndexUnderMouse);
        }
    }

    // this function is called to execute the search Algorithms
    function findPath(evt) {
        if ((vertex1 || vertex1 === 0) && (vertex2 || vertex2 === 0)) {
            if (evt.key == "a" || evt.key == "A") {
                resetVisited();
                g.aStar(vertex1, vertex2);
            } else if (evt.key == "g" || evt.key == "G") {
                resetVisited();
                g.greedy(vertex1, vertex2);
            } else {
                resetVisited();
                g.Dijkstra(vertex1, vertex2);
            }
        }
        if (toggleVisitedVerteces) {
            toggleVisited();
        }
    }