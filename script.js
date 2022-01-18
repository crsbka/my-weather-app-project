let apiKey = "c0d89ac9b3417fc5f06ed2c347a7a787";
let celTemp = 0;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let dayWeek = days[date.getDay()];

    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${dayWeek}, ${hours}:${minutes}`;
}

let dateEl = document.querySelector("#current-date");
let currentTime = new Date();
dateEl.innerHTML = formatDate(currentTime);

//Challenge 2

//Search btn
function getWeatherByInput(event) {
    event.preventDefault();

    let searchInput = document.querySelector("#city-input");

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
    // common function call
    getApiResultAndUpdateHtml(apiUrl);
}

let searchCityButton = document.querySelector("#search-button");
searchCityButton.addEventListener("click", getWeatherByInput);

//Current location btn
function getWeatherByCurrentLocation(event) {
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(onCurrentPositionIdentified);
}

let currentCityButton = document.querySelector("#current-button");
currentCityButton.addEventListener("click", getWeatherByCurrentLocation);

function onCurrentPositionIdentified(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    getApiResultAndUpdateHtml(apiUrl);
}

function getApiResultAndUpdateHtml(apiUrl) {
    axios.get(apiUrl).then(updateWeatherInfo);
}

function updateWeatherInfo(response) {
    //replacing h2 city/place with new value
    let place = response.data.name;
    let h2 = document.querySelector("h2");
    h2.innerHTML = place;

    //feels like value
    let feelsLike = Math.round(response.data.main.feels_like);
    let feelsLikeTemp = document.querySelector("#feels-like-value");
    feelsLikeTemp.innerHTML = `${feelsLike}°C`;

    //wind km/h
    let wind = Math.round(response.data.wind.speed);
    let windValue = document.querySelector("#wind");
    windValue.innerHTML = `${wind}km/h E`;

    //pressure
    let airPressure = Math.round(response.data.main.pressure);
    let pressure = document.querySelector("#pressure");
    pressure.innerHTML = `${airPressure}hPa`;

    //humidity %
    let humidityValue = response.data.main.humidity;
    let humid = document.querySelector("#humidity");
    humid.innerHTML = `${humidityValue}%`;

    //weather current conditions/descriptions
    let weatherDescription = response.data.weather[0].description;
    let weatherDescript = document.querySelector("#weather-description");
    weatherDescript.innerHTML = capitalizeFirstLetter(weatherDescription);

    //main big temp (bottom)
    let temp = Math.round(response.data.main.temp);
    let mainTemp = document.querySelector("#main-temperature");
    mainTemp.innerHTML = temp;
    celTemp = temp;
}

//Challenge 3

function showCelTemp() {
    let tempSpan = document.querySelector("#main-temperature");
    tempSpan.innerHTML = "" + celTemp;
}

function showFarTemp() {
    let tempSpan = document.querySelector("#main-temperature");
    let farTemp = Math.round((celTemp * 9) / 5 + 32);
    tempSpan.innerHTML = "" + farTemp;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelTemp);

let farenhLink = document.querySelector("#fahrenheit-link");
farenhLink.addEventListener("click", showFarTemp);
