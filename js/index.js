window.onload = () => {
    this.app = new App();

    if(!app.filtersEnabled){
        document.getElementById('toggle_filters').checked = false;
    }

    if(OPEN_SETTING_MENU == 'T'){
        document.getElementById('settings').open = true;
    }
    
    document.getElementById('bowl_size').innerHTML = this.app.bowlSize;
    document.getElementById('bowl_size_slider').value = this.app.bowlSize;
    
    document.getElementById('oil_ratio').innerHTML = this.app.oilRatio;
    document.getElementById('oil_ratio_slider').value = this.app.oilRatio;

    document.getElementById('viscosity').innerHTML = this.app.viscosity;
    document.getElementById('viscosity_slider').value = this.app.viscosity;
    
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
    if(this.app.filtersEnabled){
        window.localStorage.setItem('FILTERS_ENABLED', 'F');
        this.app.disableFilters();
    }else{
        window.localStorage.setItem('FILTERS_ENABLED', 'T');
        this.app.enableFilters();
    }
}

function applyChanges(){
    app.bowlSize = parseFloat(document.getElementById('bowl_size_slider').value);
    document.getElementById('bowl_size').innerHTML = this.app.bowlSize;
    window.localStorage.setItem('BOWL_SIZE', this.app.bowlSize);
    
    app.oilRatio = parseFloat(document.getElementById('oil_ratio_slider').value);
    document.getElementById('oil_ratio').innerHTML = this.app.oilRatio;
    window.localStorage.setItem('OIL_RATIO', this.app.oilRatio);

    app.viscosity = parseFloat(document.getElementById('viscosity_slider').value);
    document.getElementById('viscosity').innerHTML = this.app.viscosity;
    window.localStorage.setItem('VISCOSITY', this.app.viscosity);

    app.applyChanges();
}

function bowlSizeChanged(value){
    document.getElementById('bowl_size').innerHTML = value;
}

function oilRatioChanged(value){
    document.getElementById('oil_ratio').innerHTML = value;
}

function viscosityChanged(value){
    document.getElementById('viscosity').innerHTML = value;
}

function setToDefaults(){
    window.localStorage.clear();
    location.reload();
}



