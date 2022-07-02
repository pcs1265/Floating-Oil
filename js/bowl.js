
const MAX_PARTICLES = 10000;


class Bowl {
    constructor(texture){
        this.radius;
        this.centerX;
        this.centerY;
        this.texture = texture;
        this.particles = [];
    }
    
    setup(stageWidth, stageHeight, bowlSize, oilRatio){
        this.radius = Math.min(stageHeight / (3), stageWidth / (3));
        this.density = (320 / this.radius) * bowlSize;
        const particleGap = 12 / this.density;

        this.centerX = stageWidth / (2);
        this.centerY = stageHeight / (2);
        
        let particlePos = this.dotPos(particleGap, oilRatio);


        for(let i = 0; i < particlePos.length; i++){
            const item = new Particle(particlePos[i], this.texture, this.density);
            this.particles.push(item);
        }
        return this.particles;
    }
    
    dotPos(density, oilRatio){
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
                        type : (Math.random() < oilRatio) ? 0 : 1,
                    });
                    totalParticles++;
                }
            }
        }
        
        document.getElementById('particle_indicator').innerHTML = totalParticles;

        return particles;
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        const centerX_old = this.centerX;
        const centerY_old = this.centerY;
        const centerX_new = stageWidth / 2;
        const centerY_new = stageHeight / 2;
        this.centerX = centerX_new;
        this.centerY = centerY_new;

        for(let i = 0; i< this.particles.length; i++){
            const item = this.particles[i];
            item.x = item.x - centerX_old + centerX_new;
            item.y = item.y - centerY_old + centerY_new;
        }
    }


    simulateAll(pointer, friction){
        this.simulateFinger(pointer);
        this.simulateRepulsive();
        this.simulateBarrier();
        this.simulateFriction(friction);
    }
    
    simulateFinger(pointer){
        if(pointer.active){
            const particlesLength = this.particles.length;
            for(let i = 0; i < particlesLength ; i++){
                const item = this.particles[i];
                const dx = pointer.x - item.x;
                const dy = pointer.y - item.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = item.radius + pointer.radius;
                
                if(item.type == pointer.type && pointer.type == 0){
                    if(dist < minDist){
                        const angle = Math.atan2(dy, dx);
                        const tx = item.x + Math.cos(angle) * dist * 1.3;
                        const ty = item.y + Math.sin(angle) * dist * 1.3;
                        const ax = tx - pointer.x;
                        const ay = ty - pointer.y;
                        item.vx += ax / 2;
                        item.vy += ay / 2;
                    }
                }else if(item.type == pointer.type && pointer.type == 1){
                    if(dist < minDist * 2){
                        const angle = Math.atan2(dy, dx);
                        const tx = item.x + Math.cos(angle) * dist * 1.2;
                        const ty = item.y + Math.sin(angle) * dist * 1.2;
                        const ax = tx - pointer.x;
                        const ay = ty - pointer.y;
                        item.vx += ax / 5;
                        item.vy += ay / 5;
                    }
                }
            }
        }
    }
    
    simulateRepulsive(){
        const particlesLength = this.particles.length;
        const particleRadius = this.particles[0].radius;
        const minDist_strong = 4 * particleRadius;
        const minDist_normal = 2 * particleRadius;
    
        for(let i = 0; i < particlesLength; i++){
            const item = this.particles[i];
            
            for(let j = i+1; j < particlesLength; j++){
                const item2 = this.particles[j];
                const dx_between_dots = item.x - item2.x;
                const dy_between_dots = item.y - item2.y;
                const dist_between_dots = Math.sqrt(dx_between_dots * dx_between_dots + dy_between_dots * dy_between_dots);
                
                if(item.type != item2.type){
                    if(dist_between_dots < minDist_strong){
                        const angle = Math.atan2(dy_between_dots, dx_between_dots);
                        const tx = item2.x + Math.cos(angle) * minDist_strong;
                        const ty = item2.y + Math.sin(angle) * minDist_strong;
                        const ax = (tx - item.x) / 5;
                        const ay = (ty - item.y) / 5;
                        item.vx += ax;
                        item.vy += ay;
                        item2.vx -= ax;
                        item2.vy -= ay;
                    }
                }else{
                    if(dist_between_dots < minDist_normal){
                        const angle = Math.atan2(dy_between_dots, dx_between_dots);
                        const tx = item2.x + Math.cos(angle) * minDist_normal;
                        const ty = item2.y + Math.sin(angle) * minDist_normal;
                        const ax = (tx - item.x) / 5;
                        const ay = (ty - item.y) / 5;
                        item.vx += ax;
                        item.vy += ay;
                        item2.vx -= ax;
                        item2.vy -= ay;
                    }
                }
                
            }
        }
    }
    
    simulateBarrier(){
        const particlesLength = this.particles.length;
    
        for(let i = 0; i< particlesLength; i++){
            const item = this.particles[i];
            const dx = this.centerX - item.x;
            const dy = this.centerY - item.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = this.radius;
    
            if(dist > maxDist){
                const angle = Math.atan2(dy, dx);
                const tx = item.x + Math.cos(angle) * maxDist;
                const ty = item.y + Math.sin(angle) * maxDist;
                const ax = tx - this.centerX;
                const ay = ty - this.centerY;
                item.vx -= ax;
                item.vy -= ay;
            }
        }
    }
    
    simulateFriction(friction){
        const particlesLength = this.particles.length;
    
        for(let i = 0; i< particlesLength; i++){
            const item = this.particles[i];
            item.vx *= friction;
            item.vy *= friction;
            item.x += item.vx;
            item.y += item.vy;
        }
    }
}