class Attractor {
    
    constructor(particles, delta_t, type = "Thomas") {

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

        // let X = particle.x + this.delta_t * VX;
        // let Y = particle.y + this.delta_t * VY;
        // let Z = particle.z + this.delta_t * VZ;

        // return {x: X,
        //         y: Y,
        //         z: Z,

        //         vx: VX,
        //         vy: VY,
        //         vz: VZ}
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

    UpdateParticles(params){

        if (this.type == "Thomas"){
            for (let particle of this.particles){
                this.Thomas(particle, params);
                particle.update();
            }
        }
        else if (this.type == "Lorenz"){
            for (let particle of this.particles){
                this.Lorenz(particle, params);
                particle.update()
            }
        }

    }

}