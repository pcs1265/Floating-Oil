class Visual {
    constructor(){
        this.bowl = new Bowl();
        this.texture = PIXI.Texture.from('img/particle.png');
        this.particles = [];
        this.pointer = new Pointer(this.particles);
    }

    show(stageWidth, stageHeight, stage){
        if(this.container){
            stage.removeChild(this.container);
        }

        this.particlePos = this.bowl.setup(Math.floor(12 / BOWL_SIZE), stageWidth, stageHeight);

        this.container = new PIXI.ParticleContainer(this.particlePos.length);
        stage.addChild(this.container);

        this.particles.splice(0,this.particles.length);

        for(let i = 0; i < this.particlePos.length; i++){
            const item = new Particle(this.particlePos[i], this.texture);
            this.container.addChild(item.sprite);
            this.particles.push(item);
        }
        console.log(this.particles.length);
        
    }
    
    animate(){

        simulateFinger_variableType(this.particles, this.pointer);
        simulateRepulsive(this.particles);
        simulateBarrier(this.particles, this.bowl);
        simulateFriction(this.particles);

        for(let i = 0; i< this.particles.length; i++){
            const item = this.particles[i];
            item.draw();
        }
    }


    setParticleSize(size){
        this.container.removeChildren();
        for(let i = 0; i < this.particlePos.length; i++){
            const item = this.particles[i];
            item.sprite.scale.set(size);
            this.container.addChild(item.sprite);
        }
    }

    resize(stageWidth, stageHeight){
        const centerX_old = this.bowl.centerX;
        const centerY_old = this.bowl.centerY;
        const centerX_new = stageWidth / 2;
        const centerY_new = stageHeight / 2;
        this.bowl.centerX = centerX_new;
        this.bowl.centerY = centerY_new;

        for(let i = 0; i< this.particles.length; i++){
            const item = this.particles[i];
            item.x = item.x - centerX_old + centerX_new;
            item.y = item.y - centerY_old + centerY_new;
        }
        
    }
}