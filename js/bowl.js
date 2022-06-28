if (!window.localStorage.getItem('BOWL_SIZE')){
    window.localStorage.setItem('BOWL_SIZE', 1);
}
if (!window.localStorage.getItem('OIL_RATIO')){
    window.localStorage.setItem('OIL_RATIO', 0.25);
}
const BOWL_SIZE = window.localStorage.getItem('BOWL_SIZE');
const MAX_PARTICLES = 10000;
const OIL_RATIO = window.localStorage.getItem('OIL_RATIO');

class Bowl {
    constructor(){


        this.radius;
        this.centerX;
        this.centerY;
        
    }
    
    setup(stageWidth, stageHeight){

        this.radius = Math.min(stageHeight / (3), stageWidth / (3));
        this.density = (320 / this.radius) * BOWL_SIZE;
        this.particleGap = 12 / this.density;

        this.centerX = stageWidth / (2);
        this.centerY = stageHeight / (2);
        
        return this.dotPos(this.particleGap);
    }

    dotPos(density){
        const lowBoundX = this.radius - this.centerX;
        const highBoundX = this.radius + this.centerX;
        const lowBoundY = this.radius - this.centerY;
        const highBoundY = this.radius + this.centerY;

        const particles = [];
        let totalParticles = 0;
        for(let height = lowBoundY; height < highBoundY; height += density){
            if(totalParticles > MAX_PARTICLES){
                break;
            }
            for(let width = lowBoundX; width < highBoundX; width += density){
                const dx = this.centerX - width;
                const dy = this.centerY - height;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= this.radius){
                    particles.push({
                        x : width,
                        y : height,
                        type : 1,
                    });
                    totalParticles++;
                }
            }
        }
        for(let i = 0; i < particles.length; i++){
            const item = particles[i];
            if(Math.random() < OIL_RATIO){
                item.type = 0;
            }
        }
        
        document.getElementById('particle_indicator').innerHTML = totalParticles;

        return particles;
    }

    rePosition(stageWidth, stageHeight){
        this.centerX = stageWidth / (2);
        this.centerY = stageHeight / (2);
    }
}