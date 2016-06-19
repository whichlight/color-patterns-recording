var h = 1080;
var w = 1920;
var gres = 100;
var grange;
var gdim;
var t=0;
var tinterval=10;

var pool = [];
var fixed_vals = [1,2,4,8,16,32,64,128,256];


var setup = function(){
  colorMode(HSB, 360,1,1)
  frameRate(20);
  createCanvas(w, h);
  grange = 40;
  gdim = floor(w/grange);
  angleMode(DEGREES);
  initKelp();

  //disable default touch events for mobile
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", pdefault, false);
  el.addEventListener("touchend", pdefault, false);
  el.addEventListener("touchcancel", pdefault, false);
  el.addEventListener("touchleave", pdefault, false);
  el.addEventListener("touchmove", pdefault, false);

  bcol = color(53,1,1);
  fcol = color(180,1,1);

  $('body').css('background','black');
}


function pdefault(e){
  e.preventDefault()
}

var initKelp = function(){
  pool = [];
  num = floor(w/grange);
  interval = w/num;
  gres = interval;

  for(var i=0; i<w/gres; i+=1){
    for(var j=0; j<h/gres; j+=1){
      var p = new Shape(i,j, random(360));
      pool.push(p);
    }
  }
  clicked(7*w/8,28*h/30);
}


var redrawKelp= function(interval){
  gres = interval;
  var ydim = pool.length/gdim;
  for(var i=0; i<w/gres; i+=1){
    for(var j=0; j<h/gres; j+=1){
      var index = i*ydim+j;
      var p = pool[index];
      p.x = i*gres;
      p.y = j*gres;
      p.radius = gres/2;
    }
  }
}


var mousePressed = function(){

  var lcol = random(360);
  fcol = color((lcol-150+360)%360,1,1);

  clicked(touchX,touchY);

}

var clicked = function(mx,my){

  mx%=w;
  var possible_states= fixed_vals.filter(function(val){
    return val <= (w/grange);
  });

  index = floor(map(mx,0,w,0,possible_states.length));
  num = possible_states[index];

  interval = w/num;
  tinterval = map(my,h,0,1,70);
  redrawKelp(interval);
}

var touchStarted= function(){
  clicked(touchX,touchY);
}

var touchMoved= function(){
  clicked(touchX,touchY);
}

var touchEnded= function(){
  //clicked(touchX,touchY);
}

var draw = function(){


  background(bcol);

  var ydim = pool.length/gdim;
  for(var i=0; i<w/gres; i+=1){
    for(var j=0; j<h/gres; j+=1){
      var index = i*ydim+j;
      var p = pool[index];
      p.render();
    }
  }
  t+=tinterval;

  saveVid('kelp');
}

function Shape(i,j, angle){
  this.i = i;
  this.j = j;
  this.x = i*gres;
  this.y = j*gres;
  this.radius = gres/2;
  this.par =random(360);

  this.render = function(){
    i=this.radius*(1+cos(t+((this.x+this.y+1)/100)+this.par));
    push();
    translate(this.x, this.y);
    fill(fcol);
    noStroke();
    rect(0,i,this.radius*2,i);
    pop();
  }
}
