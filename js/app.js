class App{
    constructor(){
        if (!window.localStorage.getItem('FILTERS_ENABLED')){
            window.localStorage.setItem('FILTERS_ENABLED', 'T');
        }
        if (!window.localStorage.getItem('VISCOSITY')){
            window.localStorage.setItem('VISCOSITY', 0.5);
        }
        if (!window.localStorage.getItem('BOWL_SIZE')){
            window.localStorage.setItem('BOWL_SIZE', 1);
        }
        if (!window.localStorage.getItem('OIL_RATIO')){
            window.localStorage.setItem('OIL_RATIO', 0.25);
        }
        if(window.localStorage.getItem('FILTERS_ENABLED') == 'T'){
            this.filtersEnabled = true;
        }else{
            this.filtersEnabled = false;    
        }

        this.bowlSize = parseFloat(window.localStorage.getItem('BOWL_SIZE'));
        this.oilRatio = parseFloat(window.localStorage.getItem('OIL_RATIO'));
        this.viscosity = parseFloat(window.localStorage.getItem('VISCOSITY'));
        this.friction = 0.8 - (0.2 * (this.viscosity - 0.5));

        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        
        this.texture = PIXI.Texture.from('./img/particle.png');
        this.bowl = new Bowl(this.texture);
        this.particles = this.bowl.setup(this.stageWidth, this.stageHeight, this.bowlSize, this.oilRatio);
        this.density = this.bowl.density;

        this.visual = new Visual(this.stageWidth, this.stageHeight, this.bowl);
        this.pointer = new Pointer(this.particles, this.density);

        if(this.filtersEnabled){
            this.visual.enableFilters();
        }else{
            this.visual.disableFilters();
        }

        this.animate();
        window.addEventListener('resize', this.resize.bind(this), false);
        
        this.frameCounter = 0;
        this.fpsIndicator = document.getElementById("fps_indicator");
        setInterval(this.showFPS.bind(this), 1000);

    }

    
    enableFilters(){
        this.visual.enableFilters();
        this.filtersEnabled = true;
    }
    
    disableFilters(){
        this.visual.disableFilters();
        this.filtersEnabled = false;
    }
    

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.visual.resize(this.stageWidth, this.stageHeight);
        this.bowl.resize(this.stageWidth, this.stageHeight);
    }

    animate(){
        requestAnimationFrame(this.animate.bind(this));
        this.bowl.simulateAll(this.pointer, this.friction);
        this.visual.draw();
        this.frameCounter++;
    }

    showFPS(){
        this.fpsIndicator.innerHTML = this.frameCounter;
        this.frameCounter = 0;
    }

    applyChanges(){
        this.friction = 0.8 - (0.2 * (this.viscosity - 0.5));
        this.bowl.setup(this.stageWidth, this.stageHeight, this.bowlSize, this.oilRatio);
        this.density = this.bowl.density;
        this.pointer.reset(this.density);
        this.visual.reset(this.density);

        if(this.filtersEnabled){
            this.visual.enableFilters();
        }else{
            this.visual.disableFilters();
        }

    }
}
