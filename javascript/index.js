let currentDate = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[currentDate.getDay()];

let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

function formatDate() {
  let h6 = document.querySelector("h6");
  h6.innerHTML = `${day} ${hours}:${minutes}`;
}

formatDate();

function showCurrentDetails(response) {
  let temperatureElement = document.querySelector("#temperature");
  let citiesElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  citiesElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  descriptionElement.innerHTML = response.data.weather[0].description;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentDetails);
}

function searchCity(city) {
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentDetails);
}

function submitButton(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCityButton = document.querySelector("#current-city");
currentCityButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitButton);
