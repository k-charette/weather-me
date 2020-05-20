import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './CountryWeather'

const Forecast = ({API_KEY}) => {

    const [query, setQuery] = useState('')
    const [error, setError] = useState('')
    const [weather, setWeather] = useState([])

    const search = (city) => {
        console.log(city)
        axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${
            city != "[object Object]" ? city : query
            }&units=metric&APPID=${API_KEY}`
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
    
    useEffect(() => {
        search('Tokyo')
    }, [])
    
    return (
        <div style={{margin: 'auto'}} className='forecast'>
            <h3>Search</h3>
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

            <div> 
            {weather.name}
            { 
                Object.keys(weather).map(key => 
                    <Weather 
                        key={key}
                        country={weather[key].country}
                    />
                )
            }
            </div>
        </div>
    )
}

export default Forecast