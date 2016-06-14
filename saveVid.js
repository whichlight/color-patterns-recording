var frames = [];
var output;
var recording=false;
var completed=true;

saveVid = function(name){
  if(frameCount>0 && recording){
    frames.push(copyCanvas(canvas));
    console.log('saved frame: ' + frameCount);
  }
  if(!recording && !completed){
    completed=true;
    var processIndex = 0;
    processed_frames = frames.map(function(frame_canvas){
      console.log('processing frame '+ Math.floor(processIndex/frames.length*100)+"%");
      processIndex++;
      return frame_canvas.toDataURL('image/webp', 1)
    });

    output = Whammy.fromImageArray(processed_frames, 30);
    link = document.createElement('a');
    link.innerHTML = 'download image';
    link.addEventListener('click', function(ev) {
      link.href = window.URL.createObjectURL(output);
      link.download = name + ".webm";
    }, false);
    $(link)[0].click();
    console.log('created vid');
  }
}

var copyCanvas = function(sourceCanvas){
  var outCanvas = document.createElement('canvas');
  outCanvas.width = sourceCanvas.width;
  outCanvas.height = sourceCanvas.height;
  var outCtx= outCanvas.getContext('2d');
  outCtx.drawImage(sourceCanvas, 0, 0);
  return outCanvas;
}

function keyPressed() {
  if (keyCode == 32) {
    if(recording){
      recording=false;
      console.log('recording OFF');
      $('body').css('background','black');
    }

    if(completed && !recording){
      console.log('recording ON');
      frames = [];
      output;
      recording=true;
      completed=false;
      $('body').css('background','white');
    }
  }
  return false; // prevent default
}
