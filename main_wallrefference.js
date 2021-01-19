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
let botDownStartA = new Vector (115, 40);
let botDownEndA = new Vector (214, 479);
  //up
let botUpStartA = new Vector (135, 380);
let botUpEndA = new Vector (234, 281);

//side left 
  //down
  let sLDownStartA = new Vector(115, 380);
  let sLDownEndtA = new Vector(135, 360);
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


/*Flipper B */

// top
  //down
  let topDownStartB = new Vector (336, 459);
  let topDownEndB = new Vector (435, 360);
    //up
  let topUpStartB = new Vector (356, 281);
  let topUpEndB = new Vector (455, 360);
  
  //bottom
    //down
  let botDownStartB = new Vector (356, 479);
  let botDownEndB = new Vector (455, 380);
    //up
  let botUpStartB = new Vector (336, 261);
  let botUpEndB = new Vector (435, 380);
  
  //side left 
    //down
    let sLDownStartB = new Vector(336, 459);
    let sLDownEndtB = new Vector(356, 479);
    //up
    let sLUpStartB = new Vector(336, 261);
    let sLUpEndB = new Vector(356, 281);
    
    //side right
    //down
    let sRDownStartB = new Vector(435, 360);
    let sRDownEndB = new Vector(455, 380);
    
    //up
    let sRUpStartB = new Vector(435, 380);
    let sRUpEndB = new Vector(455, 360);
  
    