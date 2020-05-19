import React, { useState, useEffect } from 'react'
import config from '../config'

const CurrentLocation = () => {

    const [weather, setWeather] = useState({
        lat: undefined,
        lon: undefined,
        errorMessage: undefined,
        tempC: undefined,
        tempF: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: "CLEAR_DAY",
        sunrise: undefined,
        sunset: undefined,
        errorMsg: undefined,
    })

    useEffect(() => {
        if (navigator.geolocation){
            getPosition()
                .then((position) => {
                    getWeather(position.coords.latitude, position.coords.longitude)
                })
                .catch((err) => {
                    getWeather(28.67, 77.22)
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
            `${config.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${config.key}`
        )

        const data = await apicall.json()

        console.log(data)
        setWeather({
            lat: lat,
            lon: lon,
            tempC: Math.round(data.main.temp),
            tempF: Math.round(data.main.temp * 1.8 + 32),
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            main: data.weather[0].main
        })
        
    }

    return (
        <div>
            Yeah

        </div>
    )
}

export default CurrentLocation