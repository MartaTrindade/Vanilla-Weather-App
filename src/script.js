//⏰Current Date
function formatDate(date) {
  let dateDay = date.getDate();
  let hour = date.getHours();if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = days[date.getDay()];
  let months = ["January","February","March","April","May","June","July","August","Setptember","October","November","December"];
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  return `${day}, ${dateDay} ${month} ${year} ${hour}:${minute}`;
}

//🕐Last updated
function formatLastUpdated (timestamp) {
  let updateDate = new Date(timestamp);
  let hours = updateDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = updateDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//👨‍🏫Weather API
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#current-max").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#current-min").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#last-updated").innerHTML = formatLastUpdated(response.data.dt * 1000);
  let iconElement = document.querySelector("#temperature-icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

//⌛Hourly Forecast
function dispalyForecast(response) {
  let forecastElement = document.querySelector("#hourly-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += ` 
    <div class="col-2">
      <li class="weatherForecast">${formatLastUpdated(forecast.dt * 1000)}</li>
      <li><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" width="50%"/></li>
      <li class="weatherForecast">${Math.round(forecast.main.temp_max)}º/${Math.round(forecast.main.temp_min)}ºC</li>
    </div>`;
  }
}
//📆Daily Forecast

//🕵️‍♀️Search City
function searchCity(city) {
  let apiKey = "2e83a4b7ba2b243a8588825e9765fe5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//🌍Geolocation
function searchLocation(position) {
  let apiKey = "2e83a4b7ba2b243a8588825e9765fe5a";
  let lat = (position.coords.latitude);
  let lon = (position.coords.longitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//🌡Celsius-Fartnheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


//⏰Current Date
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//🕵️‍♀️Search City
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

//🌍Geolocation
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

//🌡Celsius-Fartnheit
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Porto");