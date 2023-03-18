/*API KEY*/
const openWeatherMap_api = "fcd37d13b5e5477f77d151852a9f2b71"

/*Main application*/
let showWeather = {
  apiKey: openWeatherMap_api,
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + openWeatherMap_api
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    backgroundChange(description);
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  showWeather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      showWeather.search();
    }
  });

showWeather.fetchWeather("Poznań");


function backgroundChange(description){
  switch(description){
    case "clear sky":
      document.body.style.backgroundImage = "url('img/clearsky.jpg')";
      break;
      case "few clouds":
      document.body.style.backgroundImage = "url('img/fewclouds.jpg')";
      break;
      case "scattered clouds":
        document.body.style.backgroundImage = "url('img/scatteredclouds.jpg')";
      break;
      case "overcast clouds":
      document.body.style.backgroundImage = "url('img/overcastclouds.jpg')";
      break;
      case "broken clouds":
      document.body.style.backgroundImage = "url('img/brokenclouds.jpg')";
      break;
      case "light rain":
      case "shower rain":
      document.body.style.backgroundImage = "url('img/lightrain.jpg')";
      break;
      case "rain":
      case "moderate rain":
      document.body.style.backgroundImage = "url('img/rain.jpg')";
      break;
      case "thunderstorm":
      document.body.style.backgroundImage = "url('img/thunderstorm.jpg')";
      break;
      case "haze":
      case "mist":
      case "fog":
      document.body.style.backgroundImage = "url('img/haze.jpg')";
      break;
      default:
        document.body.style.backgroundImage = "url('img/weather.jpg')";
  }
}