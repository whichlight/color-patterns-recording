var h = 1080;
var w = 1920;

var pool = [];

var setup = function(){
  colorMode(HSB, 360,1,1)
  frameRate(30);
  createCanvas(w,h);
  angleMode(DEGREES)


  /*
  var num = 100;
  for(var i=0; i<num; i++){
    makeShape(random(w),random(h));
  }
  */

  $('body').css('background','black');
}

var bw= 0;
var a = 90;
var draw = function(){

  background(30,1,1);


  if(frameCount%50==0){
    a+=1;

   if(bw==0){
   makeShape(w/2,3*h/4, a, bw);
   }else{

   makeShape(w/2,3*h/4, a, bw);

   }
   bw++;
   bw%=2;
  }

  for(var i=0;i<pool.length; i++){
    var p = pool[i];
    p.update();
    p.render();
  }

  saveVid('triangle');
}


var makeShape = function(x,y, angle,col){
    var p = new Shape(w/2, h/2, angle, col);
    pool.push(p);
}



function Shape(x,y, angle, col){
  this.x = x;
  this.y = y;
  this.radius = 0;
  this.thickness = 100;
  this.angle = angle;
  this.col = col;

  this.update = function(){
    this.radius+=1;
    if(this.radius>1.5*w){
      var index = pool.indexOf(this);
      if (index > -1) {
        pool.splice(index, 1);
      }
    }
  }

  this.render = function(){
    i=this.radius;
    push();
    translate(this.x, this.y*(3/4));
    rotate(this.angle);
    if(this.col!=0){

    fill(180,1,0.8);
    }else{

    fill(60,1,1);
    }
    noStroke();
    beginShape();


    vertex(i*cos(120), i*sin(120));
    vertex(i,0);
    vertex(i*cos(240), i*sin(240));
    endShape(CLOSE);


    pop();
  }
}

function paddy(n, p, c) {
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
}
