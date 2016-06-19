var h = 1080;
var w = 1920;
var rw = 50;

var pool = [];
var grow = true;

var setup = function(){
  colorMode(HSB, 360,1,1)
  frameRate(30);
  createCanvas(w,h);
  angleMode(DEGREES);

  bcol= color(120,1,1);
  fcol= color(60,1,1);

  $('body').css('background','black');
}

var draw = function(){

  background(bcol);
    var num = 2;

    if(grow){
    for(var i=0; i<num; i++){
      var p = new Shape(-20+random(w+40));
      pool.push(p);
    }
    }



  for(var i=0;i<pool.length; i++){
    var p = pool[i];
    p.update();
    p.render();
  }

  saveVid('line_grow');
}



mouseClicked = function(){
  var c = random(360);
  bcol= color((c+60)%360,1,1);
  fcol= color(53,1,1);
  }

function Shape(x){
  this.x = x;
  this.rem = false;
  this.speed = 2+random(4);

  this.radius = 0;

  this.update = function(){

    this.radius+=this.speed;



    if(this.radius>h+50){
        grow=false;
        this.speed*=-1;
        /*
        var index = pool.indexOf(this);

        if (index > -1) {
            pool.splice(index, 1);
        }
        */

    }


    if(this.radius<0){
        this.speed*=-1;

    }
  }

  this.render = function(){
    push();
    translate(this.x, 0);
    stroke(fcol);
    fill(bcol);
    strokeWeight(20);
    rect(0,0,rw,this.radius);
    pop();
  }
}
