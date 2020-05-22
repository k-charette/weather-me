import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Divider, IconButton, Input, InputGroup, InputLeftElement, ThemeProvider } from "@chakra-ui/core";

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
        <ThemeProvider>
            <div style={{margin: 'auto'}} className='forecast'>
                <Box>     
                    <InputGroup size='lg'>
                        <InputLeftElement 
                            onClick={search} 
                            children={<IconButton variant='outline' bg='gray.200' aria-label='Search Database' icon='search-2' />}
                        />
                        <Input 
                            type='text'
                            size='lg'
                            bg='gray.200'
                            borderColor='white'
                            className='search-bar'
                            placeholder='Search any city'
                            mb={10}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={(ev) => {
                                if(ev.key === 'Enter'){
                                    search(query)
                                }
                            }}
                            value={query}
                        />
                    </InputGroup>
                    <Box textAlign='center' fontWeight='bold' fontSize={30} mb={5}>
                        {name}, {country}
                    </Box>
                    <Divider width='full'/>
                    <Box textAlign='left' fontSize={18}>
                        Temperature: {tempF}°<span>F</span> / {tempC}°<span>C</span>
                    </Box>
                    <Box>
                        {description}
                    </Box>
                    
                </Box>
            </div>
        </ThemeProvider>
    )
}

export default Forecast