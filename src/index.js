//A feature that sets current day and time
let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentDate.getDay()];
let currentHour = currentDate.getHours();
let currentMinute = currentDate.getMinutes();
currentMinute = currentMinute.toLocaleString("en-US", {
  minimumIntegerDigits: 2,
  useGrouping: false,
});
function setCurrentTime() {
  let today = document.querySelector("#today");
  today.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;
}
setCurrentTime();

//A feature to convert celcius to fahrenheit
let celcius = document.querySelector("#c-unit");
let fahrenheit = document.querySelector("#f-unit");
function convertCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = "25°";
}
function convertFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = "77°";
}
celcius.addEventListener("click", convertCelcius);
fahrenheit.addEventListener("click", convertFahrenheit);

//Set the current temperature, wind speed, and weather description of the city that was searched for
let apiKey = config.apiKey;
let units = "metric";
//The input of the city that user searched for
let searchedCity = document.querySelector("#searched-city");
//City's name which appears as the main city name on the page
let headerCity = document.querySelector("#header-city");

function showTemperature(response) {
  //change name
  let headerCity = document.querySelector("#header-city");
  headerCity.innerHTML = response.data.name;

  //change temperature
  let temperature = response.data.main.temp;
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${Math.round(temperature)}°`;

  //change humidity
  let humidity = response.data.main.humidity;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `${Math.round(humidity)}`;

  //change wind speed
  let windSpeed = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(windSpeed)}`;

  //change weather description
  let weatherStatus = response.data.weather[0].description;
  let des = document.querySelector("#description");
  des.innerHTML = `${weatherStatus}`;

  //clear the search bar
  document.getElementById("searched-city").value = "";
}

//show current weather of Sydney
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showTemperature);

//a function to show weather of the city that was searched for
function updateCityTemperature(event) {
  event.preventDefault();
  searchedCity = document.querySelector("#searched-city").value;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

//Shows the city's weather when search button is clicked or the form is submitted
document.getElementById("search-button").onclick = updateCityTemperature;

let formCity = document.querySelector("#city-form");
formCity.addEventListener("submit", updateCityTemperature);

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let headerCity = document.querySelector("#header-city");
  document.getElementById("current-button").onclick = function () {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    //headerCity.innerHTML = "Current Weather";
    axios.get(apiUrl).then(showTemperature);
  };
}
navigator.geolocation.getCurrentPosition(setPosition);
