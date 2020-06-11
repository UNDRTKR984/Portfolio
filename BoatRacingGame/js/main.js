// create 2 instances of a Boat Class
var p1 = new Boat(boat1, "Player 1");
var p2 = new Boat(boat2, "Player 2");

// used to interact with canvas
var canvas, context;

// when the screen loads draw the drack and images
window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");

    drawRectangle(0, 0, canvas.width, canvas.height, 'black');
    colorText("Loading Game...", canvas.width / 2, canvas.height / 2, 'white');

    loadImages();
}


// start the game once images loaded up
function imageLoadingDoneSoStartGame() {
    p1.boatReset();
    p2.boatReset();
    setUpInput();

    // track.js
    loadLevel(trackGrid);

    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);
};

// function loads the level... can be used for multiple levels
function loadLevel(whichLevel) {
    restartTrack = whichLevel.slice();
    p1.boatReset();
    p2.boatReset();
}

// calls the movement and drawing code on the screen
function updateAll() {
    moveAll();

    drawAll();
}


// calls the movement code for the boats
function moveAll() {
    p1.boatMove();
    p2.boatMove();

}

// draws boats to screen
function drawAll() {

    drawTracks();
    p1.boatDraw();
    p2.boatDraw();
}