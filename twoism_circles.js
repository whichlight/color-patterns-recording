var h = 1080;
var w = 1920;
var sweight = 50;


var pool = [];

var setup = function(){
  colorMode(HSB, 360,1,1)
  frameRate(30);
  createCanvas(w,h);

  makeShape(0,h/2);
  makeShape(w,h/2);

  $('body').css('background','black');
}

var draw = function(){
  background(10,1,1);
  for(var i=0;i<pool.length; i++){
    var p = pool[i];
    p.update();
    p.render();
  }

  if(mouseIsPressed){
  sweight = map(mouseY,0,h,10,200);
  sweight = max(40,sweight);
  }

  saveVid('twoism_circles');
}



var makeShape = function(x,y){
    var p = new Shape(x, y);
    pool.push(p);
}

mouseDragged = function(){
  //  pool.push(p);

  }


function Shape(x,y){
  this.x = x;
  this.y = y;
  this.radius = 0;

  this.update = function(){
    this.radius+=5;

  }

  this.render = function(){
    push();
    translate(this.x, this.y);

      noStroke();
      fill(150,1,1);
      ellipse(0,0,150, 150);

    for(var i = this.radius; i>0; i-=sweight*4){
      if(i<3*w){
      strokeWeight(sweight);
      stroke(150,1,1);
      noFill();
      ellipse(0,0,i, i);
     }
    }
    pop();
  }
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
