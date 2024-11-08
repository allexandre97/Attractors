class Options {

    constructor(vertical_disp = 690/2, starting_attractor = "THOMAS") {
        this.vertical_disp = vertical_disp;
        this.sliders = {};
        this.currentAttractor = starting_attractor;
        
        // Create attractor selector
        this.attractorSelect = createSelect();
        this.attractorSelect.position(WIDTH * 1.05, this.vertical_disp - 50);
        this.attractorSelect.option('Thomas');
        this.attractorSelect.option('Lorenz');
        this.attractorSelect.option('Langford');
        this.attractorSelect.selected('Thomas');
        this.attractorSelect.changed(() => this.handleAttractorChange());
        
        // Define parameters for each attractor
        this.attractorParams = {
            "THOMAS": {
                speed: { min: 0.001, max: 4, default: 2, step: 0 },
                a: { min: 0.05, max: 0.3, default: 0.20816, step: 0 }
            },
            "LORENZ": {
                speed: { min: 0.001, max: 4, default: 0.1, step: 0 },
                a: { min: 0, max: 30, default: 10, step: 0 },
                b: { min: 0, max: 50, default: 28, step: 0 },
                c: { min: 0, max: 10, default: 8/3, step: 0 }
            },
            "LANGFORD": {
                speed: { min: 0.001, max: 4, default: 1, step: 0 },
                a: { min: 0.001, max: 10, default: 0.95, step: 0 },
                b: { min: 0.001, max: 10, default: 0.70, step: 0 },
                c: { min: 0.001, max: 10, default: 0.60, step: 0 },
                d: { min: 0.001, max: 10, default: 3.50, step: 0 },
                e: { min: 0.001, max: 10, default: 0.25, step: 0 }
            }
        };
        
        // Initialize sliders for default attractor
        this.createSlidersForAttractor(this.currentAttractor);
    }
    
    createSlidersForAttractor(attractorType) {
        // Clear existing sliders
        for (let slider of Object.values(this.sliders)) {
            if (slider.slider) slider.slider.remove();
            if (slider.label) slider.label.remove();
        }
        this.sliders = {};
        
        // Get parameters for selected attractor
        let params = this.attractorParams[attractorType];
        let currentOffset = 0;
        
        // Create new sliders
        for (let [param, config] of Object.entries(params)) {
            let slider = createSlider(config.min, config.max, config.default, config.step);
            slider.position(WIDTH * 1.05, this.vertical_disp + currentOffset);
            
            let label = createDiv(param.charAt(0).toUpperCase() + param.slice(1));
            label.style("color", "white");
            label.position(WIDTH * 1.05, this.vertical_disp + currentOffset + 30);
            
            this.sliders[param] = {
                slider: slider,
                label: label,
                config: config
            };
            
            currentOffset += 80;
        }
    }
    
    handleAttractorChange() {
        // Update current attractor type
        this.currentAttractor = this.attractorSelect.value().toUpperCase();
        
        // Create new sliders for the selected attractor
        this.createSlidersForAttractor(this.currentAttractor);
        
        // Reset the simulation
        this.restartSimulation();
    }
    
    restartSimulation() {
        // Reset particles with random initial conditions
        PARTICLES = [];
        for (let i = 0; i < NPARTICLES; i++) {
            let particle = new Particle(
                random(-L, L), random(-L, L), random(-L, L),
                random(-0.01, 0.01), random(-0.01, 0.01), random(-0.01, 0.01),
                0, DT
            );
            // Set the appropriate color palette for the current attractor
            // particle.updateColorPalette(this.currentAttractor);
            PARTICLES[i] = particle;
        }
        
        // Create new attractor system
        SYSTEM = new Attractor(PARTICLES, DT, this.currentAttractor);
        
        // Reset camera position (optional, depends on your preference)
        CAMERA.setCenter([0, 0, 0]);
        CAMERA.setDistance(20);
        
        // Reset initial parameters to defaults for the new attractor
        let params = this.attractorParams[this.currentAttractor];
        for (let [param, config] of Object.entries(params)) {
            this.sliders[param].slider.value(config.default);
        }
    }
    
    getParameters() {
        let params = {};
        for (let [param, sliderObj] of Object.entries(this.sliders)) {
            params[param] = sliderObj.slider.value();
        }
        return params;
    }
}