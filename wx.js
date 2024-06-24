$(document).ready(function() {
    if(window.CONFIG == undefined) {
        $('#main').text("CONFIG is not defined. Please check your config.js file.");
        return;
    }
    if(window.CONFIG.HA_TOKEN == 'URL') {
        const searchParams = new URLSearchParams(window.location.search);
        window.CONFIG.HA_TOKEN = searchParams.get('t');
    }
});