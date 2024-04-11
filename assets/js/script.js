const searchFormEl = document.querySelector('#weather-form');
const searchInputEl = document.querySelector('#search-input');
const currentWeatherEL = document.querySelector('#currentWeatherDay');
const weeklyWeatherEl = document.querySelector('#fiveDayForecast');

function handleSearchFormSubmit (event) {
    event.preventDefault();

    const searchInputVal = document.querySelector('#search-input').value;

    if(searchInputVal) {
        geoCoding(searchInputVal);

        searchInputEl.value = '';
    } else {
        alert('Please input a city');
    }

    // return console.log(searchInputVal);
}


function geoCoding(city) {
    const geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=eec7d54917da44bb2506e32e2a59cd92`

    fetch(geoApi)
        .then(function (response){ 
            if(response.ok) {
                response.json().then(function(data){
                    const latitude = data[0].lat;
                    const longitude = data[0].lon;
                    getWeather(latitude, longitude);
                })
            }
        })
        
}

function getWeather(lat , lon) {
    const weatherApi = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=eec7d54917da44bb2506e32e2a59cd92&units=imperial`

    fetch(weatherApi)
        .then(function(response) { 
            if (response.ok) {
                response.json().then(function(data){
                    // console.log(data);
                    currentCity = data.city.name;
                    currentTemp = data.list[0].main.temp;
                    currentWind = data.list[0].wind.speed;
                    currentHum = data.list[0].main.humidity;
                    displayWeather(currentCity, currentTemp, currentWind, currentHum);
                })
            }
        })
    
        // console.log(lat);
        // console.log(lon);
}

function displayWeather(city, temp, wind, humidity) {
    console.log(city);
    console.log(temp);
    console.log(wind);
    console.log(humidity);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);