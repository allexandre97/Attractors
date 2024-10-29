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
const L = 20;

// Constants and variables for the particles in the system
const NPARTICLES = 1000;
let    PARTICLES = []
let       SYSTEM;

const DT = 0.075 // Integration timestep

let ThomasParams = {};
let speed_slider;
let mod_slider;

let vertical_disp = 690/2;

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

  CAMERA = createEasyCam(this._renderer, {distance: 20, center: [0, 0, 0]});
  perspective(120, WIDTH/HEIGHT, 0.1, 500);
  CAMERA.setDistanceMin(1);
  CAMERA.setDistanceMax(50);

  speed_slider = createSlider(0.001, 4, 2, 0);
  speed_slider.position(WIDTH * 1.05, vertical_disp);
  let speed_txt = createDiv("Avg. Particle Speed")
  speed_txt.style("color", "white");
  speed_txt.position(WIDTH * 1.05, vertical_disp + 30);

  mod_slider   = createSlider(0.05, 0.3, 0.20816, 0);
  mod_slider.position(WIDTH * 1.05,   vertical_disp + 80);
  let mod_txt = createDiv("Attractor Modifier")
  mod_txt.style("color", "white");
  mod_txt.position(WIDTH * 1.05, vertical_disp + 110);
  

  ThomasParams.speed = speed_slider.value();
  ThomasParams.a     = mod_slider.value();
  
  // noLoop();

}


function draw() {

  background("#1b1b1b");

  SYSTEM.UpdateParticles(ThomasParams);

  for (const part of PARTICLES){
    part.display();
  }

  ThomasParams.speed = speed_slider.value();
  ThomasParams.a     = mod_slider.value();

  console.log(CAMERA.state);

}
