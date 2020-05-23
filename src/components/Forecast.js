import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Divider, IconButton, Input, InputGroup, InputLeftElement, List, ListItem, ThemeProvider } from "@chakra-ui/core";

const Forecast = ({API_KEY}) => {
    

    const [query, setQuery] = useState('')
    const [error, setError] = useState('')
    const [weather, setWeather] = useState({
        country: '',
        tempC: '',
        description: '',
        name: '',
        humidity: '',
        sunrise: '',
        sunset: '',
        icon: ''
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
                humidity: response.data.main.humidity,
                sunrise: response.data.sys.sunrise,
                sunset: response.data.sys.sunset,
                icon: response.data.weather[0].icon
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

    const convertSunset = () => {
       
        const d = new Date(weather.sunset * 1000)
        const hours = d.getHours()
        const minutes = '0' + d.getMinutes()
        
        return hours + ':' + minutes.substr(-2)
    }
    const convertSunrise = () => {
       
        const d = new Date(weather.sunrise * 1000)
        const hours = d.getHours()
        const minutes = '0' + d.getMinutes()
        
        return hours + ':' + minutes.substr(-2)
    }

    const { name, country, description, tempC, tempF, humidity, } = weather
    
    return (
        <ThemeProvider>
            <div style={{margin: 'auto'}} className='forecast'>
                <Box fontWeight={800}>     
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
                    <Box textAlign='center' fontSize={40}>
                        {name}, {country} 
                    </Box>
                    <Box textAlign='center'>
                        <img className='icon' alt='icon' src={`https://openweathermap.org/img/wn/${weather.icon}.png`}/>
                    </Box>
                    <Box fontSize={24} textAlign='center'>
                        {description}
                    </Box>
                    <Divider width='full'/>
                    <List textAlign='left' fontSize={18}>
                        <ListItem my={3}>
                            Temperature: {tempF}°<span>F</span> / {tempC}°<span>C</span>
                        </ListItem>
                        <Divider w='full'/>
                        <ListItem my={3}>
                            Humidity: {humidity} %
                        </ListItem>
                        <Divider w='full'/>
                        <ListItem my={3}>
                            Sunrise: {convertSunrise()}
                        </ListItem>
                        <Divider w='full'/>
                        <ListItem my={3}>
                            Sunset: {convertSunset()}
                        </ListItem>
                    </List>     
                </Box>
            </div>
        </ThemeProvider>
    )
}

export default Forecast