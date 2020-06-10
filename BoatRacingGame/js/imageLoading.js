var boat1 = document.createElement("img");
var boat2 = document.createElement("img");
var wallPic = document.createElement("img");
var waterPic = document.createElement("img");
var palmTree = document.createElement("img");
var finish = document.createElement("img");

var picsToLoad; // set automatically below

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    if (picsToLoad == 0) {
        imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, filename) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = filename;
}

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
    for (var i = 0; i < imageList.length; i++) {
        beginLoadingImage(imageList[i].varName, imageList[i].fileName);
    }
}