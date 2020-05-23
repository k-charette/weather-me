import React, { useState, useEffect } from 'react'
import Clock from 'react-live-clock'
import ReactAnimatedWeather from 'react-animated-weather/build/ReactAnimatedWeather'
import { Box, Divider } from "@chakra-ui/core";

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
        icon: "CLEAR_DAY"
    })

    useEffect(() => {
        
        if (navigator.geolocation){
            getPosition()
                .then((position) => {
                    getWeather(position.coords.latitude, position.coords.longitude)
                })
                .catch((err) => {
                    getWeather(40.71,-74.01)
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
        size: 120,
        animate: true
    }

    const date = new Date().toDateString()

    let locationData = locationInfo ? (
            <>
                <Box textAlign='right' fontSize={40} fontWeight={600}>
                    {locationInfo.city}, {locationInfo.country}
                </Box>
                <Box textAlign='center' fontWeight={600}>
                    <Box padding={15} m={20}>
                        {" "}
                        <ReactAnimatedWeather 
                            icon={weatherIcon.icon}
                            color={defaults.color}
                            size={defaults.size}
                            animate={defaults.animate}
                        />    
                    </Box>
                    <Box fontSize={40} mb={30}>
                        {locationInfo.tempF}°<span>F</span> | {locationInfo.tempC}°<span>C</span>
                    </Box>

                    <Box fontSize={35}>
                        {locationInfo.main}
                    </Box>
                    <Divider w='full' />
                    <Box>   
                        <Box textAlign='center'fontSize={25} p='2'>  
                            { date }
                        </Box>
                        <Box fontSize={25} textAlign='center' p='2'>
                            <Clock format='HH:mm:ss' interval={1000} ticking={true}/>
                        </Box>
                    </Box>
                </Box>
            </>
    ) : <> </>
    return (
        <div style={{margin: 'auto'}}>  
            {locationData}
        </div>      
    )
}

export default CurrentLocation