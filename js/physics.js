if (!window.localStorage.getItem('VISCOSITY')){
    window.localStorage.setItem('VISCOSITY', 0.5);
}

const VISCOSITY = window.localStorage.getItem('VISCOSITY');
const FRICTION = 0.8 - (0.2 * (VISCOSITY - 0.5));

function simulateFinger(particles, pointer){
    if(pointer.active){
        const particlesLength = particles.length;
        for(let i = 0; i < particlesLength ; i++){
            const item = particles[i];
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

function simulateRepulsive(particles){
    const particlesLength = particles.length;
    const particleRadius = particles[0].radius;
    const minDist_strong = 4 * particleRadius;
    const minDist_normal = 2 * particleRadius;

    for(let i = 0; i < particlesLength; i++){
        const item = particles[i];
        
        for(let j = i+1; j < particlesLength; j++){
            const item2 = particles[j];
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

function simulateBarrier(particles, bowl){
    const centerX = bowl.centerX;
    const centerY = bowl.centerY;
    const radius  = bowl.radius;
    const particlesLength = particles.length;

    for(let i = 0; i< particlesLength; i++){
        const item = particles[i];
        const dx = centerX - item.x;
        const dy = centerY - item.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = radius;

        if(dist > maxDist){
            const angle = Math.atan2(dy, dx);
            const tx = item.x + Math.cos(angle) * maxDist;
            const ty = item.y + Math.sin(angle) * maxDist;
            const ax = tx - centerX;
            const ay = ty - centerY;
            item.vx -= ax;
            item.vy -= ay;
        }
    }
}

function simulateFriction(particles){
    const particlesLength = particles.length;

    for(let i = 0; i< particlesLength; i++){
        const item = particles[i];
        item.vx *= FRICTION;
        item.vy *= FRICTION;
        item.x += item.vx;
        item.y += item.vy;
    }
}
