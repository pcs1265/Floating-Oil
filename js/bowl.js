if (!window.localStorage.getItem('LOADED_BOWL_SIZE')){
    window.localStorage.setItem('LOADED_BOWL_SIZE', 1);
}
if (!window.localStorage.getItem('OIL_RATIO')){
    window.localStorage.setItem('OIL_RATIO', 0.25);
}
const LOADED_BOWL_SIZE = window.localStorage.getItem('LOADED_BOWL_SIZE');
const MAX_PARTICLES = 10000;
const OIL_RATIO = window.localStorage.getItem('OIL_RATIO');

class Bowl {
    constructor(){
        this.canvas = document.createElement("canvas");
        // this.canvas.style.position = 'absolute';
        // this.canvas.style.left = '0';
        // this.canvas.style.top = '0';
        // document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        this.radius;
        this.centerX;
        this.centerY;
        
    }
    
    setup(stageWidth, stageHeight){
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight;

        this.ctx.clearRect(0,0,stageWidth, stageHeight);

        this.ctx.strokeStyle = `rgba(0,0,255,1)`;
        this.ctx.fillStyle = `rgba(0,0,255,1)`;

        this.radius = Math.min(stageHeight / (3), stageWidth / (3));
        this.bowlSize = (320 / this.radius) * LOADED_BOWL_SIZE;

        this.density = Math.round(12 / this.bowlSize);

        this.centerX = stageWidth / (2);
        this.centerY = stageHeight / (2);
        
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.fill();
        
        return this.dotPos(this.density, stageWidth, stageHeight);
    }

    dotPos(density, stageWidth, stageHeight){
        const imageData = this.ctx.getImageData(
            0,0,
            stageWidth, stageHeight
        ).data;
        
        const particles = [];
        let i = 0;
        let totalParticles = 0;
        let width = 0;
        let pixel;
        for(let height = 0; height < stageHeight; height += density){
            if(totalParticles > MAX_PARTICLES){
                break;
            }
            const slide = (i % 2) == 0;
            width = 0;
            if (slide == 1) {
                width += 6;
            }
            for(width; width < stageWidth; width += density){
                pixel = imageData[((width + (height * stageWidth)) * 4) - 2 ];
                if (pixel !=0 &&
                    width > 0 && width < stageWidth &&
                    height > 0 && height < stageHeight)
                {
                    particles.push({
                        x : width,
                        y : height,
                        type : 1,
                    });
                    totalParticles++;
                }
            }
            ++i;
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