import React, { useState, useEffect } from 'react';

function weather() {
    const [weatherData, setWeatherData] = useState([]); 
    const [city, setCity] = useState("Cairo");

    const getWeather = async () => {
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=ad317905a1194d02968152651250602&q=${city}&aqi=no`);    
            const data = await response.json();
            if (data) {         
                setWeatherData(prevData => [...prevData, data]);
            }
    };
    const searchbutton = () => {
        getWeather();
        setCity(""); 
    };
    return ( 
        <>
            <div className="container mx-auto">
                <input type="search" id="search" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city name"
                />
                <button onClick={searchbutton}>Search</button>
            </div>
            <section className="container my-5 text-center mx-auto">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Temperature (°C)</th>
                            <th>Condition</th>
                            <th>Humidity (%)</th>
                            <th>Wind Speed (km/h)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            weatherData.length > 0 ? (
                                weatherData.map((weather, index) => (
                                    <tr key={index}>
                                        <td>{weather.location.name}</td>
                                        <td>{weather.current.temp_c}</td>
                                        <td>{weather.current.condition.text}</td>
                                        <td>{weather.current.humidity}</td>
                                        <td>{weather.current.wind_kph}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No data available</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default weather;