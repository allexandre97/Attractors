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

        this.colors = ['royalblue', 'olive', 'firebrick'];

        this.palette  = this.colors.map(c => c.toString());
        this.gradient = chroma.scale(this.palette).mode('lab');

        
        
    }

    hsv2rgb(h,s,v){                              
    let f = (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
    return [f(5)*255,f(3)*255,f(1)*255];       
    }

    MapColor(value, min, max){

        let mixture  = map(value, min, max, 0, 1);
        // console.log(gradient(mixture));

        return this.gradient(mixture).hex();

    }

    V3D(){
        return Math.sqrt(this.u*this.u + this.v*this.v + this.w*this.w);
    }

    update(p, s){

        this.color = this.MapColor(this.V3D(), 0.1, 3.0);
        this.time += this.h;

    }

    display(){

        push();
        translate(this.x, this.y, this.z);
        ambientLight(255);
        ambientMaterial(this.color);
        noStroke();
        sphere(this.radius, 6, 6);
        pop();

    }

}