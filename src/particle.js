class Particle{

    constructor(_x, _y, _z, _u, _v, _w, _t, _h){

        this.x = _x;
        this.y = _y;
        this.z = _z;

        this.u = _u;
        this.v = _v;
        this.w = _w;

        this.time = _t;

        this.h = _h;

        this.radius = random(0.1, 0.15);

        this.hue   = map(this.V3D(), 0, 0.025*L/this.h, 270, 360);
        this.color = this.hsv2rgb(this.hue, 0.85, 0.75);
        
        
    }

    hsv2rgb(h,s,v){                              
    let f = (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
    return [f(5)*255,f(3)*255,f(1)*255];       
    }

    V3D(){
        return Math.sqrt(this.u*this.u + this.v*this.v + this.w*this.w);
    }

    update(p, s){

        // let tmp = Thomas([this.x, this.y, this.z], p, s);
        // //let tmp = Thomas([this.x, this.y, this.z]);

        // this.u = tmp.vx;
        // this.v = tmp.vy;
        // this.w = tmp.vz;
        
        // this.x = tmp.x;
        // this.y = tmp.y;
        // this.z = tmp.z;

        this.hue   = map(this.V3D(), 0, 0.005*L/this.h, 270, 360);
        this.color = this.hsv2rgb(this.hue, 0.85, 0.75);
        this.time += this.h;

    }

    display(){

        push();
        translate(this.x, this.y, this.z);
        ambientLight(255);
        ambientMaterial(...this.color);
        noStroke();
        sphere(this.radius, 6, 6);
        pop();

    }

}