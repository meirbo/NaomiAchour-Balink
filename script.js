function getCountry(){
  let select = document.getElementById("select");
 // let myHide = document.getElementById("hide");
  let choiceCity = select.selectedIndex;
  let city = select.options[choiceCity].value;
  console.log(city);
  getWoeid(city);

}
function getWoeid(city){
  
    fetch(
      `https://www.metaweather.com/api/location/search/?query=${city}`
    )
     
    .then(res => res.json())
  
    .then(getWeather)
  
    .catch(function(error){
  console.log('Please enter a valid city')
    });
  
  
  function getWeather(res){
    let woeid = res[0].woeid;
    console.log(woeid);
  
    fetch(
      `https://www.metaweather.com/api/location/${woeid}/`
      )
  
    .then(weather => weather.json())
  
    .then(WeatherOfTheNextDays)
  
    .catch(function(error){
  console.log('Error')
    });
  
  
    function WeatherOfTheNextDays(weather){

      displaytitle(weather);
  
      displayNextDays(weather);
  
  function displaytitle(weather){
    let city = document.querySelector(".city");
    let country = document.querySelector(".country");
    let time = document.querySelector(".time");
    let sunrise = document.querySelector(".sunrise");
    let sunset = document.querySelector(".sunset");
    
    city.innerHTML = weather.title;
    country.innerHTML = weather.parent.title;
    time.innerHTML ="Time" + " " + weather.time ;
    sunrise.innerHTML ="Sunrise" + " " + weather.sun_rise;
    sunset.innerHTML = "Sunset" + " " + weather.sun_set;
  }

   

    function displayNextDays(weather){
      let date = document.querySelectorAll(".date");
      let temp = document.querySelectorAll(".temp");
      let myWeather = document.querySelectorAll(".weather");
      let humidity = document.querySelectorAll(".humidity");
      let visibilite = document.querySelectorAll(".visibilite");
      let pressure = document.querySelectorAll(".pressure");
      let weatherSvg = document.querySelectorAll(".weathersvg");

      for (let i = 0; i < 5; i++) {
        console.log(i);

     date[i].innerHTML =
       weather.consolidated_weather[i].applicable_date; 
  
    humidity[i].innerHTML =
      "<b>Humidity</b>: " + weather.consolidated_weather[i].humidity;
    visibilite[i].innerHTML =
      "<b>Visibility</b>: " +
      Math.trunc(weather.consolidated_weather[i].visibility) +
      " miles";
    pressure[i].innerHTML =
      "<b>Pressure</b>: " +
      Math.trunc(weather.consolidated_weather[i].air_pressure) +
      " mb";
    temp[i].innerHTML =
      parseInt(weather.consolidated_weather[i].the_temp) +
      "°C";
    myWeather[i].innerHTML =
      "<b>Weather</b>: " + weather.consolidated_weather[i].weather_state_name;
    let nameAbr = weather.consolidated_weather[i].weather_state_abbr;
    let weatherSvg = document.querySelectorAll(".weathersvg");
    console.log(nameAbr);
    let urlSvg = `https://www.metaweather.com/static/img/weather/${nameAbr}.svg`;
    weatherSvg[i].src = urlSvg;
  }
    }
  }

  
  }
 // myHide.style.display = "block";
  }
  
  function getWoeidForADay(){
    let dateControl = document.querySelector('input[type="date"]');
    let date = new Date(dateControl.value);
    console.log(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    console.log(year);
    console.log(month);
    console.log(day);
    let select = document.getElementById("selectforaday");
    let choice = select.selectedIndex;
    let cityforaday = select.options[choice].value;
      console.log(cityforaday);
    
      fetch(
        `https://www.metaweather.com/api/location/search/?query=${cityforaday}`
      )
       
      .then(resdata => resdata.json())
    
      .then(getWeatherForADay)
    
      .catch(function(error){
    console.log('Please enter a valid city')
      });
    
    
   function getWeatherForADay(resdata){
      let mywoeid = resdata[0].woeid;
      console.log(mywoeid);
      console.log(`https://www.metaweather.com/api/location/${mywoeid}/${year}/${month}/${day}/`);
    
      fetch(
        `https://www.metaweather.com/api/location/${mywoeid}/${year}/${month}/${day}/`
        )
        .then(response => response.json())
  
        .then(displayWeatherForADay)
      
        .catch(function(error){
      console.log('Error')
        });
      
      
        function displayWeatherForADay(response){
          console.log('ok day')
          let Dateforaday = document.querySelector(".dateforaday");
          let Tempforaday = document.querySelector(".tempforaday");
          let Weatherforaday = document.querySelector(".weatherforaday");
          console.log('ok day1')

          Dateforaday.innerHTML = response[0].applicable_date;
          Tempforaday.innerHTML =
          parseInt(response[0].the_temp) + "°C"; 
          console.log('ok');
          Weatherforaday.innerHTML =
          response[0].weather_state_name; 
      }
    }}
