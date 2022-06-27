if (!window.localStorage.getItem('FILTERS_ENABLED')){
    window.localStorage.setItem('FILTERS_ENABLED', 'T');
}
const FILTERS_ENABLED = window.localStorage.getItem('FILTERS_ENABLED');

class App{
    constructor(){

        this.setWebgl();
        this.setStageSize();

        this.visual = new Visual(this.stageWidth, this.stageHeight, this.stage);
        this.resize();
        this.setFilters(this.visual.bowlSize);

        requestAnimationFrame(this.animate.bind(this));
        window.addEventListener('resize', this.resize.bind(this), false);
        this.frameCounter = 0;
        this.fpsIndicator = document.getElementById("fps_indicator");
        setInterval(this.showFPS.bind(this), 1000);
    }

    setWebgl(){
        this.renderer = new PIXI.Renderer({
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            antialias: true,
            transparent: false,
            resolution: window.devicePixelRatio,
            audoDensity: true,
            powerPreference: "high-performance",
            backgroundColor: 0x202020,
        });
        this.renderer.view.id = 'stage';
        document.getElementById('container').appendChild(this.renderer.view);
        
        this.stage = new PIXI.Container();
    }

    setFilters(bowlSize){
        this.blurFfilter = new PIXI.filters.BlurFilter();
        this.blurFfilter.blur = 15 / bowlSize;
        this.blurFfilter.autoFit = true;

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
                }else{
                    gl_FragColor = vec4(vec3(0.0), 0.0);
                }
            }
        `;

        const uniformsData = {
            thresholdR: 0.2,
            thresholdB: 0.2,
        };

        this.thresholdFilter = new PIXI.Filter(null, fragSource, uniformsData);

        this.enabledFilters = [this.blurFfilter, this.thresholdFilter];

        this.stage.filters = this.enabledFilters;
        this.stage.filterArea = this.renderer.screen;
    }

    setStageSize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.renderer.resize(this.stageWidth, this.stageHeight);
        this.visual.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));
        this.visual.animate();
        this.renderer.render(this.stage);
        this.frameCounter++;
    }

    showFPS(){
        this.fpsIndicator.innerHTML = this.frameCounter;
        this.frameCounter = 0;
    }


}
