var h = 1080;
var w = 1920;

var pool = [];
var gres = 35;
var rot = 10;
var grate = 50;
var t =0;
var tinterval = 1;

var setup = function(){
  colorMode(HSB, 360,1,1)
  frameRate(15);
  createCanvas(w,h);
  angleMode(DEGREES);



  for(var i=-1000; i<h+500; i+=(h/gres)){
  var p = new Shape(0, i);
  pool.push(p);
  }

  bcol = color(53,1,1);
  fcol = color(310,1,1);

  $('body').css('background','black');
}

var draw = function(){


  background(bcol);
  for(var i=0;i<pool.length; i++){
    var p = pool[i];
    p.update();
    p.render();
  }


  if(mouseIsPressed){
      tinterval = map(mouseY,0,h,0,5);

  }
  t+=tinterval;
  saveVid('stars');
}


mouseClicked = function(){
  }


mousePressed = function(){
  var lcol = random(360);
  bcol = color(lcol,1,1);
  fcol = color((53)%360,1,1);
 //   bcol = color(lcol,1,1);
 // fcol = color((lcol+30)%360,1,1);
}

function Shape(x,y){
  this.x = x;
  this.y = y;
  this.radius = 100;
  this.linepoints = [];
  this.res = w/gres * 2;
  this.start = t;
  this.speed = sin(this.y/1.2)*10;
  for(var i=0; i<w+1000; i+=this.res){
    //this.linepoints.push(this.radius*sin(i/1.5));
    this.linepoints.push(0);
  }

  this.update = function(){

    for(var i=0;i<this.linepoints.length; i++){
      //this.linepoints[i]=this.radius*(sin(i*5 + (frameCount-this.start)*this.speed));
    }
  }

  this.render = function(){
    push();
    //translate(0,-100*sin(5*frameCount+(this.y)/10));
    translate(0,(-10*1.5+(this.y)));
    translate(-20,this.y-1500);

    //rotate(rot);

    //rotate(5*sin(5*frameCount+10*(this.y/20)));
    fill(fcol);
    noStroke();

    for(var i=0;i<this.linepoints.length; i++){

        translate(0,25*i);
        this.radius = 10+40*(1+sin(2*t*5+(50+grate)*(this.y)));
        ellipse(this.res*i,this.y,this.radius, this.radius);
    }
    pop();
  }
}
