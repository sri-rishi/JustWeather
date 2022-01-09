// selecting  html elements
const txtInput = document.querySelector("#txt-input");
const btnCheck = document.querySelector("#btn-check");
const weatherImageDiv  = document.querySelector("#weather-image");
const temperatureDiv = document.querySelector("#temperature");
const feelsLike = document.querySelector('#feels-like')
const humidityDiv =document.querySelector("#humidity");
const descriptionDiv = document.querySelector("#description");
const windSpeed = document.querySelector("#wind-speed");
const visibilityDiv = document.querySelector("#visibility");
const cityData = document.querySelector("#city-name");
const cloneDiv= document.querySelectorAll(".description-div");
const footerDiv =document.querySelector("#footer");
// Setting weather url
const getWeatherURL = text => {
    const serverURL = "https://api.openweathermap.org/data/2.5/weather?q=" ;
    const apiKey = "ce7af20031553e7707065741261ad3f1";
    const unit = "metric";
    return serverURL + text + "&appid=" + apiKey + "&units=" + unit;
}

// image URL
const imageURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/";


const clickHandler = event => {
    event.preventDefault();
    let inputText = txtInput.value; 
    let cityName = inputText.split(',')[0];
    // getting current time
    let today = new Date();
    let time = today.getHours() + ":" +today.getMinutes();
    

        // getting data from api
        fetch(getWeatherURL(inputText))
        .then(response => response.json())
        .then(json => {
            let icon = json.weather[0].icon;
            let visibilityKM = Math.round(json.visibility/1000);
            let weatherDescription =json.weather[0].description;
            let weatherTemp = Math.round(json.main.temp);
            let tempFeelLike =  Math.round(json.main.feels_like);
            let weatherHumidity = json.main.humidity; 
            let windSpeedNow = Math.round(json.wind.speed);
            let cityCountry = json.sys.country;
            
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
            for(let i=0; i<cloneDiv.length; i++){
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