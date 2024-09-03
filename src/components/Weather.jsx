import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import clearsun_icon from '../assets/clearsun.png'
import cloudsun_icon from '../assets/cloudsun.png'
import drizzlecloud_icon from '../assets/drizzlecloud.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png' 
import snow_icon from '../assets/snow.png' 
import wind_icon from '../assets/wind.png' 
const Weather = () => {
    const inputRef = useRef()
    const[weatherData, setWeatherData] = useState(false);
    const allIcons ={
        "01d":clearsun_icon,
        "01n":clearsun_icon,
        "02d":cloudsun_icon,
        "02n":cloudsun_icon,
        "03d":cloudsun_icon,
        "03n":cloudsun_icon,
        "04d":drizzlecloud_icon,
        "04n":drizzlecloud_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "11d":snow_icon,
        "11n":snow_icon,
        "13d":snow_icon,
        "13n":snow_icon,
        "50d":cloudsun_icon,
        "50n":cloudsun_icon
        
    }

    const search = async (city) => {
        if(city===""){
            alert("Please enter a city name");
            return;
            
        }
       try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`;       
        const response = await fetch(url);
        const data = await response.json();

        if(!response.ok)
        {
            alert(data.message);
            return;
        }
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || clearsun_icon;
        setWeatherData({
            humidity:data.main.humidity,
            temp:Math.floor(data.main.temp),
            windSpeed:data.wind.speed,
            city:data.name,
            icon:icon
        })

       } catch (error) {
        setWeatherData(false);
        console.log("error in fetching data", error);
        
       }
    }
    useEffect(() => {
        search("Warangal");
    }, [alert("hii")])
  return (
    <div className='weather'> 
    <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Enter any city'/>
        <img src={search_icon} alt="searchicon" onClick={() => search(inputRef.current.value)} />
    </div>
    {weatherData?<>
     <img src={weatherData.icon} alt="clearsun" className='clearsun' />
    <p className='temp'>{weatherData.temp}°C</p>
    <p className='city'>{weatherData.city}</p>
    <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="humidity" />
            <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="wind" />
            <div>
                <p>{weatherData.windSpeed}km/h</p>
                <span>Wind speed</span>
            </div>
        </div>
    </div>
    </>:<></>}
   
    </div>
  )
}

export default Weather;