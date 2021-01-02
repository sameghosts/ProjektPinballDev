// Pinball project breakdown and psuedo code
//Establish DOM reverences
let game = document.getElementById('game')
let leftScreen = document.getElementById('leftScreen')
let rightScreen = document.getElementById('rightScreen')


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

//Vector Class for collision detection

class Vector {
  constructor (x,y){
    this.x = x 
    this.y = y
  }

  add(v){
    return new Vector(this.x+v.x, this.y+v.y);
  }

  subtr(v){
    return new Vector(this.x-v.x, this.y-v.y);
  }

  mag(){
    return Math.sqrt(this.x**2 + this.y**2);
  }
  
  mult(n){
    return new Vector (this.x*n, this.y*n);
  }

  unit(){
    if(this.mag() === 0){
      return new Vector (0,0);
    } else {
    return new Vector (this.x/this.mag(), this.y/this.mag());
    }
  }

  normal(){
    return new Vector(-this.y, this.x).unit();
  }

  static dot(v1, v2){
    return v1.x*v2.x + v1.y*v2.y; 
  }

  drawVec(start_x, start_y, n, color){
    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(start_x + this.x * n, y + this.y * n);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}
//Dead Space - use a rectangle for now
ctx.fillStyle = 'darkgreen';
ctx.fillRect(0, 500, 500, 112);
ctx.closePath();
    //Flippers 
//Start with rectangles? then move to series of overlapping circles?

//Refactoring into drawFlipper with render
const flipAX = 125;
const flipAY = 375;
const flipAXR = flipAX;
const flipAYR = flipAY +10;
const flipBX = 245;
const flipBY = 375;
const flipBXR = flipBX + 135;
const flipBYR = flipBY + 10;
const flipWidth = 135;
const flipHeight = 20;
let flipInitAng = 45;
const flipColor = 'red';
function drawFlipper(x, y, width, height, degrees, color, flipRX, flipRY){
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.degrees = degrees
  this.color = color
  this.flipRX = flipRX
  this.flipRY = flipRY
  this.render = function() {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.flipRX, this.flipRY);
    ctx.rotate(this.degrees * (Math.PI/180));
    ctx.rect(this.x-this.flipRX, this.y-this.flipRY, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.translate(0, 0);
    ctx.restore();
  }
} 
let flipperA = new drawFlipper(flipAX, flipAY, flipWidth, flipHeight, flipInitAng, flipColor, flipAXR, flipAYR);

let flipperB = new drawFlipper(flipBX, flipBY, flipWidth, flipHeight, -flipInitAng, flipColor, flipBXR, flipBYR);


   //Pinball
let ballX = 540;
let ballY = 400;
const radius = 15;
const startAngle = 0;
const endAngle = 2 * Math.PI;
const cClock = false;
const ballColor = '#a39d9b';
class pinBall{
  constructor (x,y,r,color){
    this.pos = new Vector(x,y);
    this.r = r 
    this.color = color
    this.vel = new Vector(0,0);
    this.acc = new Vector(0,0);
    
  }
  //draw the pinball
  drawPinball = (x,y,r,color) =>{
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, startAngle, endAngle, cClock);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.fillStyle = this.color;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    }
  //display the acceleration and velocity vectors of the ball
  display() {
    this.vel.drawVec(this.x, this.y, 10, 'green');
    this.acc.drawVec(this.x, this.y, 100, 'red');
  }
    
}

let pinball1 = new pinBall (ballX, ballY, radius, ballColor);

//Initial lane
ctx.fillStyle = 'brown';
ctx.fillRect(500, 175, 15, 435);

//Firing pin 
let movementFP = 465;
let movementFPpow = 410;
let pinX = 520;
let pinY = 425;
let pinWidth = 40;
let pinHeight = 125;
let pinColor = 'orange';
class firingPin {
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    // //position of centerpoint of top of box
    // this.pos = new Vector(x + width/2, y)
  }
  drawFiringPin = (x, y, width, height, color) =>{
    
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
let firePin1 = new firingPin(pinX, pinY, pinWidth, pinHeight, pinColor);


// Map firing pin and flippers to key presses  
      // determine if timeout's are needed 
//firing pin
function movementFiringPinBack(e) {
  if (e.keyCode === 70) {
    console.log(e.key, e.keyCode);
    firePin1.y = movementFP;
  } 
}
function movementFiringPinRelease(e) {
  if (e.keyCode === 70) {
    console.log(`key is up`);
    firePin1.y = movementFPpow;
  } 
}
//flippers 
  //z = keyCode === 90
  // / = keyCode === 191
let flipPressMovement = 95;
let movementFlipper = (e) => {
  switch (e.keyCode) {
    case 90:
      flipperA.degrees -= flipPressMovement
      break
    case 191:
      flipperB.degrees += flipPressMovement
      break
  }    
}
let movementFlipperDown = (e) => {
  switch (e.keyCode) {
    case 90:
      flipperA.degrees = flipInitAng
      break
    case 191:
      flipperB.degrees = -flipInitAng
      break
  }
}
//##### working but must figure out how to stop it from fully rotating when key is held down

//canvas loop and redraw
setInterval(function(){
  ctx.clearRect(0, 0, game.width, game.height);
  //Initial lane
  ctx.fillStyle = 'brown';
  ctx.fillRect(500, 175, 15, 435);
  //deadspace
  ctx.fillStyle = 'darkgreen';
  ctx.fillRect(0, 500, 500, 112);
  ctx.closePath();
  //pinball
  pinball1.drawPinball();
  //left flipper
  flipperA.render();
  //right flipper
  flipperB.render();
//firing pin
  firePin1.drawFiringPin();
}, 1000/60);

document.addEventListener('keydown', movementFiringPinBack);
document.addEventListener('keyup', movementFiringPinRelease);
document.addEventListener('keydown', movementFlipper);
document.addEventListener('keyup', movementFlipperDown);


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
// function viewport(){
// var e = window, a = 'inner';
// if (!('innerWidth' in window)){
// a = 'client';
// e = document.documentElement || document.body;
// } 
// return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
// }
// console.log(viewport());