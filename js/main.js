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
let friction = 0.05;
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
const pbmass = 1;

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
  if (keyPresses.KeyF === true && firePin1.y < 465) {
    // console.log('anything');
    // firePin1.acceleration = 1;
    // firePin1.acc.y = firePin1.acceleration;
    firePin1.y +=movementFP;
    console.log(firePin1.y);
    // console.log(firePin1.start, firePin1.end);
  } 
}
let resetFiringPin = () => {
  firePin1.y = pinY;
  fpin.y = pinY;
}
function movementFiringPinRelease() {
  if (keyPresses.KeyF === false && firePin1.y > 410) {
    console.log(`key is up`);
    // firePin1.acceleration = 1
    // firePin1.acc.y = -firePin1.acceleration;
    firePin1.y += movementFPpow;
    console.log(fpin);
    console.log(fpPos);
    // console.log(firePin1.start, firePin1.end);
    console.log(firePin1.y);
    setTimeout(resetFiringPin, 1000);
  } 
}
let movementFlipper = () => {
  if(keyPresses.KeyZ === true && flipperA.degrees > -50){
    flipperA.degrees -= flipPressMovement
    console.log(flipperA.degrees);
    }
  if(keyPresses.Slash === true && flipperB.degrees < 50){
    flipperB.degrees += flipPressMovement
    console.log(flipperB.degrees);
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
//gravity vector!

const gravity = new Vector(0, 9.81);

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
    this.r = this.center.y-this.y
    this.vel = new Vector (0,0);
    this.acc = gravity;
    this.acceleration = 50;
    // //position of centerpoint of top of box
    // this.pos = new Vector(x + width/2, y)
  }
  drawFiringPin = (x, y, width, height, color) =>{
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  
  reposition(){
    this.acc = this.acc.unit().mult(this.acceleration);
    this.vel = this.vel.add(this.acc);
    this.vel = this.vel.mult(1-friction);
    this.center = this.center.add(this.vel);
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
  constructor (x,y,r,color, m){
    this.x = x
    this.y = y
    this.pos = new Vector(x,y);
    this.r = r 
    this.m = m
    if (this.m === 0){
      this.inv_m = 0;
    } else {
      this.inv_m = 1 / this.m;
    }
    this.elasticity = 30;
    this.color = color
    this.vel = new Vector(0,0);
    this.acc = new Vector (0,0);
    this.speed = new Vector (0,0);
    this.gravity = 0.05;
    this.gravitySpeed = 0;
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
  
  
  newPos = () => {
    this.gravitySpeed += this.gravity;
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y +this.gravitySpeed;
    this.hitsBottom();
  }
  
  //display the acceleration and velocity vectors of the ball
  // display() {
  //   this.vel.drawVec(this.x, this.y, 10, 'green');
  //   this.acc.drawVec(this.x, this.y, 100, 'red');
  // }
  

}
let pinball1 = new pinBall (ballX, ballY, radius, ballColor, pbmass);

//wall class, segment btwn two different points
// i hope the push method for this works and that the physics response works
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
//Collision detection fucntion between the pinball and firing pin
//Attempt to store values in objects 
//Collision detection pinball and firing pin
let pball = {x: pinball1.x, y: pinball1.y, r: pinball1.r};
let fpin = {x: firePin1.x, y: firePin1.y, w: firePin1.width, h: firePin1.height}
// console.log(pball, fpin);
// console.log(pinball1.x, firePin1.x)
function pinballFirepinColliding(){
  let distx = Math.abs(pinball1.pos.x - (firePin1.x+firePin1.width/2));
  let disty = Math.abs(pinball1.pos.y - (firePin1.y+firePin1.height/2));

  if (distx > (firePin1.width/2 + pinball1.r)) { return false; }
  if (disty > (firePin1.height/2 + pinball1.r)) { return false; }

  if (distx <= (firePin1.width/2)) { return true; } 
  if (disty <= (firePin1.height/2)) { return true; }

  let dx=distx-firePin1.width/2;
  let dy=disty-firePin1.height/2;
  return (dx**2+dy**2<=(pball.r**2));
}
  console.log(pinballFirepinColliding());
  let fpPos = new Vector(firePin1.center.x, firePin1.center.y);
  let pballPosfp = new Vector(pball.x, pball.y);
  let dist = pballPosfp.subtr(fpPos); 
  // console.log(dist);
  // console.log(fpPos);
  
  // let dist = pballPosfp.subtr(fpPos);
  console.log(dist);
  // penetration resolution between pinball and firing pin
function pen_res_fp(){
  let dist = pinball1.pos.subtr(firePin1.center);
  let pen_depth = pinball1.r + firePin1.r - dist.mag();
  console.log('firepin r' + firePin1.r)
  console.log(pen_depth);
  let pen_depth_div2 = pen_depth/2;
  let pen_res = dist.unit().mult(pen_depth_div2);
  console.log('pen res ' + pen_res);
  pinball1.pos = pinball1.pos.subtr(pen_res);

};
let fireHappened = false;
function collision_response_fp(pinBall, firingPin){
  //collision normal vec
  // let normal = pinball1.pos.subtr(firePin1.center);
  // // relative velocity
  // let relVel = pinball1.vel.subtr(firePin1.vel);
  // //separating veloicity
  // let sepVel = Vector.dot(relVel, normal);
  // //projection vallue multi -1
  // let new_sepVel = -sepVel;
  // let sepVelVec = normal.mult(new_sepVel);
  let changeVec = new Vector (0, -375);

  pinball1.vel = pinball1.vel.add(changeVec);
  collhappened = true;
  fireHappened = true;
  // pinballGrav();
}
console.log(pinball1.acc);
// collision resolution between pinball and firing pin

//collision detect pinball and walls
function closestPointPbW (b1, w1){
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
  let ballToClosest = closestPointPbW(b1, w1).subtr(b1.pos);
  if (ballToClosest.mag() <= b1.r){
    return true;
  }
}
//pen resolution between pinball and walls 
function pen_res_PbW (b1, w1){
  let penVect = b1.pos.subtr(closestPointPbW(b1, w1));
  b1.pos = b1.pos.add(penVect.unit().mult(b1.r-penVect.mag()));

}
//collision resolution between pinball and walls
function coll_res_PbW (b1, w1){
  let normal = b1.pos.subtr(closestPointPbW(b1,w1)).unit();
  let sepVel = Vector.dot(b1.vel, normal);
  let new_sepVel = -sepVel * b1.elasticity;
  let vsep_diff = sepVel - new_sepVel;
  b1.vel = b1.vel.add(normal.mult(-vsep_diff));
  console.log("add pb vel " + normal.mult(-vsep_diff));
  // b1.reposition;
}
//collision detection pinball and flippers
//pen resolution between pinball and flippers
//collision resolution betweeen pinball and flippers

//collision detection pinball and dead space
//pen resolution between pinball and dead space
//collision resolution between pinball and dead space 
//function end game loop

//##### working but must figure out how to stop it from fully rotating when key is held down

// main game loop canvas loop and redraw
let collhappened = false;
// setInterval(function(){
function gameLoop(timestamp) {
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
  //
  wallsArr.forEach((w) =>{
    if(coll_det_PbW(pinball1, w)){
      pen_res_PbW(pinball1, w);
      coll_res_PbW(pinball1, w);
      // pinball1.reposition();
    }
    })
  
  if(pinballFirepinColliding()){
    ctx.fillText("Collision", 200, 200);
    console.log('collision'); 
    pen_res_fp();
    if(!fireHappened){
    collision_response_fp();
    }
    // firePin1.reposition();
    pinball1.reposition();
    
    // pinballGrav();
    // pinball1.reposition();
  }
  // if(collhappened){
  //   // pinball1.hitsBottom();
  //   // pinball1.hitsTop();
  //   pinball1.newPos();
  // }
  wallsArr.forEach((w)=>{
    w.drawWall();
  })
  let edge1 = new Wall(0, 0, game.clientWidth, 0);
  let edge2 = new Wall(game.clientWidth, 0, game.clientWidth, game.clientHeight);
  let edge3 = new Wall(game.clientWidth, game.clientHeight, 0, game.clientHeight);
  let edge4 = new Wall(0, game.clientHeight, 0, 0);
  let WallInitLaneAng = new Wall(570, 60, 490, 0);
  // pinballGrav();
  // function gravityPb (){
    // //  pinball1.vel += gravity;
    //   // console.log(pinball1.vel);
    //   // pinball1.acc = pinball1.acc.add(gravity);
    //   console.log(pinball1.acc);
    
    //   console.log(gravity);
    // }
    // setInterval(gravityPb, 1000);
    
    requestAnimationFrame(gameLoop);
  }
  // }, 1000/5);
  // pinballGrav = () =>{
    //   if ((pinball1.pos.y + pinball1.r) < 590){
      //     pinball1.pos.y += 9.81;
      
      //   }
      //   console.log("pinball vel vector", pinball1.vel);
      // };
      // pinballGrav();
      //   pingravTimeout = () =>{
        //     // setInterval(pinballGrav(), 1000);
        //     pinballGrav();
        //   }
        //  setTimeout(pingravTimeout, 1000/60);
        
        
        requestAnimationFrame(gameLoop);
        // pinballGrav = () =>{
        //   if(collhappened && pinball1.edge <= 600){
        //     pinball1.pos.y += 9.81
        //   // pinball1.vel = pinball1.vel.add(gravity);
        //   // pinball1.reposition();
        //   console.log(pinball1.vel, pinball1.pos);
        //   }
        // }
          //   if ((pinball1.pos.y+pinball1.r) < 610){
            //     pinball1.vel.add(gravity);
            //   }
            //   console.log("pinball acceleration vector", pinball1.acc);
            // };
            
            //STRETCH GOALS AND FURTHER IMPLEMENTATION
            
            // add lanes with words
            
            // Create a scoring system and bonus conditions
            
            // add circular bumpers
            
            // add targets
            
            // add multiball 
            
            // add music 
            
            // add visual elements
            
            // second level
            