//Particle type
//0 = OIL
//1 = WATER

class Particle {
    constructor(pos, texture, density){
        this.type = pos.type;

        this.sprite = new PIXI.Sprite(texture);
        this.sprite.scale.set(0.5 / density);
        this.sprite.anchor.set(0.5);
        if(this.type == 0){
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
        this.radius = 10 / density;

        
        
    }

    draw(){
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
        
}