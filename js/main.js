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

const wallsArr = [];
const pbsArr = [];
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
//Firing Pin Variables
let movementFP = 40;
let movementFPpow = -60;
let pinX = 520;
let pinY = 420;
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
const pbmass = 1;

/* MOVEMENT HANDLERS ALPHABETIZED */

//KEY PRESS MOVEMENT HANDLERS 

let fired = false;
let flipPressMovement = 95;    
//STOP REPEAT
document.addEventListener('keydown', (e) => {
  
  keyPresses[e.code] = true;
  // console.log(keyPresses);
  movementFlipper();
  movementFiringPinBack();
  // movementPinball();
  // movementPinball();
  
  });

document.addEventListener('keyup', (e) => {
  // fired = false;
  keyPresses[e.code] = false;
  // console.log(keyPresses);
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
let movementFlipper = () => {
  if(keyPresses.KeyZ === true && flipperA.degrees > -50){
    flipperA.degrees -= flipPressMovement
    // console.log(flipperA.degrees);
    // console.log(pinball1.pos);
    }
  if(keyPresses.Slash === true && flipperB.degrees < 50){
    flipperB.degrees += flipPressMovement
    // console.log(flipperB.degrees);
    }
  }

let movementFlipperDown = () => {
  if(keyPresses.KeyZ === false){
    flipperA.degrees = flipInitAng
  }
  if(keyPresses.Slash === false){
    flipperB.degrees = -flipInitAng
  }
}

// function movementPinball(e) {
//   if (e.key === 'w') {
//     pinball1.y += 10;
//   }
// }

/* Classes and constructors AlPHABETIZED*/
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
//gravity vector!
const gravity = new Vector (0, 9.81);
// const gravity = new Vector(0, 9.81);

//Dead Space - use a rectangle for now, #### refactor into class for collision detection and game state boolean logic
ctx.fillStyle = 'darkgreen';
ctx.fillRect(0, 500, 500, 112);
ctx.closePath();

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

//Flippers
//Start with rectangles? #### update these into sprites eventually? use the rectangle as hitbox
class flipper {
constructor(x, y, width, height, degrees, color, flipRX, flipRY){
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.degrees = degrees
  this.color = color
  this.flipRX = flipRX
  this.flipRY = flipRY
}
  drawFlipper = (x, y, width, height, degrees, color, flipRX, flipRY) => {
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
let flipperA = new flipper(flipAX, flipAY, flipWidth, flipHeight, flipInitAng, flipColor, flipAXR, flipAYR);

let flipperB = new flipper(flipBX, flipBY, flipWidth, flipHeight, -flipInitAng, flipColor, flipBXR, flipBYR);

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
  constructor (x1, y1, x2, y2){
    this.start = new Vector(x1, y1);
    this.end = new Vector(x2, y2);
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
    pinball1.vy -= 20;
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
function coll_res_PbW (b1, w1){
  let closestPoint = closestPointPbW(b1,w1);
  console.log(closestPoint);
  let ballToClosest = closestPointPbW(b1, w1).subtr(b1.pos);
  if(b1.pos.x > closestPoint.x){
    b1.vx = Math.abs(b1.vx) * restitution;
    b1.pos.x = closestPoint.x + b1.r;
  } else if (b1.pos.x < closestPoint.x){
    b1.vx= -Math.abs(b1.vx) * restitution;
    b1.pos.x = closestPoint.x -b1.r;
  }

  if(b1.pos.y < closestPoint.y){
    b1.vy = Math.abs(b1.vy) * restitution;
    b1.pos.y = closestPoint.y + b1.r;
  } else if (b1.pos.y > closestPoint.y){
    b1.vy = -Math.abs(b1.vy) * restitution;
    b1.pos.y = closestPoint.y + b1.r
  }
  }

  console.log(ballToClosest);
  //come back to this mathematics after you have refactored pinball physics and update ##### 
  // let normal = b1.pos.subtr(closestPointPbW(b1,w1)).unit();
  // let sepVel = Vector.dot(b1.vel, normal);
  // let new_sepVel = -sepVel * b1.elasticity;
  // let vsep_diff = sepVel - new_sepVel;
  // b1.vel = b1.vel.add(normal.mult(-vsep_diff));
  // console.log("add pb vel " + normal.mult(-vsep_diff));
  // b1.reposition;


}
//collision detection pinball and flippers
//pen resolution between pinball and flippers
//collision resolution betweeen pinball and flippers

//collision detection pinball and dead space
//pen resolution between pinball and dead space
//collision resolution between pinball and dead space 

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
  // if (pinball1.pos.y + pinball1.r < 0){
  //   pinball1.pos.y = pinball1.r;
  // }
  pinball1.update(secondsPassed);
  firePin1.update(secondsPassed);
  // if (pinball1.pos.y - pinball1.r <= 0){
  //   pinball1.vy = 0;
  //   pinball1.pos.y = pinball1.r;
  // }
  if(pinball1.pos.y + pinball1.r <= 120 && !pinballHeightPass){
    turnOnGrav = true;
    let wallLaneGate = new Wall(500, 175, game.clientWidth, 100);
  }
  if(pinball1.pos.y - pinball1.r <= 0){
    pinball1.pos.y=pinball1.r;
    pinball1.vy = 1;
    pinball1.vx = -10;
  }

  //calc frames per second
  fps = Math.round(1 / secondsPassed);
  
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
  //pinball1.update();
  // console.log(pinball1.y);
  //left flipper
  flipperA.drawFlipper();
  //right flipper
  flipperB.drawFlipper();
//firing pin
  firePin1.drawFiringPin();
  // firePin1.update();
  // console.log(firePin1.center);
  
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
  let edge1 = new Wall(0, 0, game.clientWidth, 0);
  let edge2 = new Wall(game.clientWidth, 0, game.clientWidth, game.clientHeight);
  let edge3 = new Wall(game.clientWidth, game.clientHeight, 0, game.clientHeight);
  let edge4 = new Wall(0, game.clientHeight, 0, 0);
  let wallInitLaneAng = new Wall(570, 60, 490, 0);
  // console.log(secondsPassed);
  //new attempt moving the update out of the class and into game interveral
  // updatePb1 = (secondsPassed) =>{
    //   pinball1.pos.x += pinball1.vx * secondsPassed;
    //   pinball1.pos.y += pinball1.vx * secondsPassed;
    
    // }
  // updateFp1 = (secondsPassed) => {
    //   firePin1.center.x += firePin1.vx * secondsPassed;
  //   firePin1.center.y += firePin1.vy * secondsPassed;
  // }
  // updatePb1();
  // updateFp1();
  
  
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