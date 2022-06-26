class Pointer{
    constructor(particles){
        this.x = 0;
        this.y = 0;
        this.radius = 25 / BOWL_SIZE;
        this.active = false;
        this.type = WATER;
        this.particles = particles;

        document.addEventListener('pointermove', this.onPointerMove.bind(this), false);
        document.addEventListener('pointerdown', this.onPointerDown.bind(this) , false);
        document.addEventListener('pointerup', this.onPointerUp.bind(this) , false);
    }

    onPointerMove(e) {
        this.x = e.clientX;
        this.y = e.clientY;
    }

    onPointerDown(e){
        this.x = e.clientX;
        this.y = e.clientY;
        let closestDist = Number.MAX_SAFE_INTEGER;
        let closestType;
        for(let i = 0; i< this.particles.length; i++){
            const item = this.particles[i];
            const dx = this.x - item.x;
            const dy = this.y - item.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < closestDist){
                closestDist = dist;
                closestType = item.type;
            }
        }
        this.type = closestType;
        this.active = true;
    }

    onPointerUp(e){
        this.x = e.clientX;
        this.y = e.clientY;
        this.active = false;
    }

}