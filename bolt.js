var h = 1080;
var w = 1920;
var ang = 0;
sweight=80;


var pool = [];

var setup = function(){
  colorMode(HSB, 360,1,1)
  frameRate(30);
  createCanvas(w,h);
  angleMode(DEGREES);

  for(var i=-1000; i<h+500; i+=150){
  var p = new Shape(0, i);
  pool.push(p);
  }


  $('body').css('background','black');
}

var bval = 250;
var draw = function(){
  background(bval,0.8,1);
  bval %=360;
  for(var i=0;i<pool.length; i++){
    var p = pool[i];
    p.update();
    p.render();
  }


  if(mouseIsPressed){
   ang = map(mouseY,0,h,0,1);
  }

  saveVid('bolt');
}


mouseClicked = function(){
    var p = new Shape(0, mouseY);
    console.log(bval);
  }

function Shape(x,y){
  this.x = x;
  this.y = y;
  this.radius = 40;
  this.linepoints = [];
  this.res = 150;
  this.max =150;
  this.start = frameCount;
  this.direction = -1;
  this.offset=0;
  for(var i=0; i<w+500; i+=2*this.res){
    this.linepoints.push(0);
    this.linepoints.push(this.max);
  }

  this.update = function(){
    this.offset +=(50/10.0);
    this.offset%=2*this.res;

    for(var i=1;i<this.linepoints.length; i+=2){
    //    this.linepoints[i]+=(this.direction*5);

    }
    if(this.linepoints[1]<-1*this.max){

      for(var i=1;i<this.linepoints.length; i+=2){
        this.linepoints[i]=150;
      }

      this.offset =0;
    }
//    if(this.linepoints[1]>this.max){this.direction*=-1}
  }

  this.render = function(){
    push();
    translate(0,h/2+3*this.y/4);
    stroke(100,1,1);
    strokeWeight(sweight);
    strokeWeight(20+60*(1+sin(5*frameCount)));
    noFill();
    beginShape();
    for(var i=0;i<this.linepoints.length-1; i++){
      rotate(ang+ this.y/500);
      var l1 = this.linepoints[i];
      var l2 = this.linepoints[i+1];

     // line(i*this.res,l1,(i+1)*this.res, l2);
       vertex(-500+this.offset+i*this.res,l1)
       vertex(-500+this.offset+(i+1)*this.res, l2);
    }


    endShape();

    pop();
  }
}
