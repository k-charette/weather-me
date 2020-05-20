import React, { useState, useEffect } from 'react'
import Clock from 'react-live-clock'
import ReactAnimatedWeather from 'react-animated-weather/build/ReactAnimatedWeather'
import { Box, Text, Flex } from "@chakra-ui/core";

const CurrentLocation = ({ API_KEY }) => {

    const [locationInfo, setLocationInfo] = useState({
        lat: undefined,
        lon: undefined,
        errorMessage: undefined,
        tempC: undefined,
        tempF: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        sunrise: undefined,
        sunset: undefined,
        errorMsg: undefined,
    })

    const [weatherIcon, setWeatherIcon] = useState({
        icon: "CLEAR_DAY",
    })

    useEffect(() => {
        
        if (navigator.geolocation){
            getPosition()
                .then((position) => {
                    getWeather(position.coords.latitude, position.coords.longitude)
                })
                .catch((err) => {
                    getWeather(35.65, 139.83)
                })
        } else {
            alert('Geolocation not available')
        }
    }, [])

    const getPosition = (options) => {
        return new Promise(function (resolve, reject){
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        })
    }

    const getWeather = async (lat, lon) => {
        const apicall = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`
        )

        const data = await apicall.json()

        setLocationInfo({
            lat: lat,
            lon: lon,
            tempC: Math.round(data.main.temp),
            tempF: Math.round(data.main.temp * 1.8 + 32),
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            main: data.weather[0].main
        }) 
        
        switch (locationInfo.main) {
            case "Haze":
              setWeatherIcon({ icon: "CLEAR_DAY" });
              break;
            case "Clouds":
              setWeatherIcon({ icon: "CLOUDY" });
              break;
            case "Rain":
              setWeatherIcon({ icon: "RAIN" });
              break;
            case "Snow":
              setWeatherIcon({ icon: "SNOW" });
              break;
            case "Dust":
              setWeatherIcon({ icon: "WIND" });
              break;
            case "Drizzle":
              setWeatherIcon({ icon: "SLEET" });
              break;
            case "Fog":
              setWeatherIcon({ icon: "FOG" });
              break;
            case "Smoke":
              setWeatherIcon({ icon: "FOG" });
              break;
            case "Tornado":
              setWeatherIcon({ icon: "WIND" });
              break;
            default:
              setWeatherIcon({ icon: "CLEAR_DAY" });
          }
    }

    const defaults ={
        color: "black",
        size: 85,
        animate: true
    }
    
    console.log(locationInfo)

    const date = new Date().toDateString()

    let locationData = locationInfo ? (
            <div>
                <Box textAlign='right'>
                    {locationInfo.city}, {locationInfo.country}
                </Box>
                <Box textAlign='center'>
                    <div>
                        {" "}
                        <ReactAnimatedWeather 
                            icon={weatherIcon.icon}
                            color={defaults.color}
                            size={defaults.size}
                            animate={defaults.animate}
                        />    
                    </div>

                    <div>
                        {locationInfo.main}
                    </div>
                
            
                    <div>
                        <p>{locationInfo.tempF}°<span>F</span> / {locationInfo.tempC}°<span>C</span> </p>
                    </div> 
                
                    <div>
                        <Clock format='HH:mm:ss' interval={1000} ticking={true}/>
                    </div>
                    <div>   
                        { date }
                    </div>
                </Box>
            </div>
    ) : <> </>
    return (
        <div style={{margin: 'auto'}}>  
            {locationData}
        </div>      
    )
}

export default CurrentLocation