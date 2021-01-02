// Pinball project breakdown and psuedo code
//Establish DOM reverences
let game = document.getElementById('game')
let leftScreen = document.getElementById('leftScreen')
let rightScreen = document.getElementById('rightScreen')
let keyPresses = {

}


// Establish canvas context

let ctx = game.getContext('2d')
game.setAttribute('height', getComputedStyle(game)['height'])
game.setAttribute('width', getComputedStyle(game)['width'])

/* Variables */
//Firing Pin Variables
let movementFP = 40;
let movementFPpow = -55;
let pinX = 520;
let pinY = 425;
let pinWidth = 40;
let pinHeight = 125;
let pinColor = 'orange';

//Flipper variables
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

//Pinball variables
let ballX = 540;
let ballY = 400;
const radius = 15;
const startAngle = 0;
const endAngle = 2 * Math.PI;
const cClock = false;
const ballColor = '#a39d9b';

/* MOVEMENT HANDLERS */
// document.addEventListener('keydown', movementFiringPinBack);
// document.addEventListener('keyup', movementFiringPinRelease);
// document.addEventListener('keydown', movementFlipper);
// document.addEventListener('keyup', movementFlipperDown);
// document.addEventListener('keydown', movementPinball);

//KEY PRESS MOVEMENT HANDLERS 

let fired = false;
let flipPressMovement = 95;    
//STOP REPEAT
document.addEventListener('keydown', (e) => {
  // only accept key down when was released
  // if(!fired) {
  //     fired = true;
  //     // check what key pressed...
  
  //     }
  keyPresses[e.code] = true;
  console.log(keyPresses);
  movementFiringPinBack(e);
  movementFlipper(e);
  movementPinball(e);
  
  });

document.addEventListener('keyup', (e) => {
  // fired = false;
  keyPresses[e.code] = false;
  console.log(keyPresses);
  movementFlipperDown(e);
  movementFiringPinRelease(e);
});

function movementFiringPinBack(e) {
  if (keyPresses.KeyF === true) {
    console.log('anything');
    firePin1.y += movementFP;
    // console.log(firePin1.start, firePin1.end);
  } 
}
let resetFiringPin = () => {
  firePin1.y = pinY;
}
function movementFiringPinRelease(e) {
  // if (e.keyCode === 70) {
  //   console.log(`key is up`);
  //   firePin1.y += movementFPpow;
  //   console.log(firePin1.y);
  //   console.log(firePin1.start, firePin1.end);
  //   setTimeout(resetFiringPin, 1000);
  // } 
}
let movementFlipper = (e) => {
  switch (e.keyCode){
    case 90: flipperA.degrees -= flipPressMovement
    break
    case 191: flipperB.degrees += flipPressMovement
    break
  }
}
let movementFlipperDown = (e) => {
  if(e.keyCode === 90 ){
    flipperA.degrees = flipInitAng
  }
  if(e.keyCode === 191){
    flipperB.degrees = -flipInitAng
  }
}

function movementPinball(e) {
  if (e.key === 'w') {
    pinball1.y += 10;
  }
}

/* Classes and constructors */
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

//Initial lane
ctx.fillStyle = 'brown';
ctx.fillRect(500, 175, 15, 435);

//Firing pin 
class firingPin {
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.start = new Vector (this.x, this.y)
    this.end = new Vector (this.x + width, this.y)
    this.center = new Vector (this.x+this.width/2, this.y+this.height/2)
    // //position of centerpoint of top of box
    // this.pos = new Vector(x + width/2, y)
  }
  drawFiringPin = (x, y, width, height, color) =>{
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  firepinUnit(){
    return this.end.subtr(this.start).unit();
  }  
}
let firePin1 = new firingPin(pinX, pinY, pinWidth, pinHeight, pinColor);

//Flippers
//z = keyCode === 90
  // / = keyCode === 191
//Start with rectangles? then move to series of overlapping circles?
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
    //this could live somewhere else? 
    ctx.translate(0, 0);
    ctx.restore();
  }
} 
let flipperA = new drawFlipper(flipAX, flipAY, flipWidth, flipHeight, flipInitAng, flipColor, flipAXR, flipAYR);

let flipperB = new drawFlipper(flipBX, flipBY, flipWidth, flipHeight, -flipInitAng, flipColor, flipBXR, flipBYR);

//Pinball
class pinBall{
  constructor (x,y,r,color){
    this.x = x
    this.y = y
    this.pos = new Vector(x,y);
    this.r = r 
    this.color = color
    this.vel = new Vector(0,0);
    this.acc = new Vector(0,0);
    
  }
  //draw the pinball
  drawPinball = (x,y,r,color) =>{
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, startAngle, endAngle, cClock);
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



/* Collision detection, Penetration Resolution, collision resolution / response */
//Collision detection fucntion between the pinball and firing pin
function pinballFirepinColliding (pinball1, firePin1) {
    
  //return true if they are colliding
  let distX = Math.abs(pinball1.x - (firePin1.center.x));
  let distY = Math.abs(pinball1.y - (firePin1.center.y));

  if (distX > (firePin1.width/2 + pinball1.radius)){
    return false;
  }
  if (distY > (firePin1.height/2 + pinball1.radius)){
    return false;
  }
  
  if (distX <= (firePin1.width/2)){
    return true;
  }
  if (distY <= (firePin1.width/2)){
    return true;
  }

  let dx= distX-firePin1.width/2;
  let dy= distY-firePin1.height/2;
  return((dx**2+dy**2)<(pinball1.r**2));

}
//Collision detection pinball and firing pin
// penetration resolution between pinball and firing pin
// collision resolution between pinball and firing pin

//collision detect pinball and walls
//pen resolution between pinball and walls 
//collision resolution between pinball and walls

//collision detection pinball and flippers
//pen resolution between pinball and flippers
//collision resolution betweeen pinball and flippers

//collision detection pinball and dead space
//pen resolution between pinball and dead space
//collision resolution between pinball and dead space 
//function end game loop

//##### working but must figure out how to stop it from fully rotating when key is held down

// main game loop canvas loop and redraw
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
  // console.log(pinball1.y);
  //left flipper
  flipperA.render();
  //right flipper
  flipperB.render();
//firing pin
  firePin1.drawFiringPin();
  // //console log to check line end start
// pinballFirepinColliding(pinball1, firePin1);
// console.log();
  // collision detection for pb and firing pin
  // if(pinballFirepinColliding(pinball1, firePin1)){
  //   ctx.fillText("Collision", 200, 200);
  //   console.log('collision');
  // }
}, 1000/60);
  

  

  /* Here I need to add a switch for all the if collision detection of pinball to objects */
  //pinball and firiing pin
  //pinball and walls
  //pinball and flippers
  //pinball and deadspace
    //end game loop


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
