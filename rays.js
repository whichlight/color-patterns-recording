var h = 1080;
var w = 1920;
var rotvar = 30;

var pool = [];

var maxdiff = 10;
var diff =maxdiff;


var setup = function(){
  colorMode(HSB, 360,1,1)
  frameRate(30);
  createCanvas(w,h);
  angleMode(DEGREES);

 for(var i=-1000; i<h+1000; i+=150){
  var p = new Shape(0, i);
  pool.push(p);
  }

  $('body').css('background','black');
}

var draw = function(){
  fcol= color(20,1,1);
  bcol = color(150,1,1);
  background(bcol);

  push();
  rotate(-1*diff);
  for(var i=0;i<pool.length; i++){
    var p = pool[i];
    p.update();
    p.render();
  }
  pop();

  push();
  rotate(2+diff);
  for(var i=0;i<pool.length; i++){
    var p = pool[i];
    p.update();
    p.render();
  }
  pop();

  diff+=0.1;


  if(mouseIsPressed){

    rotvar = map(mouseX,0,h,15-10,15+10);
  }

  saveVid('rays');
}


mouseClicked = function(){
    diff = -1;
  }

function Shape(x,y){
  this.x = x;
  this.y = y;
  this.radius = 40;
  this.linepoints = [];
  this.res = 100;
  this.max =100;



  this.update = function(){



  }

  this.render = function(){

    push();
    rotate(this.y/50-rotvar);
    stroke(fcol);
    strokeWeight(60);
    noFill();
    line(this.y,-1000,this.y, w+1000);
    pop();
  }
}
