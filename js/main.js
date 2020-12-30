// Pinball project breakdown and psuedo code
//Establish DOM reverences
let game = document.getElementById('game')
let leftScreen = document.getElementById('leftScreen')
let rightScreen = document.getElementById('rightScreen')
const flipAX = 125;
const flipAY = 375;
const flipBX = 245;
const flipBY = 375;
const flipBXR = flipBX + 135;
const flipBYR = flipBY + 10;
const flipWidth = 135;
const flipHeight = 20;
const flipInitAng = 45;

// Establish canvas context

let ctx = game.getContext('2d')
game.setAttribute('height', getComputedStyle(game)['height'])
game.setAttribute('width', getComputedStyle(game)['width'])



//Establish Game Canvas object
/* Game objects:

    Pinball
    Flippers
    Initial / Starting Lane
    Firing Pin
    Dead space 
    */
//Dead Space - use a rectangle for now
ctx.fillStyle = 'darkgreen';
ctx.fillRect(0, 500, 500, 112);
ctx.closePath();
    //Flippers 
//Start with rectangles? then move to series of overlapping circles?

//Flipper A 
let drawInitFlipA = (x, y, width, height,degrees) => {
  ctx.save();
  ctx.beginPath();
  ctx.translate(flipAX, flipAY);
  ctx.rotate(degrees * (Math.PI/180));
  ctx.rect(x-flipAX, y-flipAY, width, height);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
  ctx.translate(0, 0);
  ctx.restore();
}
drawInitFlipA (flipAX, flipAY, flipWidth, flipHeight, flipInitAng);

//Flipper B
let drawInitFlipB = (x, y, width, height,degrees) => {
  ctx.save();
  ctx.beginPath();
  ctx.translate(flipBXR, flipBYR);
  ctx.rotate(degrees * (Math.PI/180));
  ctx.rect(x-flipBXR, y-flipBYR, width, height);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
  ctx.translate(0, 0);
  ctx.restore();
}
drawInitFlipB (flipBX, flipBY, flipWidth, flipHeight, -flipInitAng);

   //Pinball
let ballX = 540;
let ballY = 400;
const radius = 15;
const startAngle = 0;
const endAngle = 2 * Math.PI;
const cClock = false;
ctx.beginPath();
ctx.arc(ballX, ballY, radius, startAngle, endAngle, cClock);
ctx.lineWidth = 2;
ctx.strokeStyle = 'black';
ctx.fillStyle = '#a39d9b';
ctx.stroke();
ctx.fill();
ctx.closePath();

   //Initial lane
ctx.fillStyle = 'brown';
ctx.fillRect(500, 175, 15, 435);

//Firing pin 
let pinY = 425;
ctx.fillStyle = 'orange';
ctx.fillRect(520, pinY, 40, 125);



// Map firing pin and flippers to key presses  
      // determine if timeout's are needed 

// Establish collision detection 
  // pinball and flippers
  // pinball and firing pin
  // pinball and the game board
  // pin ball and the dead space

// Establish Collision movement / physics
  // pinball and collision walls 
  // pinball and collision with bumpers 
  // initial firing
  // motion / responsivitiy of the flippers

// have functioning pinball with flippers firing pin and some kind of object / interaction on board as Minimum Viable Product by Tuesday December 29 9pm PST

//STRETCH GOALS AND FURTHER IMPLEMENTATION

// add lanes with words

// Create a scoring system and bonus conditions

// add circular bumpers

// add targets

// add multiball 

// add music 

// add visual elements

// second level

//Determine Browser size - 
/*
 window fullscreen - width: 1920, height: 969
 window fullscreen dev tools mobile - width: 400, height: 807  

 Should I determine objects in window fullscreen to be mathmaetically convertble to fullscreen mobile? 
        MAYBE?????? 

 funcition i used to get it: 
*/ 
function viewport(){
var e = window, a = 'inner';
if (!('innerWidth' in window)){
a = 'client';
e = document.documentElement || document.body;
} 
return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}
console.log(viewport());