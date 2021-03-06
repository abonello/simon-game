var gameList = [];
var userList = [];
var padId = 0, color, level = 0;
var delayTime = 700; // ms to wait before switching back to normal pad color.
var whichSound = 1;
var maxSound = 2;
// var playSet = "soundSet1";
var playThisSound = "";
var soundSet1 = [
    "assets/set1/A1.mp3",
    "assets/set1/C1.mp3",
    "assets/set1/E1.mp3",
    "assets/set1/A2.mp3"
    ]
var soundSet2 = [
    "assets/set2/D1.mp3",
    "assets/set2/G1.mp3",
    "assets/set2/A1.mp3",
    "assets/set2/C2.mp3"
    ]
    
$(document).ready(function() {
    $(".start").click(function() {
        $(".soundSet").text(whichSound);
        level++;
        doGameList();
    });
    
    // User List input
    $(".pad").click(function() {
        var id = $(this).attr("id").slice(3,4);
        userList.push(id);
        userAction(id);
    });
    
    //User select set of sound
    $(".btn").click(function() {
        checkWhichButton(this);
        $(".soundSet").text(whichSound);
    });
    
    // End Button
    $(".end").click(function() {
        errorDisplay();
    });
});

function doGameList(){
    checkLevelSpeed();
    // clear userList
    userList = [];
    //display the level
    $(".level").text(level);
    //generate random number and add it to gameList
    giveMeRandomNumber();
    var ndx = 0;
    var sequence = setInterval(function() {
        padAction(ndx, padId, color);
        ndx++;
        if (ndx >= gameList.length) {
            ndx = 0;
            clearInterval(sequence);
        }
    }, delayTime+300);
}

function checkLevelSpeed() {
    switch (true) {
        case (level >= 30):
            delayTime = 350;
            break;
        case (level >= 20):
            delayTime = 400;
            $(".title").addClass("titleColor4").removeClass("titleColor3");
            break;
        case (level >= 15):
            delayTime = 450;
            $(".title").addClass("titleColor3").removeClass("titleColor2");
            break;
        case (level >= 10):
            delayTime = 500;
            $(".title").addClass("titleColor2").removeClass("titleColor1");
            break;
        case (level >= 5):
            delayTime = 600;
            $(".title").addClass("titleColor1");
            break;
        default:
            delayTime = 700;
            $(".title").removeClass("titleColor1").removeClass("titleColor2").removeClass("titleColor3");
    }
}

//generate random number
function giveMeRandomNumber(){
    var randomNum = Math.floor(Math.random() * 4);
    //add generated number to the gameList array.
    gameList.push(randomNum);
    
    //Test -display last generated number in the sound display
    // $(".soundSet").text(randomNum);
}

function userAction(id, color) {
    color = $("#pad"+id).attr("class").split(" ")[1];
    // set lighter color class for pad
    $("#pad"+id).addClass("light"+color).removeClass(color);
    playSound(id);
    // reset color for pad
    if (checkForError(id)) {
        setTimeout(function() {
            $("#pad"+id).addClass(color).removeClass("light"+color);
        }, delayTime); // Do this after time set by delayTime.
        checkIfEndOfList();
    } else {
        errorDisplay();
    }
}

function checkForError(id) {
    var lastUserInputNdx = userList.length - 1;
    if (userList[lastUserInputNdx] == gameList[lastUserInputNdx]) {
        return (1>0); // return True
    } else {
        return (1<0); // return False
    }
}

function checkIfEndOfList() {
    if (userList.length == gameList.length) {
        setTimeout(function() {
            level++;
            doGameList();
        },1000); //Delay before starting the computer List
    }
}

function padAction(ndx, padId, color) {
    padId = gameList[ndx];
    color = $("#pad"+padId).attr("class").split(" ")[1];
        
    // set lighter color class for pad
    $("#pad"+padId).addClass("light"+color).removeClass(color);
    playSound(padId);
    // reset color for pad
    setTimeout(function() {
        $("#pad"+padId).addClass(color).removeClass("light"+color);
    }, delayTime); // Do this after time set by delayTime.
}

function playSound(padId) {
    
    // play correct set of sounds
    switch (whichSound) {
        case 1:
            playThisSound = soundSet1[padId];
            break;
        case 2:
            playThisSound = soundSet2[padId];
            break;
    }

    // $.playSound(soundSet1[padId]);
    var sound = new Audio(playThisSound);
    sound.play();
}

function errorDisplay() {
    userList = [];
    gameList = [];
    delayTime = 700; // I do not think I need this
    $(".level").text("Err");
    $(".soundSet").text("--");
    level=0;
    // All Pads Light Up
    $("#pad0").addClass("lightgreen").removeClass("green");
    $("#pad1").addClass("lightred").removeClass("red");
    $("#pad2").addClass("lightyellow").removeClass("yellow");
    $("#pad3").addClass("lightblue").removeClass("blue");
    // End Sound Sequence
    playSound(0);
    setTimeout(function() {
        playSound(1);
        playSound(2);
    }, 500);
    setTimeout(function() {
        playSound(0);
        playSound(1);
        playSound(2);
        playSound(3);
    }, 1500);
    setTimeout(function() {
        // Revert the colors
        $("#pad0").addClass("green").removeClass("lightgreen");
        $("#pad1").addClass("red").removeClass("lightred");
        $("#pad2").addClass("yellow").removeClass("lightyellow");
        $("#pad3").addClass("blue").removeClass("lightblue");
    }, 2300);
}

function checkWhichButton(btn) {
    var button = $(btn).attr("class").split(" ")[1];
    if (button == "soundDecrease") {
        whichSound -= 1;
        if (whichSound < 1) {
            whichSound = 1;
        }
    }
    if (button == "soundIncrease") {
        whichSound += 1;
        if (whichSound > maxSound) {
            whichSound = maxSound;
        }
    }
}
