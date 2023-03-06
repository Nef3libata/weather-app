let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

let headerCity = prompt("Enter a city");
headerCity = headerCity.toLowerCase();

//an array of cities that we have their temperature
let headerCitys = ["paris", "tokyo", "lisbon", "san francisco", "oslo"];

if (headerCitys.includes(headerCity)) {
  //storing weather temperature and humidity in variables
  let cityTemp = weather[headerCity].temp;
  cityTemp = Math.round(cityTemp);
  let cityHumidity = weather[headerCity].humidity;

  //converting celcius to fahrenheit
  let fahrenheitTemp = cityTemp * 1.8 + 32;
  fahrenheitTemp = Math.round(fahrenheitTemp);

  //a function to capitalize the first letter of city's name
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  alert(
    `It is currently ${cityTemp}°C (${fahrenheitTemp}°F) in ${capitalizeFirstLetter(
      headerCity
    )} with a humidity of ${cityHumidity}% `
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${headerCity}`
  );
}
