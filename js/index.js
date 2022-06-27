window.onload = () => {
    app = new App();

    if(FILTERS_ENABLED == 'F'){
        document.getElementById('toggle_filters').checked = false;
        this.app.stage.filters = [];
        window.localStorage.setItem('FILTERS_ENABLED', 'F');
        this.app.visual.setParticleSize(0.1);
    }

    if(OPEN_SETTING_MENU == 'T'){
        document.getElementById('settings').open = true;
    }

    document.getElementById('bowl_size').innerHTML = LOADED_BOWL_SIZE;
    document.getElementById('bowl_size_slider').value = LOADED_BOWL_SIZE;
    
    document.getElementById('oil_ratio').innerHTML = OIL_RATIO;
    document.getElementById('oil_ratio_slider').value = OIL_RATIO;

    document.getElementById('viscosity').innerHTML = VISCOSITY;
    document.getElementById('viscosity_slider').value = VISCOSITY;
    
}

if (!window.localStorage.getItem('OPEN_SETTING_MENU')){
    window.localStorage.setItem('OPEN_SETTING_MENU', 'F');
}

const OPEN_SETTING_MENU = window.localStorage.getItem('OPEN_SETTING_MENU');
function toggleSettingMenu(){
    if(window.localStorage.getItem('OPEN_SETTING_MENU') == 'T'){
        window.localStorage.setItem('OPEN_SETTING_MENU', 'F');
    }else{
        window.localStorage.setItem('OPEN_SETTING_MENU', 'T');
    }
}

function toggleFilters(){
    if(window.localStorage.getItem('FILTERS_ENABLED') == 'T'){
        this.app.stage.filters = [];
        window.localStorage.setItem('FILTERS_ENABLED', 'F');
        this.app.visual.setParticleSize(0.1);

    }else{
        this.app.stage.filters = this.app.enabledFilters;
        window.localStorage.setItem('FILTERS_ENABLED', 'T');
        this.app.visual.setParticleSize(0.5);
    }
}


function bowlSizeChanged(value){
    window.localStorage.setItem('LOADED_BOWL_SIZE', value);
    document.getElementById('bowl_size').innerHTML = value;
}

function oilRatioChanged(value){
    window.localStorage.setItem('OIL_RATIO', value);
    document.getElementById('oil_ratio').innerHTML = value;
}

function viscosityChanged(value){
    window.localStorage.setItem('VISCOSITY', value);
    document.getElementById('viscosity').innerHTML = value;
}

function toggleLimitParticles(){
    if(window.localStorage.getItem('LIMIT_PARTICLES') == 'T'){
        window.localStorage.setItem('LIMIT_PARTICLES', 'F');
    }else{
        window.localStorage.setItem('LIMIT_PARTICLES', 'T');
    }
    
}

function reload(){
    location.reload();
}

function setToDefaults(){
    window.localStorage.clear();
    location.reload();
}



