var h = 1080;
var w = 1920;
var grad = 200;

var pool = [];

var diff = -100;

var setup = function(){
  colorMode(HSB, 360,1,1)
  frameRate(30);
  createCanvas(w,h);
  angleMode(DEGREES);

  var num = 10;



  for(var i=-500; i<w+500; i+=200){
    for(var j=-500; j<h+500; j+=200){
      var p = new Shape(i+50,j+50, random(360));
      pool.push(p);
    }
  }

  translate(750,-350);
  rotate(45);

  $('body').css('background','black');
}

var bw= 0;
var a = 0;
var draw = function(){

  //diff = h/2 - mouseY;

  bcol = color(270,1,1);
  fcol = color(53,1,1);
  background(bcol);



  for(var i=0;i<pool.length; i++){
    var p = pool[i];
    p.update();
    p.render();
  }

  diff +=2;
  if(diff > 0){ diff = -100;}

  function paddy(n, p, c) {
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
  }
  if(mouseIsPressed){
   // saveCanvas('dots'+paddy(frameCount,4)+'.png');
   grad = map(mouseY,0,h,50,300);
  }

  saveVid('dots');
}



mouseClicked = function(){
  }

function Shape(x,y, angle){
  this.x = x;
  this.y = y;
  var d = Math.sqrt(pow((w/2-this.x),2) + pow((h/2-this.y),2));
  this.radius = grad;
  this.thickness = 100;
  this.angle = angle;
  this.angle_speed=map(Math.abs(h/2-this.y),0,h/2,10,0);
  var maxval= this.radius*2 ;
  var minval = this.radius*0.8;
  this.direction = -1;
  this.xoff = random(300);
  if(random()<0.5){this.direction=1}

  this.update = function(){
   // this.radius+=(this.direction*5);

    if(this.radius>maxval || this.radius<minval){
        this.direction*=-1;
    }


    this.angle+=this.angle_speed;

  }

  this.render = function(){
    i=grad;
    push();
    translate(this.x, this.y);
    fill(fcol);
    noStroke();
    strokeWeight(15);
    ellipse(-1*diff,-1*diff,i,i);

    fill(bcol);
    noStroke();
    var offset = map(this.x-w/2,-w/2,w/2,-1*this.radius/4,this.radius/4);
    ellipse(diff,diff,i,i);

    pop();
  }
}
