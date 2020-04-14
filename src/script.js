//⏰Current Date
function formatDate(date) {
  let dateDay = date.getDate();
  let hour = date.getHours();if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = days[date.getDay()];
  let months = ["January","February","March","April","May","June","July","August","Setptember","October","November","December"];
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  let lastUpdated = document.querySelector("#last-updated");
  lastUpdated.innerHTML = `Last updated: ${dateDay} ${month} ${year} ${hour}:${minutes}`;

  return `${day}, ${dateDay} ${month} ${year} ${hour}:${minutes}`;
}

//👨‍🏫Weather API
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#current-max").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#current-min").innerHTML = Math.round(response.data.main.temp_min);
  
  let iconElement = document.querySelector("#temperature-icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

//Hourly Forecast

//🕵️‍♀️Search City
function searchCity(city) {
  let apiKey = "2e83a4b7ba2b243a8588825e9765fe5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//🌍Geolocation
function showPosition(position) {
  let apiKey = "2e83a4b7ba2b243a8588825e9765fe5a";
  let lat = (position.coords.latitude);
  let lon = (position.coords.longitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
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

let city = null;

//🌍Geolocation
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

navigator.geolocation.getCurrentPosition(showPosition);

//🌡Celsius-Fartnheit
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
