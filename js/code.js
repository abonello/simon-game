var gameList = [];
var userList = [];
var padId = 0, color, level = 0;
var delayTime = 700; // ms to wait before switching back to normal pad color.
var soundSet = [
    "assets/A1.mp3",
    "assets/C1.mp3",
    "assets/E1.mp3",
    "assets/A2.mp3"
    ]
$(document).ready(function() {
    $(".start").click(function(){
        level++;
        doGameList();
    });
    
    // User List input
    $(".pad").click(function(){
        var id = $(this).attr("id").slice(3,4);
        console.log(id);
        userList.push(id);
        console.log(userList);
        userAction(id);
    });
});

function doGameList(){
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
    }, 1000);
}


//generate random number
function giveMeRandomNumber(){
    var randomNum = Math.floor(Math.random() * 4);
    //add generated number to the gameList array.
    gameList.push(randomNum);
    
    //Test -display last generated number in the sound display
    $(".soundSet").text(randomNum);
    // console.log(gameList);
}

function userAction(id, color) {
    color = $("#pad"+id).attr("class").split(" ")[1];
    // set lighter color class for pad
    $("#pad"+id).addClass("light"+color).removeClass(color);
    playSound(id);
    // reset color for pad
    setTimeout(function() {
        $("#pad"+id).addClass(color).removeClass("light"+color);
    }, delayTime); // Do this after time set by delayTime.
}


function padAction(ndx, padId, color) {
    padId = gameList[ndx];
    color = $("#pad"+padId).attr("class").split(" ")[1];
    // console.log(gameList[ndx]);
    // console.log("#pad"+padId+" : "+color);
        
    // set lighter color class for pad
    $("#pad"+padId).addClass("light"+color).removeClass(color);
    playSound(padId);
    // reset color for pad
    setTimeout(function() {
        $("#pad"+padId).addClass(color).removeClass("light"+color);
    }, delayTime); // Do this after time set by delayTime.
}

function playSound(padId) {
    $.playSound(soundSet[padId]);
}
