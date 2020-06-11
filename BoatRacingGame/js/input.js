// Player 1 -- Green Boat Controls
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;


// Player 2 -- Grey Boat Controls
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;



// sets up the event listeners and the input for each boat
function setUpInput() {
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
    canvas.addEventListener('mousemove', updateMousePos);

    p1.setUpInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
    p2.setUpInput(KEY_W, KEY_D, KEY_S, KEY_A);
}

// used to get mouse position
function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
}

// determines the movement of a particular boat when it's keys are pressed
function keySet(keyEvent, whichBoat, setTo) {
    if (keyEvent.keyCode == whichBoat.controlLeft) {
        whichBoat.keyHeld_TurnLeft = setTo;
    }
    if (keyEvent.keyCode == whichBoat.controlRight) {
        whichBoat.keyHeld_TurnRight = setTo;
    }
    if (keyEvent.keyCode == whichBoat.controlUp) {
        whichBoat.keyHeld_Gas = setTo;
    }
    if (keyEvent.keyCode == whichBoat.controlDown) {
        whichBoat.keyHeld_Reverse = setTo;
    }

    // evt.preventDefault();
}

// when a key is pressed set that movement key to true
function keyPressed(evt) {
    keySet(evt, p1, true);
    keySet(evt, p2, true);

    evt.preventDefault();
    //console.log(evt.keyCode);
}

// when a key is released set that movement key to false
function keyReleased(evt) {
    keySet(evt, p1, false);
    keySet(evt, p2, false);

    evt.preventDefault();
    //console.log(evt.keyCode);
}