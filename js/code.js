var gameList = [];
var padId = 0, color, level = 0;
var delayTime = 700; // ms to wait before switching back to normal pad color.
$(document).ready(function() {
    $(".start").click(function(){
        level++;
        doGameList();
    });
});

function doGameList(){
    //display the level
    $(".level").text(level);
    //generate random number and add it to gameList
    giveMeRandomNumber();
    var x = 0;
    var sequence = setInterval(function() {
        padAction(x, padId, color);
        x++;
        if (x >= gameList.length) {
            x = 0;
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


function padAction(x, padId, color) {
    padId = gameList[x];
        color = $("#pad"+padId).attr("class").split(" ")[1];
        console.log(gameList[x]);
        console.log("#pad"+padId+" : "+color);
        
    // set lighter color class for pad
    $("#pad"+padId).addClass("light"+color).removeClass(color);
    // playSound(padId);
    // reset color for pad
    setTimeout(function() {
        $("#pad"+padId).addClass(color).removeClass("light"+color);
    }, delayTime); // Do this after time set by delayTime.
}

function playSound(padId) {
    
}
