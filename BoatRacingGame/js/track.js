const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;


const WATER = 0;
const WALL = 1;
const PLAYER_1_START = 2;
const PALM = 3;
const FINISH = 4;

var trackGrid = [1, 1, 1, 3, 1, 3, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 3, 1,
    3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 3, 1,
    3, 0, 0, 1, 1, 3, 1, 0, 0, 3, 1, 0, 0, 3, 0, 0, 0, 0, 1, 3,
    1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 3, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 3,
    3, 0, 0, 3, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 0, 0, 0, 0, 0, 1,
    1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 3,
    1, 4, 4, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 3,
    1, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 0, 0, 1, 3, 1, 0, 0, 0, 1,
    3, 0, 0, 1, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 3,
    3, 1, 3, 1, 3, 1, 3, 3, 1, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1
]

var restartTrack = [];

function rowColToArrayIndex(col, row) {
    return col + TRACK_COLS * row;
}


function drawTracks() {
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

            var tyleType = restartTrack[arrayIndex];
            var useImg;

            switch (tyleType) {
                case WALL:
                    useImg = wallPic;
                    break;
                case WATER:
                    useImg = waterPic;
                    break;
                case PALM:
                    useImg = palmTree;
                    break;
                case FINISH:
                    useImg = finish;
                    break;
            }
            context.drawImage(useImg, TRACK_W * eachCol, TRACK_H * eachRow);
        }
    }
}



function returnTileAtColRow(col, row) {
    if (col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCoord]);
    } else {
        return WALL;
    }
}

function boatTrackHandling(whichBoat) {
    var boatTrackCol = Math.floor(whichBoat.x / TRACK_W);
    var boatTrackRow = Math.floor(whichBoat.y / TRACK_H);
    var trackIndexUnderBoat = rowColToArrayIndex(
        boatTrackCol,
        boatTrackRow
    );

    if (
        boatTrackCol >= 0 &&
        boatTrackCol < TRACK_COLS &&
        boatTrackRow >= 0 &&
        boatTrackRow < TRACK_ROWS
    ) {
        var tileHere = returnTileAtColRow(boatTrackCol, boatTrackRow);
        if (tileHere == WALL || tileHere == PALM) {
            whichBoat.x -= Math.cos(whichBoat.angle) * whichBoat.speed;
            whichBoat.y -= Math.sin(whichBoat.angle) * whichBoat.speed;
            whichBoat.speed *= -0.5;

        }
        if (tileHere == FINISH) {
            console.log(whichBoat.name + " Wins!");
            loadLevel(trackGrid);
        }
        // end of track found
    } // end of valid col and row
} // end of function