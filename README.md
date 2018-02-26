 # Interactive Frontend Development
 ## Milestone Project 
 
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

}
~~~~
