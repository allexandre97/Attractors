// Constants and variables to define canvas size
let WIDTH  = 1280;
let HEIGHT = 720

if (HEIGHT % 2 != 0){
  HEIGHT++;
}

let CANVAS;

// Camera
let CAMERA;

// Constants and variables defining the space in which particles move
const L = 2;

// Constants and variables for the particles in the system
const NPARTICLES = 1000;
let    PARTICLES = []
let       SYSTEM;

const DT = 0.075 // Integration timestep

let vertical_disp = 690/2;

let OPTIONS;

function setup() {

  CANVAS = createCanvas(WIDTH, HEIGHT, WEBGL);
  setAttributes('antialias', true);

  OPTIONS = new Options(vertical_disp, "THOMAS");

  // Populate particles array
  for (let i = 0; i < NPARTICLES; i++){
    PARTICLES[i] = new Particle(random(-L, L), random(-L, L), random(-L, L),
                                random(-0.01, 0.01), random(-0.01, 0.01), random(-0.01, 0.01),
                                0, DT);
  }

  SYSTEM = new Attractor(PARTICLES, DT, "THOMAS");

  CAMERA = createEasyCam(this._renderer, {distance: 20, center: [0, 0, 0]});
  perspective(120, WIDTH/HEIGHT, 0.1, 500);
  CAMERA.setDistanceMin(1);
  CAMERA.setDistanceMax(50);
  
  // noLoop();

}


let attr;
let params;
function draw() {

  background("#1b1b1b");
  attr   = OPTIONS.currentAttractor;
  params = OPTIONS.getParameters(); 
  console.log(PARTICLES[0]);
  SYSTEM.type = attr;
  SYSTEM.UpdateParticles(params);

  for (const part of PARTICLES){
    part.display();
  }
  console.log(PARTICLES[0]);

}
