const OIL = 0;
const WATER = 1;
const PARTICLE_RADIUS = 10 / BOWL_SIZE;

class Particle {
    constructor(pos, texture){
        this.type = pos.type;

        this.sprite = new PIXI.Sprite(texture);
        this.sprite.scale.set(0.5 / BOWL_SIZE);
        this.sprite.anchor.set(0.5);
        if(this.type == OIL){
            this.sprite.tint = 0xFF0000;
        }else{
            this.sprite.tint = 0x0000FF;
        }

        this.savedX = pos.x;
        this.savedY = pos.y;
        this.x = pos.x;
        this.y = pos.y;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.vx = 0;
        this.vy = 0;
        this.radius = PARTICLE_RADIUS;

        
        
    }

    draw(){
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
        
}