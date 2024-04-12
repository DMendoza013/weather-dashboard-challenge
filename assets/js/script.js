const searchFormEl = document.querySelector('#weather-form');
const searchInputEl = document.querySelector('#search-input');
const currentWeatherEL = document.querySelector('#currentWeatherDay');
const weeklyWeatherEl = document.querySelector('#fiveDayForecast');
const weatherCardsEl = document.querySelector('.weather-cards');
const currentWeatherEl = document.querySelector('#currentWeather');
const ApiKey = "eec7d54917da44bb2506e32e2a59cd92";

function handleSearchFormSubmit (event) {
    event.preventDefault();

    const searchInputVal = document.querySelector('#search-input').value.trim();

    if(searchInputVal) {
        geoCoding(searchInputVal);

        searchInputEl.value = '';
    } else {
        alert('Please input a city');
    }

    // return console.log(searchInputVal);
}


function geoCoding(city) {
    const geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${ApiKey}`

    fetch(geoApi)
        .then(function (response){ 
            if(response.ok) {
                response.json().then(function(data){
                    const latitude = data[0].lat;
                    const longitude = data[0].lon;
                    const currentCity = data[0].name; 
                    getWeather(currentCity, latitude, longitude);
                })
            }
        })
        
}

function getWeather(currentCity, lat , lon) {
    const weatherApi = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=imperial`

    fetch(weatherApi)
        .then(function(response) { 
            if (response.ok) {
                response.json().then(function(data){
                    const forecastDays = []; 
                    const fiveDayForecast = data.list.filter(function (forecast) {
                        const forecastDate = new Date(forecast.dt_txt).getDate();
                        if(!forecastDays.includes(forecastDate)){
                            return forecastDays.push(forecastDate);
                        };
                    });
                    currentWeatherEl.innerHTML = "";
                    weatherCardsEl.innerHTML = "";
                    
                    fiveDayForecast.forEach((arrayItem , arrayIndex) =>{ 
                        if(arrayIndex === 0) {
                            currentWeatherEl.insertAdjacentHTML("beforeend", displayWeather(currentCity, arrayItem, arrayIndex));
                        } else {
                            weatherCardsEl.insertAdjacentHTML("beforeend", displayWeather(currentCity, arrayItem, arrayIndex));
                        }  
                    });
                    
                });
            };
        });
    
        // console.log(lat);
        // console.log(lon);
};

const displayWeather = (currentCity, array, arrayIndex) => {
    // console.log(array);
    if(arrayIndex === 0) {
        return  `<div class="details">
                    <h2>${currentCity} (${array.dt_txt.split(" ")[0]})</h2>
                    <h4>Temperature : ${array.main.temp} °F</h4>
                    <h4>Winds: ${array.wind.speed} MPH</h4>
                    <h4>Humidity: ${array.main.humidity} %</h4>
                </div>`
    } else {
        return `<li class="card">
                <h3>(${array.dt_txt.split(" ")[0]})</h3>
                <h4>Temperature : ${array.main.temp} °F</h4>
                <h4>Winds: ${array.wind.speed} MPH</h4>
                <h4>Humidity: ${array.main.humidity} %</h4>
            </li>`;
    };
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);