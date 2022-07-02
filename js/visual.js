class Visual {
    constructor(stageWidth, stageHeight, bowl){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.particles = bowl.particles;
        this.density = bowl.density;

        this.setWebgl();
        this.buildFilters();
        
        if(this.container){
            this.stage.removeChild(this.container);
        }

        this.container = new PIXI.ParticleContainer({autoResize : true});
        this.stage.addChild(this.container);

        for(let i = 0; i < this.particles.length; i++){
            const item = this.particles[i];
            this.container.addChild(item.sprite);
        }
    }

    setWebgl(){
        this.renderer = new PIXI.Renderer({
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            antialias: true,
            transparent: false,
            resolution: window.devicePixelRatio,
            autoDensity: true,
            powerPreference: "high-performance",
            backgroundColor: 0x202020,
        });

        this.renderer.view.id = 'stage';
        document.getElementById('container').appendChild(this.renderer.view);
        
        this.stage = new PIXI.Container();
    }

    buildFilters(){
        this.blurFfilter = new PIXI.filters.BlurFilter();
        this.blurFfilter.blur = 20 / this.density;
        this.blurFfilter.autoFit = true;
        this.blurFfilter.quality = 10;

        const fragSource = `
            precision mediump float;
            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;
            uniform float thresholdR;
            uniform float thresholdB;

            void main(void){
                vec4 color = texture2D(uSampler, vTextureCoord);
                if(color.r > thresholdR){
                    gl_FragColor = vec4(vec3(0.9, 0.5, 0.0), 1);
                }else if(color.b > thresholdB){
                    gl_FragColor = vec4(vec3(0.0, 0.3, 0.5), 1);
                }
            }
        `;

        const uniformsData = {
            thresholdR: 0.2,
            thresholdB: 0.1,
        };

        this.thresholdFilter = new PIXI.Filter(null, fragSource, uniformsData);
        this.stage.filterArea = this.renderer.screen;
    }

    enableFilters(){
        this.stage.filters = [this.blurFfilter, this.thresholdFilter];
        this.setParticleSize(0.5);
        this.filtersEnabled = true;
    }
    
    disableFilters(){
        this.stage.filters = null;
        this.setParticleSize(0.1);
        this.filtersEnabled = false;
    }

    draw(){
        
        for(let i = 0; i< this.particles.length; i++){
            const item = this.particles[i];
            item.draw();
        }
        this.renderer.render(this.stage);
    }

    setParticleSize(size){
        this.container.removeChildren();
        for(let i = 0; i < this.particles.length; i++){
            const item = this.particles[i];
            item.sprite.scale.set(size / this.density);
            this.container.addChild(item.sprite);
        }
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.renderer.resize(this.stageWidth, this.stageHeight);
    }


    reset(density, particles){
        this.particles = particles;
        this.density = density;

        this.blurFfilter.blur = 20 / this.density;

        this.container.removeChildren();
        for(let i = 0; i < this.particles.length; i++){
            const item = this.particles[i];
            this.container.addChild(item.sprite);
        }
        
    }
}