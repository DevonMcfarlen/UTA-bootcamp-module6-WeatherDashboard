var forecast = document.querySelector("#forecast");
var input = document.querySelector("#inputTxt");

function getForecast(lat, lon)
{
    var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=6d3d04001d76e5ac03fafd3c5691957f`;
    
    fetch(forecastUrl).then(function (response)
    {
        return response.json();
    })
    .then(data =>
    {
        console.log(data);
    })
}


function getCoords(inputTxt) {
    var coordsUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${inputTxt}&limit=5&appid=6d3d04001d76e5ac03fafd3c5691957f`;

    fetch(coordsUrl).then(function (response) {
        return response.json();
    })
    .then(data => {
        getForecast(data[0].lat, data[0].lon);
    });
}

function search() {
    getCoords(input.value)
}

searchBtn.addEventListener("click", search);