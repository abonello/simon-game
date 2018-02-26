var gameList = [];
var padId = 0, level = 0;
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
    padId = gameList[gameList.length - 1];
    console.log("#pad"+padId);
    
    switch(gameList[gameList.length - 1]) {
    case 0:
        // set lighter color class for pad
        $("#pad0").addClass("lightgreen").removeClass("green");
        // reset color for pad
        setInterval(function() {
            $("#pad0").addClass("green").removeClass("lightgreen");
        }, 700); // Do this after 700ms
        break;
    case 1:
        // set lighter color class for pad
        $("#pad1").addClass("lightred").removeClass("red");
        // reset color for pad
        setInterval(function() {
            $("#pad1").addClass("red").removeClass("lightred");
        }, 700); // Do this after 700ms
        break;
    case 2:
        // set lighter color class for pad
        $("#pad2").addClass("lightyellow").removeClass("yellow");
        // reset color for pad
        setInterval(function() {
            $("#pad2").addClass("yellow").removeClass("lightyellow");
        }, 700); // Do this after 700ms
        break;
    case 3:
        // set lighter color class for pad
        $("#pad3").addClass("lightblue").removeClass("blue");
        // reset color for pad
        setInterval(function() {
            $("#pad3").addClass("blue").removeClass("lightblue");
        }, 700); // Do this after 700ms
        break;
    default:
        console.log("Nothing to do.")
    } 

    
}

//generate random number
function giveMeRandomNumber(){
    var randomNum = Math.floor(Math.random() * 4);
    //add generated number to the gameList array.
    gameList.push(randomNum);
    
    //Test -display last generated number in the sound display
    $(".soundSet").text(randomNum);
    console.log(gameList);

}
