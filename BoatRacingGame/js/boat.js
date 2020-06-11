// boat movement constants
const WATERSPEED_DECAY_MULT = 0.96;
const MOTOR_POWER = 0.3;
const REVERSE_POWER = 0.3;
const TURN_RATE = 0.1;

class Boat {
    constructor(IMG, name) {
        this.x = 75;
        this.y = 75;
        this.IMG = IMG; // the picture to use
        this.name = name;

        this.angle = 0;
        this.speed = 0;

        this.keyHeld_Gas = false;
        this.keyHeld_Reverse = false;
        this.keyHeld_TurnLeft = false;
        this.keyHeld_TurnRight = false;

        this.controlUp;
        this.controlRight;
        this.controlDown;
        this.controlLeft;

    }

    // boat controls
    setUpInput(upKey, rightKey, downKey, leftKey) {
        this.controlUp = upKey;
        this.controlRight = rightKey;
        this.controlDown = downKey;
        this.controlLeft = leftKey;
    }

    // reset the boat in starting positoin
    boatReset() {
        this.speed = 0;
        for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                if (restartTrack[arrayIndex] == PLAYER_1_START) {
                    restartTrack[arrayIndex] = WATER;
                    this.angle = -90 * Math.PI / 180;
                    this.x = eachCol * TRACK_W + TRACK_W / 2;
                    this.y = eachRow * TRACK_H + TRACK_W / 2;
                    return;
                }
            }
        }
    }

    // boat movement code
    boatMove() {
        this.speed *= WATERSPEED_DECAY_MULT;

        if (this.keyHeld_Gas) {
            this.speed += MOTOR_POWER;
        }
        if (this.keyHeld_Reverse) {
            this.speed -= REVERSE_POWER;
        }
        if (this.keyHeld_TurnLeft) {
            this.angle -= TURN_RATE;
        }
        if (this.keyHeld_TurnRight) {
            this.angle += TURN_RATE;
        }
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // on track.js -- handling and collision code
        boatTrackHandling(this);

    }

    // drawing boat to screen
    boatDraw() {

        drawBitmapCenteredWithRotation(this.IMG, this.x, this.y, this.angle);

    }
}