import React from 'react';
import CurrentLocation from './components/CurrentLocation'
import Forecast from './components/Forecast'
import { Flex, Box } from "@chakra-ui/core";


const App = () => {
  const API_KEY = `${process.env.REACT_APP_API_KEY}`

  return (
    <div className="App">
      <Flex display='flex' justifyContent='center' px={30} >
        <Box w={1000} p={4} m='20px auto' borderWidth='1px' rounded='lg' shadow='1px 1px 3px rgba(0,0,0,0.3)'>
            <CurrentLocation 
              API_KEY={API_KEY}
            />
        </Box>
        <Box bg='blue' w={700} p={4} m='20px auto' borderWidth='1px' rounded='lg' shadow='1px 1px 3px rgba(0,0,0,0.3)'>
            <Forecast 
              API_KEY={API_KEY}
            />
        </Box>
      </Flex>
    </div>
  );
}

export default App;
