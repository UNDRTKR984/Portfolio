var gameStart = false;
var level = 0;
var index = 0;


// sets custom valume to the sounds (the original sound files are REALLY loud)
const BUTTON_VOL = 0.2;
const WRONG_VOL = 0.3;

// step 4
// is used to check the user answer against the gamePattern
var userClickedPattern = [];

// step 2
// holds the computer pattern sequence
var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];



//step 7 start the game

$(document).keydown(function () {
    if (gameStart == false) {
        gameStart = true;
        nextSequence();
    }
});




// finds the next sequence and plays entire sequence to user
async function nextSequence() {
    level++;
    index = 0;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    for (let i = 0; i < gamePattern.length; i++) {
        await simonPath(gamePattern[i]);
    }

}

// helper function with a delay to play each random selection to the user

async function simonPath(pattern) {
    await sleep(1000 / 2);
    $('#' + pattern).fadeOut(100).fadeIn(100);
    var noise = new Audio("sounds/" + pattern + "1.mp3");
    noise.volume = BUTTON_VOL;
    noise.play();
}

// helper funciton to slow down iteration of playing each pattern out to the user
function sleep(fps) {
    return new Promise((resolve) => setTimeout(resolve, fps));
}


// step 4

// Event listener that stores the click into the user clicked pattern, plays sound, and is used to check against the game pattern
$(".btn").click(function () {
    var userChosenColor = this.id;
    var noise = new Audio("sounds/" + userChosenColor + "1.mp3");
    noise.volume = BUTTON_VOL;
    noise.play();
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(index++);
});


// step 5

// animates the button being pressed
function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");
    setTimeout(function () {
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}


// checks to see if the user's entry is correct
function checkAnswer(index) {
    if (userClickedPattern[index] == gamePattern[index]) {
        console.log("success");
    } else {
        console.log("failure")
        var sound = new Audio("sounds/wrong1.mp3");
        sound.volume = WRONG_VOL;
        sound.play()
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over. Press Any Key to Restart");
        startOver();
    }

    if (index == ((gamePattern.length) - 1)) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
}


// resets the game
function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}