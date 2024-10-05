import { useState } from 'react';
import { Box, Text, Button, Image, Flex, Collapse } from '@chakra-ui/react';
import './App.css';

function App() {
  const [tempInF, setTempInF] = useState(true);
  const [expandedDay, setExpandedDay] = useState(null);
  const [showHourlyDetails, setShowHourlyDetails] = useState(null);

  const toggleTemp = () => {
    setTempInF(!tempInF);
  };

  const currentTemp = tempInF ? 72 : ((72 - 32) * 5) / 9;
  const highTemp = tempInF ? 78 : ((78 - 32) * 5) / 9;
  const lowTemp = tempInF ? 65 : ((65 - 32) * 5) / 9;

  const handleDayClick = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const handleHourlyClick = (hour) => {
    setShowHourlyDetails(showHourlyDetails === hour ? null : hour);
  };

  return (
    <Box 
      className="container" 
      p={6} 
      bg="gray.50" 
      borderRadius="lg" 
      boxShadow="lg" 
      maxW="450px"
      border="2px solid"
      borderColor="gray.400"
    >
      {/* Greeting */}
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="blue.700">
        Hi Lincoln!
      </Text>

      {/* Current Weather Section */}
      <Box className="current-weather" mb={8}>
        <Text as="h1" fontSize="6xl" fontWeight="extrabold" color="blue.600">
          {Math.round(currentTemp)}°{tempInF ? 'F' : 'C'}
        </Text>
        <Text fontSize="lg" color="gray.600" mt={2}>
          High: {Math.round(highTemp)}° / Low: {Math.round(lowTemp)}°
        </Text>
        <Text fontSize="lg" fontWeight="bold" color="yellow.500" mt={2}>
          Sunny
        </Text>
        <Flex className="weather-details" justifyContent="space-between" mt={6}>
          <Box textAlign="center">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/1163/1163624.png"
              alt="precipitation icon"
              boxSize="40px"
              mb={2}
            />
            <Text>Precipitation: 10%</Text>
          </Box>
          <Box textAlign="center">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/4150/4150712.png"
              alt="wind icon"
              boxSize="40px"
              mb={2}
            />
            <Text>Wind: 5 mph</Text>
          </Box>
          <Box textAlign="center">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/1163/1163673.png"
              alt="humidity icon"
              boxSize="40px"
              mb={2}
            />
            <Text>Humidity: 65%</Text>
          </Box>
        </Flex>
      </Box>

      {/* Buttons for changing temperature and refreshing */}
      <Flex justifyContent="center" mt={6}>
        <Button colorScheme="blue" mr={4} onClick={toggleTemp} _hover={{ transform: 'scale(1.05)', transition: '0.2s' }}>
          {tempInF ? 'Switch to Celsius' : 'Switch to Fahrenheit'}
        </Button>
        <Button colorScheme="blue" onClick={() => window.location.reload()} _hover={{ transform: 'scale(1.05)', transition: '0.2s' }}>
          Refresh
        </Button>
      </Flex>

      {/* Weather Alerts Section */}
      <Box className="alert-section" bg="red.100" borderLeft="4px solid" borderColor="red.500" p={4} mt={8}>
        <Text fontSize="lg" fontWeight="bold" color="red.500">
          Severe Weather Alert
        </Text>
        <Text>Thunderstorm warning in your area until 8 PM.</Text>
      </Box>

      {/* Hourly Forecast Section */}
      <Text fontSize="2xl" fontWeight="bold" color="blue.700" mt={8}>
        Hourly Forecast
      </Text>
      <Box className="hourly-forecast" mt={4} overflowX="scroll" whiteSpace="nowrap">
        <Flex>
          {['12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'].map((time, index) => (
            <Box
              textAlign="center"
              key={index}
              onClick={() => handleHourlyClick(time)}
              cursor="pointer"
              mx={2}
              minWidth="100px" // Ensuring width is consistent
              _hover={{ backgroundColor: 'gray.200', borderRadius: 'md', transition: '0.2s' }}
            >
              <Text>{time}</Text>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
                alt="sunny icon"
                boxSize="40px"
              />
              <Text>{75 + index}°F</Text>
              <Collapse in={showHourlyDetails === time}>
                <Text mt={2} color="gray.600">Feels like {72 + index}°F, light breeze.</Text>
              </Collapse>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Daily Forecast Section */}
      <Box className="daily-forecast" mt={8}>
        <Text fontSize="2xl" fontWeight="bold" color="blue.700">Weekly Forecast</Text>
        <Flex justifyContent="space-between" mt={4}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
            <Box
              textAlign="center"
              key={index}
              onClick={() => handleDayClick(day)}
              cursor="pointer"
              _hover={{ backgroundColor: 'gray.200', borderRadius: 'md', transition: '0.2s' }}
            >
              <Text>{day}</Text>
              <Image
                src={
                  index % 2 === 0
                    ? "https://cdn-icons-png.flaticon.com/512/861/861059.png"
                    : "https://cdn-icons-png.flaticon.com/512/414/414825.png"
                }
                alt={index % 2 === 0 ? "cloudy icon" : "rainy icon"}
                boxSize="40px"
              />
              <Text>High: {73 + index}°F</Text>
              <Text>Low: {62 - index}°F</Text>
              <Collapse in={expandedDay === day}>
                <Text mt={2} color="gray.600">Wind: 7 mph, Humidity: 60%, UV Index: Low</Text>
              </Collapse>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

export default App;
