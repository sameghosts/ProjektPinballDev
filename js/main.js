// Pinball project breakdown and psuedo code

//Establish DOM reverences
let game = document.getElementById('game')
let leftScreen = document.getElementById('leftScreen')
let rightScreen = document.getElementById('rightScreen')
let keyPresses = {

}

//useless comment to test commit
//I have no fucking idea what to do
//ok is this ok? did we fix the issue

// Establish canvas context

let ctx = game.getContext('2d')
game.setAttribute('height', getComputedStyle(game)['height'])
game.setAttribute('width', getComputedStyle(game)['width'])

//object arrays
const wallsArr = [];
const pbsArr = [];
const flipWallArr = [];
console.log("canvas width " + game.clientWidth);
console.log("canvas height " + game.clientHeight);

/* Variables */
//Game loop and time stamp (seconda passed, timestamp, frames per second)
let oldTimeStamp = 0;
let fps;
let friction = 0.05;
//pinball height pass - boolean for if pinball has been fired and passed the initial lane, draws a new wall to block pinball falling back in lane and allows gravity to be factored into the pinballs motion
let pinballHeightPass = false;
let turnOnGrav = false;
//post gravity boolean - boolean that allows check for if gravity has been turned on and the wall drawn etc.
let pinballPostGrav = false;

//Vector Class
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
    return new Vector (this.x/this.mag(), this.y/this.mag());
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

//Firing Pin Variables
let movementFP = 40;
let movementFPpow = -60;
let pinX = 520;
let pinY = 420;
let pinWidth = 40;
let pinHeight = 125;
let pinColor = 'orange';

/* Flipper A (left) variable nonsense */
// top
  //down
let topDownStartA = new Vector (135, 360);
let topDownEndA = new Vector (234, 459);
  //up
let topUpStartA = new Vector (115, 360);
let topUpEndA = new Vector (214, 261);

//bottom
  //down
let botDownStartA = new Vector (115, 380);
let botDownEndA = new Vector (214, 479);
  //up
let botUpStartA = new Vector (135, 380);
let botUpEndA = new Vector (234, 281);

//side left 
  //down
  let sLDownStartA = new Vector(115, 380);
  let sLDownEndA = new Vector(135, 360);
  //up
  let sLUpStartA = new Vector(115, 360);
  let sLUpEndA = new Vector(135, 380);
  
  //side right
  //down
  let sRDownStartA = new Vector(214, 479);
  let sRDownEndA = new Vector(234, 459);
  //up
  let sRUpStartA = new Vector(214, 261);
  let sRUpEndA = new Vector(234, 281);

/* Flipper B Bs variables */
//flipB - 35 distance x apart + 140
// top
//down
let topDownStartB = new Vector (306, 459);
let topDownEndB = new Vector (405, 360);
  //up
let topUpStartB = new Vector (326, 261);
let topUpEndB = new Vector (425, 360);

//bottom
  //down
let botDownStartB = new Vector (326, 479);
let botDownEndB = new Vector (425, 380);
  //up
let botUpStartB = new Vector (306, 281);
let botUpEndB = new Vector (405, 380);

//side left 
  //down
  let sLDownStartB = new Vector(306, 459);
  let sLDownEndB = new Vector(326, 479);
  //up
  let sLUpStartB = new Vector(306, 281);
  let sLUpEndB = new Vector(326, 261);
  
  //side right
  //down
  let sRDownStartB = new Vector(405, 360);
  let sRDownEndB = new Vector(425, 380);
  //up
  let sRUpStartB = new Vector(405, 380);
  let sRUpEndB = new Vector(425, 360);
  

//Pinball variables
let ballX = 540;
let ballY = 400;
const radius = 15;
const startAngle = 0;
const endAngle = 2 * Math.PI;
const cClock = false;
const ballColor = '#a39d9b';
const pbmass = 1;

/* MOVEMENT HANDLERS ALPHABETIZED */

//KEY PRESS MOVEMENT HANDLERS 

let fired = false;
let flipPressMovement = 95;    
//STOP REPEAT
document.addEventListener('keydown', (e) => {
  
  keyPresses[e.code] = true;
  console.log(keyPresses);
  movementFlipper();
  movementFiringPinBack();
  // movementPinball();
  // movementPinball();
  
  });

document.addEventListener('keyup', (e) => {
  // fired = false;
  keyPresses[e.code] = false;
  console.log(keyPresses);
  movementFlipperDown();
  movementFiringPinRelease();
  // console.log(fpin);
});

function movementFiringPinBack() {
  if (keyPresses.KeyF === true && firePin1.center.y < 510) {
    firePin1.center.y +=movementFP;
    // console.log(firePin1.center.y);
    // console.log(pinball1.pos);
  } 
}
let resetFiringPin = () => {
  firePin1.vy =0;
  firePin1.center.y = 482.5;
  }
function movementFiringPinRelease() {
  if (keyPresses.KeyF === false && firePin1.center.y > 475) {
    firePin1.center.y += movementFPpow;
    // firePin1.vy += -300;
    // console.log(secondsPassed);
    console.log(firePin1.vy);
    
    setTimeout(resetFiringPin, 200);
    keyPresses.KeyF = true;
  } 
}
/* FIX THE FLIPPER### MOVEMENT_Handler ###$$$*/
//mvmt handlers for the flippers
//top movement logic up flipATop.end.y > 450
//top movement logic down flipATop.end.y < 270
let movementFlipper = () => {
  if(keyPresses.KeyZ === true){
    flipATop.start = topUpStartA;
    flipATop.end = topUpEndA;
    flipABot.start = botUpStartA;
    flipABot.end = botUpEndA;
    flipAsL.start = sLUpStartA;
    flipAsL.end = sLUpEndA;
    flipAsR.start = sRUpStartA;
    flipAsR.end = sRUpEndA;
    
    // console.log(flipperA.degrees);
    // console.log(pinball1.pos);
    console.log('we did it')
    }
  if(keyPresses.Slash === true){
    flipBTop.start = topUpStartB;
    flipBTop.end = topUpEndB;
    flipBBot.start = botUpStartB;
    flipBBot.end = botUpEndB;
    flipBsL.start = sLUpStartB;
    flipBsL.end = sLUpEndB;
    flipBsR.start = sRUpStartB;
    flipBsR.end = sRUpEndB;
    }
  }

let movementFlipperDown = () => {
  if(keyPresses.KeyZ === false){
    flipATop.start = topDownStartA;
    flipATop.end = topDownEndA;
    flipABot.start = botDownStartA;
    flipABot.end = botDownEndA;
    flipAsL.start = sLDownStartA;
    flipAsL.end = sLDownEndA;
    flipAsR.start = sRDownStartA;
    flipAsR.end = sRDownEndA;
    console.log('and down');
  }
  if(keyPresses.Slash === false){
    flipBTop.start = topDownStartB;
    flipBTop.end = topDownEndB;
    flipBBot.start = botDownStartB;
    flipBBot.end = botDownEndB;
    flipBsL.start = sLDownStartB;
    flipBsL.end = sLDownEndB;
    flipBsR.start = sRDownStartB;
    flipBsR.end = sRDownEndB;
    
  }
}


/* Classes and constructors AlPHABETIZED*/

//gravity vector!
const gravity = new Vector (0, 9.81);
// const gravity = new Vector(0, 9.81);

//Dead Space - use a rectangle for now, #### refactor into class for collision detection and game state boolean logic
class deadSpace {
  constructor (x, y, width, height, color){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.center = new Vector(this.x + this.width/2, this.y + this.height/2);
  }
  drawDS = () => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
    
  }
}
// ctx.fillRect(0, 500, 500, 112);
let colorGP = 'darkgreen';
let colorGO = 'red';
let daGutter = new deadSpace (0, 500, 500, 112, colorGP);

//Initial lane - #### eventually refactor into a class for detection, perhaps a lane class that can be pushed to array
ctx.fillStyle = 'brown';
ctx.fillRect(500, 175, 15, 435);

//Firing pin 
class firingPin {
  constructor(x, y, width, height, color, vx, vy) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.vx= vx;
    this.vy= vy;
    this.start = new Vector (this.x, this.y)
    this.end = new Vector (this.x + width, this.y)
    this.center = new Vector (this.x+this.width/2, this.y+this.height/2)
    this.r = this.center.y-this.y
    this.vel = new Vector (this.vx, this.vy);
    this.acc = new Vector (0, 0);
    this.acceleration = 50;
    // //position of centerpoint of top of box
    // this.pos = new Vector(x + width/2, y)
  }
  drawFiringPin = (x, y, width, height, color) =>{
    ctx.fillStyle = this.color
    ctx.fillRect(this.center.x-this.width/2, this.center.y-this.height/2, this.width, this.height)
  }
  //unnecessary method if I can figure out new physics method
  // reposition(){
  //   this.acc = this.acc.unit().mult(this.acceleration);
  //   this.vel = this.vel.add(this.acc);
  //   this.vel = this.vel.mult(1-friction);
  //   this.center = this.center.add(this.vel);
  // }
  update = (secondsPassed) =>{
    this.center.x += this.vx * secondsPassed;
    this.center.y += this.vy * secondsPassed;
  }
}
let firePin1 = new firingPin(pinX, pinY, pinWidth, pinHeight, pinColor, 0, 0);


//Flipper as line / wall
//FlipWall class 
  // x1, y1 - start line; x2, y2, - end of line; colorS - color for stroke; ex, ey, - elasticity
class flipWall {
  constructor (x1, y1, x2, y2, colorS, ex, ey){
    this.start = new Vector (x1, y1);
    this.end = new Vector (x2, y2);
    //flipwall elasticity tbd later
    this.colorS = colorS; 
    this.ex = ex;
    this.ey = ey;
    flipWallArr.push(this);
  }
  drawFlipWall(){
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.strokeStyle = this.colorS;
    ctx.stroke();
    ctx.closePath();
  }
  wallUnit (){
    return  this.end.subtr(this.start).unit();
  }
}
//flip A init
//top movement logic up flipATop.end.y > 450
//top movement logic down flipATop.end.y < 270
let flipATop = new flipWall (topDownStartA.x, topDownStartA.y, topDownEndA.x, topDownEndA.y, 'orange', 2, 2);
//bot
let flipABot = new flipWall (botDownStartA.x, botDownStartA.y, botDownEndA.x, botDownEndA.y, 'orange', 2, 2);
//side left
let flipAsL = new flipWall (sLDownStartA.x, sLDownStartA.y, sLDownEndA.x, sLDownEndA.y, 'orange', 2, 2);
//side right
let flipAsR = new flipWall (sRDownStartA.x, sRDownStartA.y, sRDownEndA.x, sRDownEndA.y, 'orange', 2, 2);

//flip A init
//top movement logic up flipATop.end.y > 450
//top movement logic down flipATop.end.y < 270
let flipBTop = new flipWall (topDownStartB.x, topDownStartB.y, topDownEndB.x, topDownEndB.y, 'orange', 2, 2);
//bot
let flipBBot = new flipWall (botDownStartB.x, botDownStartB.y, botDownEndB.x, botDownEndB.y, 'orange', 2, 2);
//side left
let flipBsL = new flipWall (sLDownStartB.x, sLDownStartB.y, sLDownEndB.x, sLDownEndB.y, 'orange', 2, 2);
//side right
let flipBsR = new flipWall (sRDownStartB.x, sRDownStartB.y, sRDownEndB.x, sRDownEndB.y, 'orange', 2, 2);

//bot
// Pinball
  class pinBall {
  constructor (x,y,r,color,m, vx, vy){
    this.x = x
    this.y = y
    this.pos = new Vector(x,y);
    this.r = r 
    this.vx = vx;
    this.vy = vy;
    this.m = m
    if (this.m === 0){
      this.inv_m = 0;
    } else {
      this.inv_m = 1 / this.m;
    }
    this.elasticity = 30;
    this.color = color
    this.vel = new Vector(this.vx, this.vy);
    this.acc = new Vector (0,0);
    this.speed = new Vector (0,0);
    // this.gravity = 0.05;
    // this.gravitySpeed = 0;
    this.acceleration = 1;
    this.edge = this.pos.x + this.r;
    pbsArr.push(this);
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
  reposition = () =>{
      // this.acc = this.acc.add(gravity);
      // this.acc = this.acc.unit()
      this.acc = this.acc.unit().mult(this.acceleration);
      this.vel = this.vel.add(this.acc);
      this.vel = this.vel.mult(1-friction);
      this.pos = this.pos.add(this.vel);
    }
  hitsBottom = () =>{
    const bottomEdge = game.height - this.r;
    if (this.pos.y > bottomEdge){
      this.pos.y = bottomEdge;
    }
  }
  // newPos = () => {
  //   this.gravitySpeed += this.gravity;
  //   this.pos.x += this.speed.x;
  //   this.pos.y += this.speed.y +this.gravitySpeed;
  //   this.hitsBottom();
    
  // }

  update = (secondsPassed) =>{
    //gravity!!!!
    if (turnOnGrav){
      // console.log(this.pos);
      this.vy += 9.81 * secondsPassed;
    pinballPostGrav = true;
    }

    //movement based on velocity x y
    this.pos.x += this.vx * secondsPassed;
    this.pos.y += this.vy * secondsPassed;
  }
}
// //add an update function for pinball class that updates movement and collision vectors with new simpler physics
// }
let pinball1 = new pinBall (ballX, ballY, radius, ballColor, pbmass, 0, 0);

//#### should I push all game objects into a object array in order to more easily manage collision detection or is that unnecessary and counter-intuitive

//wall class, segment btwn two different points
// i hope the push method for this works and that the physics response works #### figure out new collision physics for pinball and walls
class Wall{
  constructor (x1, y1, x2, y2, ex, ey){
    this.start = new Vector(x1, y1);
    this.end = new Vector(x2, y2);
    //wall elasticity bounciness values remember to add to each wall instantiation!
    this.ex = ex;
    this.ey = ey;
    wallsArr.push(this);
  }
  drawWall(){
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
  }
  wallUnit(){
    return this.end.subtr(this.start).unit();
  }
}


/* Collision detection, Penetration Resolution, collision resolution / response */

//Collision detection pinball and firing pin
function pinballFirepinColliding(){
  let distx = Math.abs(pinball1.pos.x - firePin1.center.x);
  let disty = Math.abs(pinball1.pos.y - firePin1.center.y);
  //sides check
  if (distx > (firePin1.width/2 + pinball1.r)) { return false; }
  if (disty > (firePin1.height/2 + pinball1.r)) { return false; }

  if (distx <= (firePin1.width/2)) { return true; } 
  if (disty <= (firePin1.height/2)) { return true; }
  //pythag theorem for corner
  let dx=distx-firePin1.width/2;
  let dy=disty-firePin1.height/2;
  return (dx**2+dy**2<=(pinball1.r**2));
}

  // penetration resolution between pinball and firing pin
function pen_res_fp(){
  //refactor into different and simpler math?
  let dist = pinball1.pos.subtr(firePin1.center);
  let pen_depth = pinball1.r + firePin1.r - dist.mag();
  // console.log('firepin r' + firePin1.r)
  // console.log(pen_depth);
  let pen_depth_div2 = pen_depth/2;
  let pen_res = dist.unit().mult(pen_depth_div2);
  // console.log(Object.keys(pen_res));
  // // console.log(pen_res.x, pen_res.y);
  // // console.log('pen res ' + pen_res);
  // console.log(pen_res);
  // console.log(pinball1.pos);
  pinball1.pos = pinball1.pos.add(pen_res);
  // console.log(pinball1.pos);
  
};

// collision resolution between pinball and firing pin
let collhappened = false;
let fireHappened = false;
function collision_response_fp(){
  //fake / cheater method for vector change, create a new solution for this using the new update methods for the pinball class 
  
  //collision vector of impact firing pin and pinball
  let vecCollision = new Vector (pinball1.pos.x-firePin1.center.x, pinball1.pos.y-firePin1.center.y);
  // console.log(vecCollision);
  //distance of collision vector (magnitude):
  let distance = vecCollision.mag();
  // console.log('distance of col vec ' + distance);
  //normalized collision vector or unit vector(collsion vector with mag 1)
  let vecCollisionNorm = vecCollision.unit();
  let vRelativeVelocity = pinball1.vel.subtr(firePin1.vel);
  let speed = vRelativeVelocity.x * vecCollisionNorm.x + vRelativeVelocity.y * vecCollisionNorm.y;
  // if (speed<0) {
  //   break;
  // } 
    //collision velocity
    // console.log(speed);
    let vecCollisionVel = vecCollisionNorm.mult(speed);
    console.log(vecCollisionVel);
    pinball1.vx -= vecCollisionVel.x;
    pinball1.vy -= 100;
    // pinball1.vy += -150;
    // pinball1.center.subtr(vecCollisionVel);
    // firePin1.vx += vecCollisionVel.x;
    // firePin1.vy += vecCollisionVel.y;
    // console.log(pinball1.vy);
//now i need to update the movement of the firing pin on release to be part of the update
  //boolean to prevent continual collision response for the pinball after the firing has fired
  collhappened = true;
  fireHappened = true;
}


//collision detect pinball and walls
function closestPointPbW (b1, w1){
  //refactor this math if needed for collision detection and response
  let ballToWallStart = w1.start.subtr(pinball1.pos);
  if(Vector.dot(w1.wallUnit(), ballToWallStart) > 0){
    return w1.start;
  } 
  let wallEndToBall = b1.pos.subtr(w1.end);
  if (Vector.dot(w1.wallUnit(), wallEndToBall) > 0){
    return w1.end;
  }
  let closestDist = Vector.dot(w1.wallUnit(), ballToWallStart);
  let closestVect = w1.wallUnit().mult(closestDist);
  return w1.start.subtr(closestVect);

}
function coll_det_PbW (b1, w1){
  //working but could be refactored, perhaps unnecessary
  let ballToClosest = closestPointPbW(b1, w1).subtr(b1.pos);
  if (ballToClosest.mag() <= b1.r){
    return true;
  }
}
//pen resolution between pinball and walls 
function pen_res_PbW (b1, w1){
//come back to this mathematics after you have refactored pinball physics and update ##### 
  let penVect = b1.pos.subtr(closestPointPbW(b1, w1));
  b1.pos = b1.pos.add(penVect.unit().mult(b1.r-penVect.mag()));

}
//collision resolution algorithm between pinball and walls with restitution slight decrease in energy
const restitution = 0.9;
// const eWalls = 5;
function coll_res_PbW (b1, w1){
  let closestPoint = closestPointPbW(b1,w1);
  // console.log(closestPoint);
  let ballToClosest2 = closestPointPbW(b1, w1).subtr(b1.pos);
  if(b1.pos.x > closestPoint.x){
    b1.vx = (Math.abs(b1.vx) + w1.ex) * restitution;
    b1.pos.x = closestPoint.x + b1.r;
  } else if (b1.pos.x < closestPoint.x){
    b1.vx= -(Math.abs(b1.vx) + w1.ex) * restitution;
    b1.pos.x = closestPoint.x -b1.r;
  }

  if(b1.pos.y < closestPoint.y){
    b1.vy = -(Math.abs(b1.vy) + w1.ey) * restitution;
    b1.pos.y = closestPoint.y - b1.r;
  } else if (b1.pos.y > closestPoint.y){
    b1.vy = (Math.abs(b1.vy) + w1.ey) * restitution;
    b1.pos.y = closestPoint.y + b1.r;
  }
  }

//collision detection pinball and flippers
function pinballFlippersColliding(){
  FlArr.forEach(flipper => {

    let distx = Math.abs(pinball1.pos.x - flipper.center.x);
    let disty = Math.abs(pinball1.pos.y - flipper.center.y);
    //sides check
    if (distx > (flipper.width/2 + pinball1.r)) { return false; }
    if (disty > (flipper.height/2 + pinball1.r)) { return false; }
  
    if (distx <= (flipper.width/2)) { return true; } 
    if (disty <= (flipper.height/2)) { return true; }
    //pythag theorem for corner
    let dx=distx-flipper.width/2;
    let dy=disty-flipper.height/2;
    return (dx**2+dy**2<=(pinball1.r**2));
  })
}

//pen resolution between pinball and flippers
//collision resolution betweeen pinball and flippers
function coll_res_FlPb(){
     
    //collision vector of impact flipper and pinball
    let vecCollision = new Vector (pinball1.pos.x-flipper.center.x, pinball1.pos.y-flipper.center.y);
    // console.log(vecCollision);
    //distance of collision vector (magnitude):
    let distance = vecCollision.mag();
    // console.log('distance of col vec ' + distance);
    //normalized collision vector or unit vector(collsion vector with mag 1)
    let vecCollisionNorm = vecCollision.unit();
    let vRelativeVelocity = pinball1.vel.subtr(firePin1.vel);
    let speed = vRelativeVelocity.x * vecCollisionNorm.x + vRelativeVelocity.y * vecCollisionNorm.y;
    // if (speed<0) {
    //   break;
    // } 
      //collision velocity
      // console.log(speed);
      let vecCollisionVel = vecCollisionNorm.mult(speed);
      console.log(vecCollisionVel);
      pinball1.vx -= vecCollisionVel.x;
      pinball1.vy -= 100;
}

//collision detection pinball and dead space
function coll_det_PbDS() {
  let distx = Math.abs(pinball1.pos.x - daGutter.center.x);
  let disty = Math.abs(pinball1.pos.y - daGutter.center.y);
  //sides check
  if (distx > (daGutter.width/2 + pinball1.r)) { return false; }
  if (disty > (daGutter.height/2 + pinball1.r)) { return false; }

  if (distx <= (daGutter.width/2)) { return true; } 
  if (disty <= (daGutter.height/2)) { return true; }
  
  //pythag theorem for corner
  let dx=distx-daGutter.width/2;
  let dy=disty-daGutter.height/2;
  return (dx**2+dy**2<=(pinball1.r**2));
}
//collision resolution between pinball and dead space 
  //change color of dead space
  //change game logic of game 
function coll_res_deadSpace(){
  daGutter.color = colorGO;
  ctx.fillStyle = 'red'
  ctx.font = '60px serif'
  ctx.fillText("ROUND OVER", 100, 255);
}
/*Game Mechanics */
//Lives feature and reset
//function end game loop
//score system


// main game loop canvas loop and redraw
// setInterval(function(){

  
  function gameLoop(timeStamp) {

  //calc for seconds 
  // secondsPassed = Math.min(secondsPassed, 0.1);
 let secondsPassed = (timeStamp-oldTimeStamp)/1000;
  oldTimeStamp = timeStamp;
  
  pinball1.update(secondsPassed);
  firePin1.update(secondsPassed);
  
  if(pinball1.pos.y + pinball1.r <= 120 && !pinballHeightPass){
    turnOnGrav = true;
    let wallLaneGate = new Wall(500, 175, game.clientWidth, 100, 45, 5);
  }
  //ceiling failsafe
  // if(pinball1.pos.y - pinball1.r <= 0){
  //   pinball1.pos.y=pinball1.r;
  //   pinball1.vy = 1;
  //   pinball1.vx = -10;
  // }

  //calc frames per second
  fps = Math.round(1 / secondsPassed);
  
  ctx.clearRect(0, 0, game.width, game.height);
  //Initial lane
  ctx.fillStyle = 'brown';
  ctx.fillRect(500, 175, 15, 435);
  
  //the dead space
  daGutter.drawDS();
  
  //pinball
  pinball1.drawPinball();
  
//new flippers to be written 

  //firing pin
  firePin1.drawFiringPin();


  //conditional for firepin coll detection and response
  if(pinballFirepinColliding()){
    ctx.fillText("Collision", 200, 200);
    console.log('collision'); 
    pen_res_fp();
    // console.log(pinball1.vy);
    // if(!fireHappened){
      collision_response_fp();
      // pinball1.update();
      console.log(pinball1.pos);
    }
    if (coll_det_PbW){
      // console.log(pinballHeightPass)
      // console.log(pinball.pos.y+pinball.r);
    }
    //wall iteration draw and coll detection and response
    wallsArr.forEach((w) =>{
      if(coll_det_PbW(pinball1, w)){
        ctx.fillText("Collision", 300, 300);

        // pen_res_PbW(pinball1, w);
        coll_res_PbW(pinball1, w);
        // pinball1.reposition();
      }
      })
  wallsArr.forEach((w)=>{
    w.drawWall();
  })
  //top canvas
  let edge1 = new Wall(0, 0, game.clientWidth, 0, 2, 5);
  //right wall canvas
  let edge2 = new Wall(game.clientWidth, 0, game.clientWidth, game.clientHeight, 5, 2);
  //bottom canvas
  let edge3 = new Wall(game.clientWidth, game.clientHeight, 0, game.clientHeight, 2, 5);
  //left wall canvas
  let edge4 = new Wall(0, game.clientHeight, 0, 0, 5, 2);
  // late gate›
  let wallInitLaneAng = new Wall(570, 60, 490, 0, 45, 5);
  //lane right wall
  let wallLaneRight = new Wall (499, 175, 499, 610, 5, 5);
  flipWallArr.forEach((f) =>{
    if(coll_det_PbW(pinball1, f)){
      ctx.fillText("Collision", 300, 300);

      // pen_res_PbW(pinball1, w);
      coll_res_PbW(pinball1, f);
      // pinball1.reposition();
    }
})
flipWallArr.forEach((f)=>{
  f.drawFlipWall();
})

  
  //fliper lanes 4 lines or 8 lines that establish lanes that guide the pinball perhaps another constructor and array with different collision detection? for now keep as is. 
  //draw little squares as score / multiplier collision detection checks that are in the lane 
    //pinball radius is 15
    //until its own class and array is built use high y values in order to send the pinball down lol, might have to add another this value in the wall class and refactor collision response equations so there is a value that can be negative or positive 1 so i can force and negative .vy value for the pinball for these lanes.
  //most left
  let flipperLane1;
  //left-right
  let flipperLane2;
  //right-left
  let flipperLane3;
  //most right
  let flipperLane4;

  
  //col detec and resolution for deadspace and pinball
  if(coll_det_PbDS()){
    coll_res_deadSpace();
    //check for lives and resetGame()
  }
  
  requestAnimationFrame(gameLoop);
}
// }, 1000/5);
console.log(pinball1.pos);

requestAnimationFrame(gameLoop);

/* Stretch Goals and Further implementation */
//In order of importance and desire to get to post MVP
// Create a scoring system and bonus conditions
// add circular bumpers
// add visual elements / sprites

// add music 

// add lanes with words
// add targets

// add multiball 
// second level