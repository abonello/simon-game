 # Interactive Frontend Development
 ## Milestone Project 
 
 ### This project is published as a GitHub page
 [Simon Game](https://abonello.github.io/simon-game/) -- **Right-Click** and
 select **Open in New Tab**.
 
 ### Create a Memory Game

Build a simple single-player memory game inspired by Simon. Check out this 
short [video](https://www.youtube.com/watch?v=1Yqj76Q4jJ4)
and [Wikipedia entry](https://en.wikipedia.org/wiki/Simon_(game))
to understand the rules of the game.


*Provide details in your README.md of the logic you have used to build your game 
as well as an explanation of how you tested your logic.*

## Plans for the Build
I intend to use two ways to build this game:
1. based on modifying the shapes of divs
2. use of svg

With regards to the logic I will use **jQuery** and will test using **jasmine**.  
I might use **Bootstrap**, but I have not made a final decision on this yet.

Version control will be taken care of by using **git** and **GitHub**.

## Layout of the game
The overall layout of the game will resemble the original physical game.  
One thing that I would like to have is the ability to use different sets of 
sounds and pitches. This will have the effect of creating different 
tonalities and melodies, resulting in a simple form of algorithmic 
melodic composition.

Colors of pads where chosen to imitate old plastic.


## Logic
Remember to link to jQuery CDN.

1. Once the user starts game, the board starts a list sequence
2. user replicates the sequence
3. If correct board adds another item to the list sequence -- Go to step 2
4. If wrong an error sound and the game stops

Features:
* When a pad is played by the computer or the user, the pad lights up and a sound is emitted
* I want to be able to use different sets of sounds
* I will start with pre-recorded sounds but later I want to syntehsise the sound in real time
* I want to be able to keep track of best scores, at least for the session.


## Code
The code starts when the document is ready
* Main function of the program:
~~~~javascript
$(document).ready(function() {
});
~~~~

Inside the main function I need an event listener to target the start button.

~~~~javascript
$(".start").click(function(){
    level++;
    doGameList();
 
});
~~~~

This should trigger a function that will . . . . 
~~~~javascript
function doGameList(){
    //display the level
    $(".level").text(level);
    //generate random number and add it to gameList
    giveMeRandomNumber();
 
}
~~~~

I will need a few global variables that I will place at the very top of the file
~~~~javascript
userList = [];  // holds the user input
gameList = [];  // holds the computer randomly-generated list
var pad, level = 0, sound = 1;
// Sounds
var gameSounds = []; // I need to find some sources
// Later on I will have more than one set of sounds which can be selected by the user.
// At a later stage I will just store parameter values to create sounds in real time.
~~~~

~~~~javascript
//TESTING 1
$(document).ready(function() {
    var random = Math.random();
    console.log(random);
    console.log(random * 4);
    console.log(Math.floor(random * 4));
    //gives output 0, 1, 2, 3
});
~~~~
~~~~javascript
//TESTING 2
var random;
var anArray = [];
$(document).ready(function() {
    // build list of 10 random numbers
    for (var i = 0; i < 100; i++) {
        random = Math.random();
        anArray.push(Math.floor(random * 4));
    }
    console.log(anArray);
});
~~~~
~~~~javascript
//generate random number
function giveMeRandomNumber(){
    var randomNum = Math.floor(Math.random() * 4);
    //add generated number to the gameList array.
    gameList.push(randomNum);
    
    
    //Test -display last generated number in the sound display
    //$(".soundSet").text(randomNum);
    //console.log(gameList);

}
~~~~

After testing the increments of level, the random generation of numbers
and the building of the gameList Array, I need to make sure that I can 
change the color of the selected pad for a set time and revert back to
the original color. I will also need to think about the sounds.

I need to identify the pads. I will use IDs pad1, pad2, pad3, pad4.
I will add a class with a lighter color for the selected pad and remove 
the original class, then after a set time (use setInterval function), I 
will remove the lighter class and reset the original class.  

The following code will turn pad one to light green and back again after
700ms.
~~~~javascript
// set lighter color class for pad
    $("#pad1").addClass("lightgreen").removeClass("green");
    // reset color for pad
    setInterval(function() {
        $("#pad1").addClass("green").removeClass("lightgreen");
    }, 700); // Do this after 700ms
~~~~

Now I need to dynamically select the pad depending on the last generated
number.
~~~~javascript
padId = gameList[gameList.length - 1];
console.log("#pad"+padId);
~~~~

I renumbered the pads to pad0, pad1, pad2, pad3. This will avoid having to 
do the maths in the code.
I will switch case statements to select which set of classes need to be changed.

~~~~javascript
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
~~~~

I can replace the above switch if I can automatically extract the color 
which is the same as the class of the pad.

~~~~javascript
// get the color
color = $("#pad"+padId).attr("class").split(" ")[1];
console.log("#pad"+padId+" : "+color);

// set lighter color class for pad
$("#pad"+padId).addClass("light"+color).removeClass(color);
// reset color for pad
setInterval(function() {
    $("#pad"+padId).addClass(color).removeClass("light"+color);
}, delayTime); // Do this after time set by delayTime.
~~~~

Now I need to loop throught the array and do the above for each number
stored in the gameList array.

I had a few issues with refactoring but now it is working.

#Sounds
I added four temporary sounds and got them to play with their respective pad.
~~~~javascript
var soundSet = [
    "assets/A1.mp3",
    "assets/C1.mp3",
    "assets/E1.mp3",
    "assets/A2.mp3"
    ]

function padAction(ndx, padId, color) {
    . . . .
    playSound(padId);
    . . . .
}

function playSound(padId) {
    $.playSound(soundSet[padId]);
}
~~~~

Next step is to work on the user input of a sequence to match.

I need an array to hold the user's list:
~~~~javascript
var userList = [];
~~~~

A listener is created in the document.ready function
~~~~javascript
// User List input
$(".pad").click(function(){
    var id = $(this).attr("id").slice(3,4);
    console.log(id);
    userList.push(id);
    console.log(userList);
    userAction(id);
});
~~~~
The console.log lines are for testing purposes. They will be removed later.
This triggers a userAction function:
~~~~javascript
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
~~~~
Notice that the same playSound function is used.
Later I will see if I can refactor the userAction function and the 
padAction function.

Before proceeding to making the comparison between the computer list
and the user list, I want to be publish the page on GitHub Pages.
I will add a link to the repository on the index page and a link to
the GitHub Page at the top of this README.md.

I am trying to add target="_blank" but it does not work. I read that 
I can use plain HTML but it does not seem to work either. I will revert
to markdown.  
I wrote an instruction to right-click.

###Compare computer and user list.
The following code is for testing. It uses console logs to track conditions.
~~~~javascript
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
        console.log("ERROR: End of Game");
    }
}

function checkForError(id) {
    var lastUserInputNdx = userList.length - 1;
    console.log(lastUserInputNdx);
    if (userList[lastUserInputNdx] == gameList[lastUserInputNdx]) {
        return (1>0); // return True
    } else {
        return (1<0); // return False
    }
}

function checkIfEndOfList() {
    if (userList.length == gameList.length) {
        console.log("End of List: Press Start again");
    } else {
        console.log("Next Input");
    }
}
~~~~

I will next enable the code to move on to the computer adding a new 
pad __without__ having to press **Start**.

Udated code and the final Error Display:
~~~~javascript
function checkIfEndOfList() {
    if (userList.length == gameList.length) {
        console.log("End of List: Press Start again");
        setTimeout(function() {
            level++;
            doGameList();
        },1000); //Delay before starting the computer List
    } else {
        console.log("Next Input");
    }
}

function errorDisplay() {
    userList = [];
    gameList = [];
    level=0;
    $(".level").text("Err");
    // All Pads Light Up
    console.log("Change Collors");
    $("#pad0").addClass("lightgreen").removeClass("green");
    $("#pad1").addClass("lightred").removeClass("red");
    $("#pad2").addClass("lightyellow").removeClass("yellow");
    $("#pad3").addClass("lightblue").removeClass("blue");
    console.log("Play 1 notes");
    playSound(0);
    setTimeout(function() {
        console.log("Play 2 notes");
        playSound(1);
        playSound(2);
    }, 500);
    setTimeout(function() {
        console.log("Play All notes");
        playSound(0);
        playSound(1);
        playSound(2);
        playSound(3);
    }, 1500);
    setTimeout(function() {
        console.log("Revert the colors");
        $("#pad0").addClass("green").removeClass("lightgreen");
        $("#pad1").addClass("red").removeClass("lightred");
        $("#pad2").addClass("yellow").removeClass("lightyellow");
        $("#pad3").addClass("blue").removeClass("lightblue");
    }, 2300);
}
~~~~

I will clean out the console.logs.