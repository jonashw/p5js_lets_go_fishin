var looping = true;
var fishes;


function preload(){
  fishes = ['a','b','c','d','e'].map(color => ({
    open :  loadImage(`assets/fish-${color}-open.png`),
    closed: loadImage(`assets/fish-${color}-closed.png`)
  }));
}

let colors = {};
function setup() { 
  colorMode(HSL,255);
  colors = {
    bg: color(146,241,110),
    primaryA: color(44,255,127),
    primaryB: color(228,255,114),
    secondary: color(145,75,85)
  };
  ringColors = [
    color(145,75,85),
    color(228,255,114),
  ]
  rectMode(CENTER); 
  angleMode(DEGREES);

  //data init

  createCanvas(windowWidth, windowHeight);
  resizeCanvas(windowWidth, windowHeight);
} 

function mouseMoved(){  }
function touchMoved(){  }

function touchStarted(){
  if(touches.length > 0 ){
    let touch = touches[touches.length - 1];
    handlePointAction(touch);
  }
  return false; // This is to prevent pinch-zooming on touch devices.
}

function mousePressed(){
  handlePointAction(createVector(mouseX,mouseY));
}

function handlePointAction(point){
  console.log('point action', point);
}


function keyPressed(){
  if(key == 'D'){
  }
  if(keyCode == ESCAPE){
    looping = !looping;
    if(looping){
      loop();
    } else {
      noLoop();
    }
  }
}

let layers = (() => {
  let r = 15;
  let q = r;
  let bumpLength = 30;
  return [
    {
      thetas:[0,120,240],
      bumps: [ 90, 270-bumpLength ]
    }
    ,{
      thetas:[60,180,300],
      bumps: [90-bumpLength,270]
    }
    ,{
      thetas:[-r,r,120-r,120+r,240-r,240+r],
      bumps: [90,270-bumpLength]
    }
    ,{
      thetas:[0, 60-q,60+q, 120, 180-q, 180+q, 240, 300-q, 300+q],
      bumps: [45-bumpLength, 180+45-bumpLength]
    }
    ,{
      thetas:[],
      bumps: []
    }
  ].map((l,i) => {
    l.id = i + 1;
    l.isOnBump = theta => {
      //90 < netTheta && netTheta < 180
      return l.bumps && l.bumps.some(b => b <= theta && theta <= b + bumpLength);
    };
    return l;
  });
})().reverse();

let o = 0;
function draw() { 
  o+=0.50;
  let r = Math.min(width,height) / 16;
  let h = 1.7*r;
  var s = r * 2;
  background(colors.bg);

  layers.forEach((layer,layerIndex) => {
    push();
    translate((width)/2, (height)/2);
    let layerR = 2*h*layer.id;
    fill(ringColors[layerIndex % ringColors.length]);
    noStroke();
    strokeWeight(2);
    arc(0, 0, layerR, layerR, 0, 360);
    pop();

    push();
    translate((width - s)/2, (height - s)/2);
    layer.thetas.forEach((theta,thetaIndex) => {
      push();
      noStroke();
      fill(colors.secondary);
      rotate(theta + o);
      let fish = fishes[(thetaIndex) % fishes.length];
      let netTheta = (theta + o) % 360;
      let img = layer.isOnBump(netTheta)
        ? fish.open
        : fish.closed;
      translate(0,-h*layer.id);
      rotate(-(theta + o));
      ellipse(s/2, 7*s/12, 5*s/4)
      image(img, 0, 0, s, s);
      //ellipse(000, 000, s);
      pop();
    })
    pop();
  });
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}