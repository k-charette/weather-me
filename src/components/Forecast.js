import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config'
import ReactAnimatedWeather from 'react-animated-weather'

const Forecast = (props) => {

    const [query, setQuery] = useState('')
    const [error, setError] = useState('')
    const [weather, setWeather] = useState({})

    const search = (city) => {
        console.log(city)
        axios.get(
            `${config.base}weather?q=${
            city != "[object Object]" ? city : query
            }&units=metric&APPID=${config.key}`
        )
        .then((response) => {
            setWeather(response.data)
            setQuery('')
        })
        .catch((error) => {
            console.log(error)
            setWeather('')
            setQuery('')
            setError({ message: 'Not Found', query: query })
        })
    }

    const defaults ={
        color: "white",
        size: 112,
        animate: true
        }
    
    useEffect(() => {
        search('Tokyo')
    }, [])

    console.log(weather)
    return (
        <div className='forecase'>
            <div className='forecast-icon'>
                <ReactAnimatedWeather 
                    icon={props.icon}
                    color={defaults.color}
                    size={defaults.size}
                    animate={defaults.animate}
                />
            </div>

            <div>
                <h3>{weather.name}</h3>
            </div>

            <h3>Search Box</h3>
            <div>
                <input 
                    type='text'
                    className='search-bar'
                    placeholder='Search any city'
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                <div className='img-box'>
                    <img src='https://images.avishkaar.cc/workflow/newhp/search-white.png' alt='search' onClick={search}/>
                </div>

            </div>
        </div>
    )
}

export default Forecast