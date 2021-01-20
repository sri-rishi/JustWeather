// selecting  html elements
var txtInput = document.querySelector("#txt-input");
var btnCheck = document.querySelector("#btn-check");
var weatherImageDiv  = document.querySelector("#weather-image");
var temperatureDiv = document.querySelector("#temperature");
var feelsLike = document.querySelector('#feels-like')
var humidityDiv =document.querySelector("#humidity");
var descriptionDiv = document.querySelector("#description");
var windSpeed = document.querySelector("#wind-speed");
var visibilityDiv = document.querySelector("#visibility");
var cityData = document.querySelector("#city-name");
var cloneDiv= document.querySelectorAll(".description-div");
var footerDiv =document.querySelector("#footer");
// Setting weather url
function getWeatherURL(text) {
    var serverURL = "https://api.openweathermap.org/data/2.5/weather?q=" ;
    var apiKey = "ce7af20031553e7707065741261ad3f1";
    var unit = "metric";
    return serverURL + text + "&appid=" + apiKey + "&units=" + unit;
}

// image URL
var imageURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/";


function clickHandler(event){
    event.preventDefault();
    var inputText = txtInput.value; 
    var cityName = inputText.split(',')[0];
    // getting current time
    var today = new Date();
    var time = today.getHours() + ":" +today.getMinutes();
    

        // getting data from api
        fetch(getWeatherURL(inputText))
        .then(response => response.json())
        .then(json => {
            var icon = json.weather[0].icon;
            var visibilityKM = Math.round(json.visibility/1000);
            var weatherDescription =json.weather[0].description;
            var weatherTemp = Math.round(json.main.temp);
            var tempFeelLike =  Math.round(json.main.feels_like);
            var weatherHumidity = json.main.humidity; 
            var windSpeedNow = Math.round(json.wind.speed);
            var cityCountry = json.sys.country;
            
            // updating data into divs
            cityData.innerHTML= "<p class=\"city-data\">" +cityName[0].toUpperCase() + cityName.slice(1)+ "<sup class='country'>"+ cityCountry + "</sup> Weather<br/> <span>as of "+ time + " IST</span><p>";
            temperatureDiv.innerHTML= weatherTemp + "<span id='deg-celci'>&#8451<span>";
            descriptionDiv.innerHTML = weatherDescription[0].toUpperCase()+weatherDescription.slice(1);
            feelsLike.innerHTML ="<p>Feels Like<br/><span class='temp-feel'>" + tempFeelLike + "&#8451<span><p/>";
            humidityDiv.innerHTML = "<img  class=\"weather-icon\" src='images/humidity.png'><p class='humidity para'>Humidity<span class='clone-spans'> " + weatherHumidity +"%</span></p>";
            windSpeed.innerHTML = "<img class=\"weather-icon\" src=\"images/wind.png\"><p class='speed para'>Wind Speed<span class='clone-spans'> " + windSpeedNow + " km/h</span></p>";
            visibilityDiv.innerHTML = "<img class=\"weather-icon\" src=\"images/visibility.png\"><p class='visible para'>Visibility <span class='clone-spans'>" + visibilityKM + " km</span></p>";
            weatherImageDiv.innerHTML = "<img class='img-description' src=" + imageURL + icon + ".svg>";
            footerDiv.innerHTML = "<p>Made by <a href=\"https://rishiportfolio.netlify.app/\">Rishi Srivastava</a>"

            
            // adding classes to elements
            for(var i=0; i<cloneDiv.length; i++){
                cloneDiv[i].classList.add("clone-divs");
            }
            visibilityDiv.classList.add("visibility-style");
            windSpeed.classList.add("wind-style");
            descriptionDiv.classList.add("description-style");
            humidityDiv.classList.add("humidity-style");
            document.getElementById("weather-temp").classList.add("main-weather");
        })
        

        // managing wrong city input
        .catch(() =>{
            document.location.reload();
            alert("Sorry! couldn't find "+ inputText +" city")
        })  
}
  


// added event to button 
btnCheck.addEventListener("click", clickHandler);