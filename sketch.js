// Constants and variables to define canvas size
let PHI    = (1 + Math.sqrt(5.0))/2;
let WIDTH  = 1280;
let HEIGHT = WIDTH/PHI;

if (HEIGHT % 2 != 0){
  HEIGHT++;
}

let CANVAS;

// Camera
let CAMERA;

// Constants and variables defining the space in which particles move
const L = 20;

// Constants and variables for the particles in the system
const NPARTICLES = 1000;
let    PARTICLES = []
let       SYSTEM;

const DT = 0.075 // Integration timestep


function setup() {

  CANVAS = createCanvas(WIDTH, HEIGHT, WEBGL);
  setAttributes('antialias', true);

  // Populate particles array
  for (let i = 0; i < NPARTICLES; i++){
    PARTICLES[i] = new Particle(random(-L, L), random(-L, L), random(-L, L),
                                random(-0.01, 0.01), random(-0.01, 0.01), random(-0.01, 0.01),
                                0, DT);
  }

  SYSTEM = new Attractor(PARTICLES, DT, "Thomas");

  CAMERA = createEasyCam(this._renderer, {distance: 100, center: [0, 0, 0]});
  perspective(120, WIDTH/HEIGHT, 0.1, 500);
  CAMERA.setDistanceMin(0.1);
  CAMERA.setDistanceMax(500);
  
  // noLoop();

}

function draw() {

  background(220);

  SYSTEM.UpdateParticles({speed: 2, a: 0.20816});

  for (const part of PARTICLES){
    part.display();
  }

}
