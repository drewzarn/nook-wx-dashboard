let SENSORS = [];

$(document).ready(function() {
    if(window.CONFIG == undefined) {
        $('#main').text("CONFIG is not defined. Please check your config.js file.");
        return;
    }
    if(window.CONFIG.HA_TOKEN == 'URL') {
        const searchParams = new URLSearchParams(window.location.search);
        window.CONFIG.HA_TOKEN = searchParams.get('t');
    }

    $('[data-sensor]').each((i, el) => {
        SENSORS.push({
            sensor: $(el).data('sensor'),
            attribute: $(el).data('attribute') || 'state',
            state: undefined
        });
    });

    setInterval(() => {
        fetchStates();
    }, 30000);
    fetchStates();
});

fetchStates = function() {
    document.getElementById('main').innerText = "Testing gebi";
    $('#main').text('Loading...');
    for (let sensor of SENSORS) {
        fetch(`${window.CONFIG.HA_URL}states/${sensor.sensor}`, {
            headers: { 'Authorization': `Bearer ${window.CONFIG.HA_TOKEN}` }
        }).then(response => response.json())
        .then(data => {
            sensor.state = data[sensor.attribute];
            $(`[data-sensor="${sensor.sensor}"]`).text(sensor.state);
        })
    }
}