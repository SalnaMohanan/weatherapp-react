import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import "./app.css"

const App=()=> {
  const [city,setCity]=useState("");
  const [weather,setWeather]=useState(null);
  const [error,setError]=useState("");

  const fetchWeather= async()=>{
    try{
      setError("")
      const response =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      setWeather(response.data)
        }catch(err){
          setError("city not found or an error occurred.");
          setWeather(null);
        }
  };
  return (
     <div className='weather-app'>
    <div className='container'>
      <h2>Weather APP</h2>
      <input type="text" placeholder='Add City Name ' value={city} onChange={(e)=>setCity(e.target.value)} className='input'/>
      <button onClick={fetchWeather} type="button" className="btn btn-outline-dark">Search</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div className='weather-details' style={{ marginTop: "1rem" }}>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
      </div>
      
      </div>
  )
};

export default App
