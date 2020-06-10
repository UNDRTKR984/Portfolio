var canvas, context;

var p1 = new BoatClass(boat1, "Player 1");
var p2 = new BoatClass(boat2, "Player 2");

window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");

    drawRectangle(0, 0, canvas.width, canvas.height, 'black');
    colorText("Loading Game...", canvas.width / 2, canvas.height / 2, 'white');

    loadImages();
}

function imageLoadingDoneSoStartGame() {
    p1.boatReset();
    p2.boatReset();
    setUpInput();

    loadLevel(trackGrid);

    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);
};

function loadLevel(whichLevel) {
    restartTrack = whichLevel.slice();
    p1.boatReset();
    p2.boatReset();
}


function updateAll() {
    moveAll();

    drawAll();
}

function moveAll() {
    p1.boatMove();
    p2.boatMove();

}

function drawAll() {

    //clearScreen();
    drawTracks();
    p1.boatDraw();
    p2.boatDraw();
}

// function clearScreen() {
//     drawRectangle(0, 0, canvas.width, canvas.height, "black");
// }