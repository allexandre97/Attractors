// Constants and variables to define canvas size
let PHI    = (1 + Math.sqrt(5.0))/2;
let WIDTH  = 1280;
let HEIGHT = WIDTH/PHI;

if (HEIGHT % 2 != 0){
  HEIGHT++;
}

let CANVAS;

// Constants and variables defining the space in which particles move
const L = 20;

// Constants and variables for the particles in the system
const NPARTICLES = 1000;
let    PARTICLES = []

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

}

function draw() {
  background(220);
}
