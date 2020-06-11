// brick grid constants
const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 9;

// paddle size constants
const PADDLE_WIDTH = 120;
const PADDLE_THICKNESS = 10;
const PADDLE_GAP_BOTTOM = 60;

// initialize an array to match the brick grid dimensions
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var bricksLeft = 0;

// paddle starting position
var paddleX = 400;


// ball starting position and values
var ballX = 75;
var ballSpeedX = 5;
var ballY = 40;
var ballSpeedY = 9;

// number of chances to play before grid resets
var numBalls = 3;

// used to assign mouse position
var mouseX;
var mouseY;

// used to implement things with the canvas
var canvas, context;

// updates everything on screen
function updateAll() {
    moveAll();

    drawAll();
}

// resets the ball when it goes out
function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5;
}


// movement code for the ball
function ballMove() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // if ball hits the edge of playing screen

    if (ballX > canvas.width && ballSpeedX > 0.0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX < 0 && ballSpeedX < 0.0) {
        ballSpeedX = -ballSpeedX;
    }
    // bottom part of screen? reset the ball and reduce number of balls remaining
    if (ballY > canvas.height) {
        ballReset();
        numBalls--;

        // out of balls? reset the game
        if (numBalls === 0) {
            resetBlocks();
            numBalls = 3;
        }
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
}


// is there an active brick at this particular column and row area on the screen?
function isBrickAtColRow(col, row) {
    if (col >= 0 && col < BRICK_COLS && row >= 0 && row < BRICK_ROWS) {
        var brickIndexUnderCoord = rowColToArrayIndex(col, row);
        return brickGrid[brickIndexUnderCoord];
    } else {
        return false;
    }
}


// collision code for when ball hits a brick
function collisions() {
    var ballBrickCol = Math.floor(ballX / BRICK_W);
    var ballBrickRow = Math.floor(ballY / BRICK_H);
    var brickIndexAtBall = rowColToArrayIndex(
        ballBrickCol,
        ballBrickRow
    );

    // is the ball currently where a brick could be?
    if (
        ballBrickCol >= 0 &&
        ballBrickCol < BRICK_COLS &&
        ballBrickRow >= 0 &&
        ballBrickRow < BRICK_ROWS
    ) {
        if (isBrickAtColRow(ballBrickCol, ballBrickRow)) {
            // reduce value of brick, if moves to zero turn the brick false to remove it
            brickGrid[brickIndexAtBall]--;
            if (brickGrid[brickIndexAtBall] === 0) {
                brickGrid[brickIndexAtBall] = false;
                bricksLeft--;
            }

            // determine previous ball position
            var prevBallX = ballX - ballSpeedX;
            var prevBallY = ballY - ballSpeedY;
            var prevBrickCol = Math.floor(prevBallX / BRICK_W);
            var prevBrickRow = Math.floor(prevBallY / BRICK_H);

            var bothTestFailed = true;

            // checks to see if the ball was in another column prior to hitting this brick and if there was a brick there
            if (prevBrickCol != ballBrickCol) {
                // if no birck there change the lateral direction
                if (!isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
                    ballSpeedX = -ballSpeedX;
                    bothTestFailed = false;
                }
            }

            // code if the the previous row is different
            if (prevBrickRow != ballBrickRow) {
                var adjBrickTopBot = rowColToArrayIndex(
                    ballBrickCol,
                    prevBrickRow
                );

                // if no brick there, change the up-down direction
                if (isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
                    ballSpeedY = -ballSpeedY;
                    bothTestFailed = false;
                }
            }
            // if the ball hits the corner of the brick with no blocks adjacent to that side
            if (bothTestFailed) {
                ballSpeedX = -ballSpeedX;
                ballSpeedY = -ballSpeedY;
            }
        }
    }
}

// collision code with the ball and paddle
function ballHitPaddle() {
    var paddleTopEdgeY = canvas.height - PADDLE_GAP_BOTTOM;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleX + PADDLE_WIDTH;

    if (
        ballY > paddleTopEdgeY &&
        ballY < paddleBottomEdgeY &&
        ballX > paddleLeftEdgeX &&
        ballX < paddleRightEdgeX
    ) {
        ballSpeedY = -ballSpeedY;

        // paddle control code -- farther away from center the faster it will move laterally
        var centerofPaddle = paddleX + PADDLE_WIDTH / 2;
        var ballDistFromPaddleCenter = ballX - centerofPaddle;
        ballSpeedX = ballDistFromPaddleCenter * 0.35;

        // no bricks left? reset the grid
        if (bricksLeft == 0) {
            resetBlocks();
        }
    }
}

// moves everything on the screen
function moveAll() {
    ballMove();
    collisions();
    ballHitPaddle();
}

// draws everthing to the screen
function drawAll() {
    drawRectangle(0, 0, canvas.width, canvas.height, "black");
    drawCircle(ballX, ballY, 10, "white");
    drawRectangle(
        paddleX,
        canvas.height - PADDLE_GAP_BOTTOM,
        PADDLE_WIDTH,
        PADDLE_THICKNESS,
        "green"
    );
    drawBricks();
}

// helper function to draw rectangle to screen
function drawRectangle(topX, topY, bottomX, bottomY, color) {
    context.fillStyle = color;
    context.fillRect(topX, topY, bottomX, bottomY);
}

// helper function to draw a circle to screen
function drawCircle(ballX, ballY, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(ballX, ballY, radius, 0, Math.PI * 2, true);
    context.fill();
}

// finds the index of the brick in the array
function rowColToArrayIndex(col, row) {
    return col + BRICK_COLS * row;
}

// resets the gridd
function resetBlocks() {
    bricksLeft = 0;

    for (var i = 0; i < 3 * BRICK_COLS; i++) {
        brickGrid[i] = false;
    }
    for (var i = 3 * BRICK_COLS; i < BRICK_COLS * BRICK_ROWS; i++) {
        if (i < BRICK_COLS * 4) {
            brickGrid[i] = 3;
        } else if (i < BRICK_COLS * 6) {
            brickGrid[i] = 2;
        } else {
            brickGrid[i] = 1;
        }
        bricksLeft++;
    }
}

// draw the brick grid to the screen
function drawBricks() {
    for (var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if (brickGrid[arrayIndex] == 1) {
                drawRectangle(
                    BRICK_W * eachCol,
                    BRICK_H * eachRow,
                    BRICK_W - BRICK_GAP,
                    BRICK_H - BRICK_GAP,
                    "blue"
                );
            } else if (brickGrid[arrayIndex] == 2) {
                drawRectangle(
                    BRICK_W * eachCol,
                    BRICK_H * eachRow,
                    BRICK_W - BRICK_GAP,
                    BRICK_H - BRICK_GAP,
                    "yellow"
                );
            } else if (brickGrid[arrayIndex] == 3) {
                drawRectangle(
                    BRICK_W * eachCol,
                    BRICK_H * eachRow,
                    BRICK_W - BRICK_GAP,
                    BRICK_H - BRICK_GAP,
                    "red"
                );
            }
        }
    }
}

// function used to collor and fill text
function colorText(showWords, textX, textY, fillColor) {
    context.fillStyle = fillColor;
    context.fillText(showWords, textX, textY);
}

// function used to sget the mouse position and move the paddle accordingly
function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH / 2;
}