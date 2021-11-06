function getWoeid(){
  let select = document.getElementById("select");
  let myhide = document.getElementById("hide");
  let choice = select.selectedIndex;
  let city = select.options[choice].value;
    console.log(city);
  
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
  
    .then(displayWeather)
  
    .catch(function(error){
  console.log('Error')
    });
  
  
    function displayWeather(weather){
  const cityAnd = document.querySelector(".city");
  cityAnd.innerHTML = weather.title + " " + "(" + weather.parent.title + ")";
  
  for (let i = 0; i < 5; i++) {
    console.log(i);
  
    const Date = document.querySelectorAll(".date");
    const Temp = document.querySelectorAll(".temp");
    const Weather = document.querySelectorAll(".weather");
    const Humidity = document.querySelectorAll(".humidity");
    const Visibilite = document.querySelectorAll(".visibilite");
    const Pressure = document.querySelectorAll(".pressure");
  
   
  
   
  
    Date[i].innerHTML =
       weather.consolidated_weather[i].applicable_date; 
  
    Humidity[i].innerHTML =
      "<b>Humidity</b>: " + weather.consolidated_weather[i].humidity;
    Visibilite[i].innerHTML =
      "<b>Visibility</b>: " +
      Math.trunc(weather.consolidated_weather[i].visibility) +
      " miles";
    Pressure[i].innerHTML =
      "<b>Pressure</b>: " +
      Math.trunc(weather.consolidated_weather[i].air_pressure) +
      " mb";
    Temp[i].innerHTML =
      parseInt(weather.consolidated_weather[i].the_temp) +
      "°C";
    Weather[i].innerHTML =
      "<b>Weather</b>: " + weather.consolidated_weather[i].weather_state_name;
    let NameAbr = weather.consolidated_weather[i].weather_state_abbr;
    let weathersvg = document.querySelectorAll(".weathersvg");
    console.log(NameAbr);
    let URlsvg = `https://www.metaweather.com/static/img/weather/${NameAbr}.svg`;
    weathersvg[i].src = URlsvg;
  
  }
  
    }
  }
  myhide.style.display = "block";
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
          const Dateforaday = document.querySelector(".dateforaday");
          const Tempforaday = document.querySelector(".tempforaday");
          const Weatherforaday = document.querySelector(".weatherforaday");
          console.log('ok day1')

          Dateforaday.innerHTML = response[0].applicable_date;
          Tempforaday.innerHTML =
          parseInt(response[0].the_temp) + "°C"; 
          console.log('ok');
          Weatherforaday.innerHTML =
          response[0].weather_state_name; 
      }
    }}
