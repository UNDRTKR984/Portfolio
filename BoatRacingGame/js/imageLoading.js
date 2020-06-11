// image elements
var boat1 = document.createElement("img");
var boat2 = document.createElement("img");
var wallPic = document.createElement("img");
var waterPic = document.createElement("img");
var palmTree = document.createElement("img");
var finish = document.createElement("img");

var picsToLoad; // set automatically below

// called after each pic is loaded -- when it's done start game
function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    if (picsToLoad == 0) {
        // function on main.js
        imageLoadingDoneSoStartGame();
    }
}

// load individual images
function beginLoadingImage(imgVar, filename) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = filename;
}

// load each image
function loadImages() {
    var imageList = [{
            varName: wallPic,
            fileName: "images/Beach.png"
        }, {
            varName: waterPic,
            fileName: "images/Water.png"
        }, {
            varName: boat1,
            fileName: "images/Boat1.png"
        },
        {
            varName: boat2,
            fileName: "images/Boat2.png"
        },
        {
            varName: palmTree,
            fileName: "images/palmTree.png"
        },
        {
            varName: finish,
            fileName: "images/track_goal.png"
        }
    ];
    picsToLoad = imageList.length;

    // iterate through and load each image
    for (var i = 0; i < imageList.length; i++) {
        beginLoadingImage(imageList[i].varName, imageList[i].fileName);
    }
}