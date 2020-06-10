var mouseX;
var mouseY;

const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;



function setUpInput() {
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
    canvas.addEventListener('mousemove', updateMousePos);

    p1.setUpInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
    p2.setUpInput(KEY_W, KEY_D, KEY_S, KEY_A);
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
}

function keySet(keyEvent, whichCar, setTo) {
    if (keyEvent.keyCode == whichCar.controlLeft) {
        whichCar.keyHeld_TurnLeft = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlRight) {
        whichCar.keyHeld_TurnRight = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlUp) {
        whichCar.keyHeld_Gas = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlDown) {
        whichCar.keyHeld_Reverse = setTo;
    }

    // evt.preventDefault();
}

function keyPressed(evt) {
    keySet(evt, p1, true);
    keySet(evt, p2, true);

    evt.preventDefault();
    //console.log(evt.keyCode);
}

function keyReleased(evt) {
    keySet(evt, p1, false);
    keySet(evt, p2, false);

    evt.preventDefault();
    //console.log(evt.keyCode);
}