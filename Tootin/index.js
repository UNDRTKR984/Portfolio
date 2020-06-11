var fartButtons = document.querySelectorAll("button").length;


// Set the site responsive to mouse clicks and tablet touches
for (var i = 0; i < fartButtons; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", function () {
        var key = this.innerHTML;
        sound(key);
        animation(key);
    });

}


// Set the site responsive to key presses from the keyboard

document.addEventListener("keydown", function (pressed) {
    sound(pressed.key);
    animation(pressed.key);
});


//  plays the sound when a particular key is pressed
function sound(key) {

    switch (key) {
        case "a":
            var fart1 = new Audio("sounds/fart1.mp3");
            fart1.volume = 0.3;
            fart1.play();
            break;
        case "s":
            var fart2 = new Audio("sounds/fart2.mp3");
            fart2.volume = 0.3;
            fart2.play();
            break;
        case "d":
            var fart3 = new Audio("sounds/fart3.mp3");
            fart3.volume = 0.3;
            fart3.play();
            break;
        case "f":
            var fart4 = new Audio("sounds/fart4.mp3");
            fart4.volume = 0.3;
            fart4.play();
            break;
        case "g":
            var fart5 = new Audio("sounds/fart5.mp3");
            fart5.volume = 0.3;
            fart5.play();
            break;
        case "h":
            var fart6 = new Audio("sounds/fart6.mp3");
            fart6.volume = 0.3;
            fart6.play();
            break;
        case "j":
            var fart7 = new Audio("sounds/fart7.mp3");
            fart7.volume = 0.3;
            fart7.play();
            break;
        case "k":
            var fart8 = new Audio("sounds/fart8.mp3");
            fart8.volume = 0.3;
            fart8.play();
            break;
        case "l":
            var fart9 = new Audio("sounds/fart9.mp3");
            fart9.volume = 0.3;
            fart9.play();
            break;
        default:
            break;
    }
}

// animated the key being pressed
function animation(key) {
    var activeFart = document.querySelector("." + key);
    activeFart.classList.add("active");
    activeFart.innerHTML = "<i class='fas fa-wind'></i>";

    setTimeout(function () {
        activeFart.innerHTML = key;
        activeFart.classList.remove("active");
    }, 300)
}