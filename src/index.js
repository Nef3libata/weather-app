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
let celciusLink = document.querySelector("#c-unit");
let fahrenheitLink = document.querySelector("#f-unit");

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = celciusTemperature * 1.8 + 32;
  temp.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
}
function convertToCelcius(event) {
  event.preventDefault();
  temp.innerHTML = `${Math.round(celciusTemperature)}°`;
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
celciusLink.addEventListener("click", convertToCelcius);
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//Set the current temperature, wind speed, and weather description of the city that was searched for
let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
let units = "metric";
//The input of the city that user searched for
let searchedCity = document.querySelector("#searched-city");
//City's name which appears as the main city name on the page
let headerCity = document.querySelector("#header-city");

function showTemperature(response) {
  //change name
  headerCity.innerHTML = response.data.name;

  //change temperature
  celciusTemperature = response.data.main.temp;
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${Math.round(celciusTemperature)}°`;

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

  //setting the related weather icon
  let iconElement = document.querySelector("#icon");
  icon = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@4x.png`
  );

  //setting the related alt for the image
  iconElement.setAttribute(
    "alt",
    `${response.data.weather[0].description} image`
  );
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
let celciusTemperature = null;

let formCity = document.querySelector("#city-form");
formCity.addEventListener("submit", updateCityTemperature);

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  document.getElementById("current-button").onclick = function () {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  };
}
navigator.geolocation.getCurrentPosition(setPosition);
