const { httpGET } = require('./../helpers/http');
const weatherEndpoint = `https://api.openweathermap.org/data/2.5/forecast?APPID=a83af72ead99ad301ef1d96dc1a8d1ad&cnt=5&q=`;

exports.weatherLookup = async function weatherLookup(req, res) {

    let location = 'chennai,in';

    if (req.query.location) {
        location = req.query.location;
    }

    let resp = await httpGET(weatherEndpoint + location);

    if (!resp[0]) {
        res.status(400).send(resp[1]);
    } else {
        return res.send(parseWeatherResult(resp[1].list, location.split(',')[0]));
    }

}

function parseWeatherResult(weatherList, location) {
    
    let formattedWeather = [];

    for (let weather of weatherList) {
        const date = new Date(weather.dt * 1000).toDateString();
        const main = weather.weather[0].main;
        const temp = weather.main.temp;

        formattedWeather.push({date, main, temp});
    }

    return {
        count: formattedWeather.length,
        unit: "metric",
        location,
        data: formattedWeather,
    };
}