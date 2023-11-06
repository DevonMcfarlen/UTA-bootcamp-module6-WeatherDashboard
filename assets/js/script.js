var forecast = document.querySelector("#forecast");
var input = document.querySelector("#inputTxt");

function getForecast(lat, lon)
{
    var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=6d3d04001d76e5ac03fafd3c5691957f`;
    
    fetch(forecastUrl).then(function (response)
    {
        return response.json();
    })
    .then(res =>
    {
        forecast.innerHTML = "";

        for(var i = 0; i < 5; i++) {
            var dateEl = document.createElement("h2");
            var imgEl = document.createElement("img");
            var temperatureEl = document.createElement("p");
            var windEl= document.createElement("p");
            var humidityEl = document.createElement("p");

            var date = new Date(res.daily[i].dt * 1000).toLocaleString().split(",")[0];

            dateEl.textContent = date;
            imgEl.setAttribute("src", `https://openweathermap.org/img/wn/${res.daily[i].weather[0].icon}@2x.png`);
            temperatureEl.textContent = `Temp: ${res.daily[i].temp.day} °F`
            windEl.textContent = `Wind Speed: ${res.daily[i].wind_speed} MPH`;
            humidityEl.textContent = `Humidity: ${res.daily[i].humidity}`

            var day = document.createElement("div");
            day.setAttribute("style", "padding: 20px");
            day.append(dateEl, imgEl, temperatureEl, windEl, humidityEl);

            forecast.append(day);
        }
    })
}

function getCoords() {
    var coordsUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=5&appid=6d3d04001d76e5ac03fafd3c5691957f`;

    fetch(coordsUrl).then(function (response) {
        return response.json();
    })
    .then(data => {
        getForecast(data[0].lat, data[0].lon);
    });
}

searchBtn.addEventListener("click", getCoords);