const apiKey = "b171d998c87c34f9a07dd39533e9dd27";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWhether(city) {
    const responce = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(responce.status == 404){
        document.querySelector(".error").style.display = "block"; 
        document.querySelector(".weather").style.display = "none";
    }else{ 
        let data = await responce.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
    
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none"; 
    }
   }
   searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    
    if (city === "") {
       alert("Please Enter City Name!..");
        document.querySelector(".weather").style.display = "none";
    } else {
        checkWhether(city);
    }
});