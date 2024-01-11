const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const iconOutput = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const search = document.querySelector(".search");
const form = document.getElementById("locationInput");
const btnSubmit = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");
// Default city when the page loading
let cityInput = "Cairo";

//Add event to each city in the panel
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    //Change from default city to the clicked city
    cityInput = e.target.innerHTML;

    fetchWeatherData(cityInput);

  });
});

//Add submit event to search
form.addEventListener("submit", (e) => {
  if (search.value.length === 0) {
    e.preventDefault();
  } else {
    cityInput = search.value;
    fetchWeatherData(cityInput);
    search.value = "";

    // app.getElementsByClassName.opacity = '0';
  }
  e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
  const weekDay = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return weekDay[new Date(`${day}/${month}/${year}`).getDay()];
}

async function fetchWeatherData(city = "cairo") {
  let response = await fetch(
    ` https://api.weatherapi.com/v1/current.json?key=628d6011772048e8895202631240701&q=${city}`
  );
  let data = await response.json();

  temp.innerHTML = data.current.temp_c + "&#176";
  conditionOutput.innerHTML = data.current.condition.text;

  const date = data.location.localtime;
  const y = parseInt(date.substr(0, 4));
  const m = parseInt(date.substr(5, 2));
  const d = parseInt(date.substr(8, 2));
  const time = date.substr(11);

  dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
  timeOutput.innerHTML = time;
  nameOutput.innerHTML = data.location.name;

  const icondID = data.current.condition.icon.substr(
    "//cdn.weatherapi.com/weather/64x64/".length
  );
  iconOutput.src = "imgs/icons/" + icondID;

  iconOutput.src = data.current.condition.icon;

  cloudOutput.innerHTML = data.current.cloud + "%";
  humidityOutput.innerHTML = data.current.humidity + "%";
  windOutput.innerHTML = data.current.wind_kph + "km/h";


}

fetchWeatherData();
