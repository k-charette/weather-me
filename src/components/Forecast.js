import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Divider, Input } from "@chakra-ui/core";

const Forecast = ({API_KEY}) => {

    const [query, setQuery] = useState('')
    const [error, setError] = useState('')
    const [weather, setWeather] = useState({
        country: '',
        tempC: '',
        description: '',
        name: '',
        humidity: '',
    })

    const search = (city) => {
        axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${
            city != "[object Object]" ? city : query
            }&units=metric&APPID=${API_KEY}`
        )
        .then((response) => {
            console.log(response.data)
            setWeather({
                country: response.data.sys.country,
                tempC: Math.round(response.data.main.temp),
                tempF: Math.round(response.data.main.temp * 1.8 + 32),
                description: response.data.weather[0].main,
                name: response.data.name,
                humidity: response.data.main.humidity
            })
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

    const { name, country, description, tempC, tempF, } = weather
    
    return (
        <div style={{margin: 'auto'}} className='forecast'>
            <Box>
                <Box textAlign='center' fontSize={24} fontWeight={600}>       
                </Box>
                <Box>
                    <Input 
                        type='text'
                        size='lg'
                        className='search-bar'
                        placeholder='Search any city'
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    <img src='https://images.avishkaar.cc/workflow/newhp/search-white.png' alt='search' onClick={search}/>
                </Box>
                <Box textAlign='center' fontWeigh='bold' fontSize={30}>
                    {name}, {country}
                </Box>
                <Divider width='full' />
                <Box textAlign='left'>
                    Temperature: {tempF}°<span>F</span> / {tempC}°<span>C</span>
                </Box>
                <Box>
                    {description}
                </Box>
            </Box>
        </div>
    )
}

export default Forecast