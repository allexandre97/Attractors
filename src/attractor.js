class Attractor {
    
    constructor(particles, delta_t, type = "THOMAS") {

        this.particles = particles;
        this.delta_t   = delta_t;
        this.type      = type;
        
    }

    ForwardEuler(particle, velocity){

        particle.x += this.delta_t * velocity.x;
        particle.y += this.delta_t * velocity.y;
        particle.z += this.delta_t * velocity.z;

        particle.u = velocity.x;
        particle.v = velocity.y;
        particle.w = velocity.z;

    }

    Thomas(particle, params){

        let a     = params.a;
        let speed = params.speed;

        let VX = speed * (sin(particle.y) - a * particle.x);
        let VY = speed * (sin(particle.z) - a * particle.y);
        let VZ = speed * (sin(particle.x) - a * particle.z);

        this.ForwardEuler(particle, {x: VX, y: VY, z: VZ});

    }

    Lorenz(particle, params){

        let speed = params.speed;
        let a     = params.a;
        let b     = params.b;
        let c     = params.c;

        let VX = speed * (a * (particle.y - particle.x));
        let VY = speed * (particle.x * (b - particle.z) - particle.y);
        let VZ = speed * (particle.x * particle.y - c * particle.z);

        this.ForwardEuler(particle, {x: VX, y: VY, z: VZ});

    }

    Langford(particle, params){

        let speed = params.speed;
        let a     = params.a;
        let b     = params.b;
        let c     = params.c;
        let d     = params.d;
        let e     = params.e;

        let VX = speed * ((particle.z - b) * particle.x - d * particle.y);
        let VY = speed * (d * particle.x + (particle.z - b) * particle.y);
        let VZ = speed * (c + a * particle.z - Math.pow(particle.z, 3)/3.0 - (particle.x*particle.x + particle.y*particle.y)*(1 + particle.z) + 0.1*particle.z*Math.pow(particle.x, 3));

        this.ForwardEuler(particle, {x: VX, y: VY, z: VZ});

    }

    UpdateParticles(params){

        if (this.type == "THOMAS"){
            for (let particle of this.particles){
                this.Thomas(particle, params);
                particle.update();
            }
        }
        else if (this.type == "LORENZ"){
            for (let particle of this.particles){
                this.Lorenz(particle, params);
                particle.update()
            }
        }
        else if (this.type == "LANGFORD"){
            for (let particle of this.particles){
                this.Langford(particle, params);
                particle.update()
            }
        }
    }
}