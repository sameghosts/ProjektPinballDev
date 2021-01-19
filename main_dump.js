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
let FlArr = [];

/* FIX THE FLIPPER### MOVEMENT_Handler ###$$$*/
//mvmt handlers for the flippers
let movementFlipper = () => {
  if(keyPresses.KeyZ === true && flipperA.degrees > -50){
    flipperA.degrees -= flipPressMovement
    // console.log(flipperA.degrees);
    // console.log(pinball1.pos);
    console.log(flipperA.center)
    }
  if(keyPresses.Slash === true && flipperB.degrees < 50){
    flipperB.degrees += flipPressMovement
    // console.log(flipperB.degrees);
    console.log(flipperB.center)
    }
  }

let movementFlipperDown = () => {
  if(keyPresses.KeyZ === false){
    flipperA.degrees = flipInitAng
    console.log(flipperA.center)
  }
  if(keyPresses.Slash === false){
    flipperB.degrees = -flipInitAng
    console.log(flipperB.center)
  }
}

/Flippers
//Start with rectangles? #### update these into sprites eventually? use the rectangle as hitbox
class flipper {
constructor(x, y, width, height, degrees, color, flipRX, flipRY){
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.degrees = degrees
  this.center = new Vector(this.x+this.width/2, this.y+this.height/2)
  //scalar angular value you can use to change rate of rotation over time ___ vector or
  this.dAX = 0;
  this.dYX = 0;
  this.degAngudelta = new Vector (0,0);
  this.color = color
  this.flipRX = flipRX
  this.flipRY = flipRY
  FlArr.push(this)  
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

//From game loop: 
  // //left flipper
  // flipperA.drawFlipper();
  // //right flipper
  // flipperB.drawFlipper();
// top

//flipB - 35 distance x apart + 140
  //down
  let topDownStartB = new Vector (259, 459);
  let topDownEndB = new Vector (310, 360);
    //up
  let topUpStartB = new Vector (239, 261);
  let topUpEndB = new Vector (290, 360)
  
  
  //bottom
    //down
  let botDownStartB = new Vector (115, 40);
  let botDownEndB = new Vector (214, 479);
    //up
  let botUpStartB = new Vector (135, 380);
  let botUpEndB = new Vector (234, 281);
  
  //side left 
    //down
    let sLDownStartB = new Vector(115, 380);
    let sLDownEndtB = new Vector(135, 360);
    //up
    let sLUpStartB = new Vector(115, 360);
    let sLUpEndB = new Vector(135, 380);
    
    //side right
    //down
    let sRDownStartB = new Vector(214, 479);
    let sRDownEndB = new Vector(234, 459);
    
    //up
    let sRUpStartB = new Vector(214, 261);
    let sRUpEndB = new Vector(234, 281);
  
    